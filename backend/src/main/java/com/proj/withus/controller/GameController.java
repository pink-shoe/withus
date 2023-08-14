package com.proj.withus.controller;

import java.io.File;
import java.util.ArrayList;
import java.util.List;

import javax.servlet.http.HttpServletRequest;

import com.proj.withus.exception.CustomException;
import com.proj.withus.exception.ErrorCode;
import com.proj.withus.repository.RoomRepository;
import com.proj.withus.service.*;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestPart;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.multipart.MultipartFile;

import com.proj.withus.domain.Player;
import com.proj.withus.domain.Room;
import com.proj.withus.domain.Shape;
import com.proj.withus.domain.dto.GetCaptureImageReq;
import com.proj.withus.domain.dto.GetGameInfoRes;
import com.proj.withus.domain.dto.GetSelectedImagesReq;
import com.proj.withus.domain.dto.GetTotalGameResultRes;
import com.proj.withus.domain.dto.PlayerInfo;
import com.proj.withus.util.ImageUtil;
import com.proj.withus.util.JwtUtil;

import io.swagger.annotations.Api;
import io.swagger.annotations.ApiImplicitParam;
import io.swagger.annotations.ApiImplicitParams;
import io.swagger.annotations.ApiOperation;
import io.swagger.annotations.ApiResponse;
import io.swagger.annotations.ApiResponses;
import io.swagger.annotations.Example;
import io.swagger.annotations.ExampleProperty;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;

@Api(tags = "게임 진행 API", description = "게임 진행 관련 기능을 처리하는 API (GameController)")
@RestController
@Slf4j
@RequiredArgsConstructor
@RequestMapping(value = "/api/games", produces = MediaType.APPLICATION_JSON_VALUE)
@ApiResponses({
        @ApiResponse(code = 401, message = "토큰 만료", examples = @Example(value = @ExampleProperty(mediaType = "application/json", value = "{ \n errorCode: 401, \n message: token expired \n}")))
})
public class GameController {

    private final GameService gameService;
    private final AlbumService albumService;
    private final AwsS3Service awsS3Service;
    private final MemberService memberService;
    private final RoomService roomService;
    private final RoomRepository roomRepository;
    private final JwtUtil jwtUtil;

    //test용
    private final ImageUtil imageUtil;

    @ApiOperation(value = "게임 정보 조회", notes = "게임 시작 후 게임 기본 정보를 불러온다.")
    @ApiResponses(value = {
            @ApiResponse(code = 200, message = "조회 성공", response = GetGameInfoRes.class),
            @ApiResponse(code = 400, message = "게임 정보가 존재하지 않음", examples = @Example(value = @ExampleProperty(mediaType = "application/json", value = "{ \n errorCode: 400, \n message: fail \n}")))
    })
    @ApiImplicitParams(value = {
            @ApiImplicitParam(name = "room_id", value = "방 id", required = true, dataType = "Long", paramType = "path")
    })
    @GetMapping("/{room_id}")
    public ResponseEntity<?> getGameInfo(
            @PathVariable(value = "room_id", required = true) Long roomId,
            HttpServletRequest request) {

        Long memberId = (Long) request.getAttribute("memberId");

        Room room = gameService.getRoomInfo(memberId);

        List<Player> players = gameService.getPlayersInfo(roomId);
        List<PlayerInfo> playerInfos = new ArrayList<>();
        for (Player player : players) {
            PlayerInfo playerInfo = PlayerInfo.builder()
                .playerId(player.getId())
                .nickname(memberService.getMemberInfo(player.getId()).getNickname())
                .teamType(player.getTeamType())
                .ready(player.isReady())
                .vote(player.getVote())
                .build();
            playerInfos.add(playerInfo);
        }

        List<Shape> shapes = gameService.getShapeInfo(room.getRound());

        return ResponseEntity.ok(GetGameInfoRes.builder()
                .room(room)
                .playerInfos(playerInfos)
                .shapes(shapes)
                .hostId(room.getMember().getId())
                .build());
    }

    @ApiOperation(value = "사진 캡처 요청", notes = "라운드 종료 후 캡처한 사진을 불러와 S3 서버, DB에 전송한다.")
    @ApiResponses(value = {
            @ApiResponse(code = 200, message = "캡처 사진 저장 성공(다음 라운드 반환)", response = String.class),
            @ApiResponse(code = 400, message = "캡처 사진 저장 실패", examples = @Example(value = @ExampleProperty(mediaType = "application/json", value = "{ \n errorCode: 400, \n message: fail \n}")))
    })
    @ApiImplicitParams(value = {
            @ApiImplicitParam(name = "room_id", value = "방 id", required = true, paramType = "path"),
            @ApiImplicitParam(name = "round", value = "라운드 수", required = true, paramType = "path"),
            @ApiImplicitParam(name = "captureImage", value = "form data capture image", dataTypeClass = MultipartFile.class, paramType = "body")
    })
    @PostMapping(value = "/image/{room_id}/{round}", consumes = MediaType.MULTIPART_FORM_DATA_VALUE)
    public ResponseEntity<?> getCaptureImage(
            HttpServletRequest request,
            @PathVariable("room_id") Long roomId,
            @PathVariable("round") int round,
            @RequestPart MultipartFile captureImage) {

        // s3 사진 저장 후 url 받기
        String imageUrl = awsS3Service.uploadFile(captureImage);

        // 받은 url, roomId, round 정보 DB 저장하기
        gameService.saveCaptureUrl(roomId, round, imageUrl);

        return ResponseEntity.ok(roomService.updateCurrentRound(roomId, round + 1));
    }

//    @ApiOperation(value = "게임 결과 요청", notes = "AI 서버에서 게임 결과를 전달받는다.")
//    @ApiResponses(value = {
//            @ApiResponse(code = 200, message = "AI 서버로부터 결과 수신 성공", examples = @Example(value = @ExampleProperty(mediaType = "application/json", value = "ok"))),
//            @ApiResponse(code = 400, message = "AI 서버로부터 결과 수신 실패", examples = @Example(value = @ExampleProperty(mediaType = "application/json", value = "{ \n errorCode: 400, \n message: fail \n}")))
//    })
//    @GetMapping
//    public ResponseEntity<?> getGameResult() {
//        if (!gameService.getGameResult()) {
//            throw new CustomException(ErrorCode.FLASK_RECEIVE_FAIL);
//        }
//        return new ResponseEntity<>(HttpStatus.OK);
//    }

    @ApiOperation(value = "총 게임 결과 요청", notes = "모든 라운드 종료 후 전체 게임 결과를 전달한다.")
    @ApiResponses(value = {
            @ApiResponse(code = 200, message = "모든 게임 결과 전송 성공", response = GetTotalGameResultRes.class, responseContainer = "List"),
            @ApiResponse(code = 400, message = "모든 게임 결과 전송 실패", examples = @Example(value = @ExampleProperty(mediaType = "application/json", value = "{ \n errorCode: 400, \n message: fail \n}"))),
            @ApiResponse(code = 403, message = "권한 없음", examples = @Example(value = @ExampleProperty(mediaType = "application/json", value = "{ \n errorCode: 403, \n message: auth \n}")))
    })
    @ApiImplicitParam(name = "room_id", value = "방 id", required = true, dataType = "Long", paramType = "path")
    @GetMapping("/result/{room_id}")
    public ResponseEntity<?> getGameTotalResult(
            @PathVariable(value = "room_id", required = true) Long roomId,
            HttpServletRequest request) {

        Long memberId = (Long) request.getAttribute("memberId");
        if (memberId == null) {
            throw new CustomException(ErrorCode.MEMBER_NO_PERMISSION);
        }

        // 게임 참여 player 모두 ready 상태 false로 만들어주기
        roomRepository.resetReadyState(roomId); // repository로 직접 접근

        // 방의 start 상태 변경
        roomRepository.updateStart(roomId, false); // repository로 직접 접근

        List<GetTotalGameResultRes> getTotalGameResultRes = gameService.getTotalGameResult(roomId);
        return ResponseEntity.ok(getTotalGameResultRes);
    }

    // 프론트에서 어떤 정보 받아 사진 저장할 지 정해야 함
    // @ApiOperation(value = "선택된 사진 저장", notes = "모든 라운드 종료 후 유저는 저장하고 싶은 사진을 선택해 저장한다.")
    // @ApiResponses(value = {
    //         @ApiResponse(code = 200, message = "선택한 사진 저장 성공"),
    //         @ApiResponse(code = 400, message = "선택한 사진 저장 실패")
    // })
    //
    // @ApiImplicitParam(name = "getSelectedImagesReq", value = "GetSelectedImages object", dataTypeClass = GetSelectedImagesReq.class, paramType = "body")
    // @PostMapping("/image/upload")
    // public ResponseEntity<?> getSelectedImages(
    //         HttpServletRequest request,
    //         @RequestBody GetSelectedImagesReq getSelectedImagesReq) {
    //
    //     Long memberId = (Long) request.getAttribute("memberId");
    //
    //     Long albumId = albumService.getAlbum(memberId);
    //     if (albumId == null) {
    //         return new ResponseEntity<>("앨범이 존재하지 않음", HttpStatus.BAD_REQUEST);
    //     }
    //
    //     List<Long> resultsId = getSelectedImagesReq.getResults();
    //     List<String> captureUrls = new ArrayList<>();
    //     for (Long resultId : resultsId) {
    //         String captureUrl = gameService.getCaptureUrl(resultId);
    //         if (captureUrl == null) {
    //             return new ResponseEntity<>("이미지를 가져오지 못함", HttpStatus.BAD_REQUEST);
    //         }
    //         Image saved = albumService.saveImage(memberId, captureUrl);
    //         if (saved == null) {
    //             return new ResponseEntity<>("이미지가 저장되지 않음", HttpStatus.BAD_REQUEST);
    //         }
    //     }
    //
    //     return new ResponseEntity<>(HttpStatus.OK);
    // }

    @ApiOperation(value = "선택된 사진 저장", notes = "모든 라운드 종료 후 유저는 저장하고 싶은 사진을 선택해 저장한다.(S3)")
    @ApiResponses(value = {
            @ApiResponse(code = 200, message = "선택한 사진 저장 성공", examples = @Example(value = @ExampleProperty(mediaType = "application/json", value = "ok"))),
            @ApiResponse(code = 400, message = "선택한 사진 저장 실패", examples = @Example(value = @ExampleProperty(mediaType = "application/json", value = "{ \n errorCode: 400, \n message: fail \n}")))
    })
    @ApiImplicitParam(name = "getSelectedImagesReq", value = "GetSelectedImages object", dataTypeClass = GetSelectedImagesReq.class, paramType = "body")
    @PostMapping("/image/upload")
    public ResponseEntity<?> saveImageToS3(
        HttpServletRequest request,
        @RequestBody List<MultipartFile> images) {
        Long memberId = (Long) request.getAttribute("memberId");

        Long albumId = albumService.getAlbum(memberId);

//        List<String> imgUrls = new ArrayList<>();
//        imgUrls = awsS3Service.uploadFiles(images);

        for (MultipartFile image : images) {
            String imgUrl = awsS3Service.uploadFile(image);
            albumService.saveImage(memberId, imgUrl);
        }

//        for (String imgUrl : imgUrls) {
//            albumService.saveImage(memberId, imgUrl);
//        }

        return new ResponseEntity<String>("S3에 이미지 업로드 성공", HttpStatus.OK);
    }


    @ApiOperation(value = "사진 보내기(테스트용)", notes = "사진 전송 여부 확인 테스트")
    @ApiResponses(value = {
        @ApiResponse(code = 200, message = "사진 전송 성공", response = String.class),
        @ApiResponse(code = 400, message = "사진 전송 실패", examples = @Example(value = @ExampleProperty(mediaType = "application/json", value = "{ \n errorCode: 400, \n message: fail \n}")))
    })
    @ApiImplicitParam(name = "image", value = "form data image", dataTypeClass = MultipartFile.class, paramType = "body")
    @PostMapping(value = "/image/test", consumes = MediaType.MULTIPART_FORM_DATA_VALUE)
    public ResponseEntity<?> getTestImage(
        HttpServletRequest request,
        @RequestPart MultipartFile image) {

        String fileName = imageUtil.createFileName(image.getOriginalFilename());

        File upload = imageUtil.saveLocal(image, fileName);

        return new ResponseEntity<String>("사진 테스트 성공", HttpStatus.OK);
    }

    @ApiOperation(value = "MVP 선정", notes = "플레이어는 MVP를 투표해 선정한다.")
    @ApiResponses(value = {
        @ApiResponse(code = 200, message = "MVP 선정 성공", response = String.class, examples = @Example(value = @ExampleProperty(mediaType = "application/json", value = "mvp 선정 성공"))),
        @ApiResponse(code = 400, message = "MVP 선정 실패", examples = @Example(value = @ExampleProperty(mediaType = "application/json", value = "{ \n errorCode: 400, \n message: fail \n}"))),
        @ApiResponse(code = 403, message = "권한 없음", examples = @Example(value = @ExampleProperty(mediaType = "application/json", value = "{ \n errorCode: 403, \n message: auth \n}")))
    })
    @ApiImplicitParams(value = {
        @ApiImplicitParam(name = "room_id", value = "방 id", required = true, dataType = "Long", paramType = "path"),
        @ApiImplicitParam(name = "votedId", value = "투표받은 플레이어 id", required = true, dataType = "Long", paramType = "body")
    })
    @PostMapping("/vote/{room_id}")
    public ResponseEntity<?> chooseMvpPlayer(
        @PathVariable(value = "room_id", required = true) Long roomId,
        @RequestBody Long votedId,
        HttpServletRequest request) {

        Long memberId = (Long) request.getAttribute("memberId");
        if (memberId == null) {
            throw new CustomException(ErrorCode.MEMBER_NO_PERMISSION);
        }

        gameService.chooseMvp(roomId, votedId);
        // 투표한 사람 리스트 필요한가?

        return new ResponseEntity<String>("mvp 선정 성공", HttpStatus.OK);
    }

    @ApiOperation(value = "MVP 결과 요청", notes = "MVP로 선정된 플레이어 정보를 조회한다.")
    @ApiResponses(value = {
        @ApiResponse(code = 200, message = "MVP 결과 요청 성공", response = Player.class, responseContainer = "List"),
        @ApiResponse(code = 400, message = "MVP 결과 요청 실패", examples = @Example(value = @ExampleProperty(mediaType = "application/json", value = "{ \n errorCode: 400, \n message: fail \n}"))),
        @ApiResponse(code = 403, message = "권한 없음", examples = @Example(value = @ExampleProperty(mediaType = "application/json", value = "{ \n errorCode: 403, \n message: auth \n}")))
    })
    @ApiImplicitParams(value = {
        @ApiImplicitParam(name = "room_id", value = "방 id", required = true, dataType = "Long", paramType = "path"),
    })
    @GetMapping("/vote/{room_id}")
    public ResponseEntity<?> getMvpPlayer(
        @PathVariable(value = "room_id", required = true) Long roomId,
        HttpServletRequest request) {

        Long memberId = (Long) request.getAttribute("memberId");
        if (memberId == null) {
            throw new CustomException(ErrorCode.MEMBER_NO_PERMISSION);
        }

        List<Player> players = gameService.getPlayersInfo(roomId);

        int maxVote = 0;
        List<Player> mvpPlayers = new ArrayList<>();
        for (Player player : players) {
            if (player.getVote() >= maxVote) {
                maxVote = player.getVote();
                mvpPlayers.add(player);
            }
        }

        return new ResponseEntity<List<Player>>(mvpPlayers, HttpStatus.OK);
    }
}

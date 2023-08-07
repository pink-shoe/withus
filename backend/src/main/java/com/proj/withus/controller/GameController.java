package com.proj.withus.controller;

import java.util.ArrayList;
import java.util.List;

import com.proj.withus.domain.dto.SocialMemberInfo;
import com.proj.withus.service.AlbumService;
import io.swagger.annotations.*;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.proj.withus.domain.Image;
import com.proj.withus.domain.Player;
import com.proj.withus.domain.Room;
import com.proj.withus.domain.Shape;
import com.proj.withus.domain.dto.GetCaptureImageReq;
import com.proj.withus.domain.dto.GetGameInfoRes;
import com.proj.withus.domain.dto.GetSelectedImagesReq;
import com.proj.withus.domain.dto.GetTotalGameResultRes;
import com.proj.withus.service.GameService;
import com.proj.withus.util.JwtUtil;

import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;

import javax.servlet.http.HttpServletRequest;

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
    private final JwtUtil jwtUtil;

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

        Long hostId = (Long) request.getAttribute("memberId");

        Room room = gameService.getRoomInfo(hostId);
        if (room == null) {
            return new ResponseEntity<>("방 정보가 없음", HttpStatus.BAD_REQUEST);
        }
        List<Player> players = gameService.getPlayersInfo(roomId);
        if (players == null) {
            return new ResponseEntity<>("플레이어 정보가 없음", HttpStatus.BAD_REQUEST);
        }
        List<Shape> shapes = gameService.getShapeInfo(room.getRound());
        if (shapes == null) {
            return new ResponseEntity<>("모양 데이터셋이 부족함", HttpStatus.BAD_REQUEST);
        }

        return ResponseEntity.ok(GetGameInfoRes.builder()
                .room(room)
                .players(players)
                .shapes(shapes)
                .build());
    }

    @ApiOperation(value = "사진 캡처 요청", notes = "라운드 종료 후 캡처한 사진을 불러와 AI 서버에 전송한다.")
    @ApiResponses(value = {
            @ApiResponse(code = 200, message = "AI 서버에 사진 전송 성공", response = String.class),
            @ApiResponse(code = 400, message = "AI 서버에 사진 전송 실패", examples = @Example(value = @ExampleProperty(mediaType = "application/json", value = "{ \n errorCode: 400, \n message: fail \n}")))
    })

    @ApiImplicitParam(name = "getCaptureImageReq", value = "GetCaptureImageReq object", dataTypeClass = GetCaptureImageReq.class, paramType = "body")
    @PostMapping("/image")
    public ResponseEntity<?> getCaptureImage(
            HttpServletRequest request,
            @RequestBody GetCaptureImageReq getCaptureImageReq) {

        if (!gameService.sendCaptureInfo(getCaptureImageReq)) {
            return new ResponseEntity<>("AI 서버로 요청이 전달되지 않음", HttpStatus.BAD_REQUEST);
        }
        return ResponseEntity.ok(getCaptureImageReq.getCurrentRound() + 1);
    }

    @ApiOperation(value = "게임 결과 요청", notes = "AI 서버에서 게임 결과를 전달받는다.")
    @ApiResponses(value = {
            @ApiResponse(code = 200, message = "AI 서버로부터 결과 수신 성공", examples = @Example(value = @ExampleProperty(mediaType = "application/json", value = "ok"))),
            @ApiResponse(code = 400, message = "AI 서버로부터 결과 수신 실패", examples = @Example(value = @ExampleProperty(mediaType = "application/json", value = "{ \n errorCode: 400, \n message: fail \n}")))
    })
    @GetMapping
    public ResponseEntity<?> getGameResult() {
        if (!gameService.getGameResult()) {
            return new ResponseEntity<>("AI 서버로부터 결과 전달 안됨", HttpStatus.BAD_REQUEST);
        }
        return new ResponseEntity<>(HttpStatus.OK);
    }

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
            return new ResponseEntity<>("인증되지 않은 사용자", HttpStatus.FORBIDDEN);
        }

        List<GetTotalGameResultRes> getTotalGameResultRes = gameService.getTotalGameResult(roomId);
        if (getTotalGameResultRes == null) {
            return new ResponseEntity<>("전체 게임 결과를 가져오지 못함", HttpStatus.BAD_REQUEST);
        }
        return ResponseEntity.ok(getTotalGameResultRes);
    }

    @ApiOperation(value = "선택된 사진 저장", notes = "모든 라운드 종료 후 유저는 저장하고 싶은 사진을 선택해 저장한다.")
    @ApiResponses(value = {
            @ApiResponse(code = 200, message = "선택한 사진 저장 성공", examples = @Example(value = @ExampleProperty(mediaType = "application/json", value = "ok"))),
            @ApiResponse(code = 400, message = "선택한 사진 저장 실패", examples = @Example(value = @ExampleProperty(mediaType = "application/json", value = "{ \n errorCode: 400, \n message: fail \n}")))
    })
    @ApiImplicitParam(name = "getSelectedImagesReq", value = "GetSelectedImages object", dataTypeClass = GetSelectedImagesReq.class, paramType = "body")
    @PostMapping("/image/upload")
    public ResponseEntity<?> getSelectedImages(
            HttpServletRequest request,
            @RequestBody GetSelectedImagesReq getSelectedImagesReq) {

        Long memberId = (Long) request.getAttribute("memberId");

        Long albumId = albumService.getAlbum(memberId);
        if (albumId == null) {
            return new ResponseEntity<>("앨범이 존재하지 않음", HttpStatus.BAD_REQUEST);
        }

        List<Long> resultsId = getSelectedImagesReq.getResults();
        List<String> captureUrls = new ArrayList<>();
        for (Long resultId : resultsId) {
            String captureUrl = gameService.getCaptureUrl(resultId);
            if (captureUrl == null) {
                return new ResponseEntity<>("이미지를 가져오지 못함", HttpStatus.BAD_REQUEST);
            }
            Image saved = albumService.saveImage(memberId, captureUrl);
            if (saved == null) {
                return new ResponseEntity<>("이미지가 저장되지 않음", HttpStatus.BAD_REQUEST);
            }
        }

        return new ResponseEntity<>(HttpStatus.OK);
    }
}

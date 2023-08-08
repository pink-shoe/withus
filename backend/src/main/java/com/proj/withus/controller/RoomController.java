package com.proj.withus.controller;

import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

import com.proj.withus.domain.Member;
import com.proj.withus.domain.Player;
import com.proj.withus.domain.dto.GetRoomInfoRes;
import com.proj.withus.domain.dto.PlayerInfo;
import com.proj.withus.domain.dto.PlayerInfoDto;
import com.proj.withus.repository.RoomRepository;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.proj.withus.domain.Room;
import com.proj.withus.domain.dto.CreateRoomReq;
import com.proj.withus.domain.dto.EnterRoomRes;
import com.proj.withus.domain.dto.ModifyRoomReq;
import com.proj.withus.domain.dto.SocialMemberInfo;
import com.proj.withus.service.MemberService;
import com.proj.withus.service.RoomService;
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

import javax.servlet.http.HttpServletRequest;

@Api(tags = "방 API", description = "게임 방 관련 기능을 처리하는 API (RoomController)")
@RestController
@Slf4j
@RequiredArgsConstructor
@RequestMapping(value = "/api/rooms", produces = MediaType.APPLICATION_JSON_VALUE)
@ApiResponses({
    @ApiResponse(code = 401, message = "토큰 만료", examples = @Example(value = @ExampleProperty(mediaType = "application/json", value = "{ \n errorCode: 401, \n message: token expired \n}")))
})
public class RoomController {

    private final RoomService roomService;
    private final JwtUtil jwtUtil;
    private final RoomRepository roomRepository;

    private final MemberService memberService;

    @ApiOperation(value = "방 정보 조회", notes = "방 정보와 플레이어 정보를 조회한다.")
    @ApiResponses(value = {
        @ApiResponse(code = 200, message = "정보 조회 성공", response = GetRoomInfoRes.class),
        @ApiResponse(code = 400, message = "정보 조회 실패", examples = @Example(value = @ExampleProperty(mediaType = "application/json", value = "{ \n errorCode: 400, \n message: fail \n}"))),
        @ApiResponse(code = 403, message = "권한 부족", examples = @Example(value = @ExampleProperty(mediaType = "application/json", value = "{ \n errorCode: 403, \n message: auth problem \n}")))
    })
    @ApiImplicitParams(value = {
        @ApiImplicitParam(name = "room_code", value = "방 입장 코드", required = true, dataType = "int", paramType = "path")
    })
    @GetMapping("/info/{room_code}")
    public ResponseEntity<?> getRoomInfo(
        HttpServletRequest request,
        @PathVariable("room_code") int roomCode) {

        Long memberId;
        String token = (String) request.getAttribute("token");
        try {
            SocialMemberInfo socialMemberInfo = jwtUtil.extractMemberId(token);
            memberId = socialMemberInfo.getId();
        } catch (Exception e) {
            return new ResponseEntity<String>("권한이 없는 유저입니다.", HttpStatus.UNAUTHORIZED);
        }

        Optional<Room> room = roomService.getRoomByCode(roomCode);
        if (!room.isPresent()) {
            return new ResponseEntity<String>("존재하지 않는 방입니다.", HttpStatus.BAD_REQUEST);
        }

        Long roomId = room.get().getId();

        List<Player> players = roomService.getPlayerList(roomId);
        List<PlayerInfo> playerInfos = new ArrayList<>();
        for (Player player : players) {
            PlayerInfo playerInfo = PlayerInfo.builder()
                .playerId(player.getId())
                .nickname(memberService.getMemberInfo(player.getId()).getNickname())
                .teamType(player.getTeamType())
                .ready(player.isReady())
                .build();
            playerInfos.add(playerInfo);
        }

        GetRoomInfoRes getRoomInfoRes = GetRoomInfoRes.builder()
            .room(room)
            .playerInfos(playerInfos)
            .hostId(getHostId(roomId))
            .build();
        return new ResponseEntity<GetRoomInfoRes>(getRoomInfoRes, HttpStatus.OK);
    }

    @ApiOperation(value = "방 생성", notes = "방장은 방을 생성한다.")
    @ApiResponses(value = {
        @ApiResponse(code = 201, message = "방 만들기 성공", response = Integer.class, examples = @Example(value = @ExampleProperty(mediaType = "application/json", value = "479053"))),
        @ApiResponse(code = 400, message = "방 만들기 실패", examples = @Example(value = @ExampleProperty(mediaType = "application/json", value = "{ \n errorCode: 400, \n message: fail \n}")))
    })
    @ApiImplicitParam(name = "createRoomReq", value = "CreateRoomReq object", dataTypeClass = CreateRoomReq.class, paramType = "body")
    @PostMapping
    public ResponseEntity<?> createRoom(
        HttpServletRequest request,
        @RequestBody CreateRoomReq createRoomReq) { // dto 새로 만들어야 함

        System.out.println("createRoomReq.getId()" + createRoomReq.getId());
        System.out.println("createRoomReq.getRoomType()" + createRoomReq.getRoomType());

        //        try {
        //            Long id = jwtUtil.extractMemberId(token);
        //        } catch (Exception e) {
        //            return new ResponseEntity<String>("권한이 없는 유저입니다.", HttpStatus.UNAUTHORIZED);
        //        }
        Room newRoom = roomService.createRoom(createRoomReq);
        return new ResponseEntity<Integer>(newRoom.getCode(), HttpStatus.CREATED);
        // return new ResponseEntity<Room>(newRoom, HttpStatus.CREATED);
    }

    @ApiOperation(value = "방 입장", notes = "참가자는 방에 참여한다.")
    @ApiResponses(value = {
        @ApiResponse(code = 200, message = "방 입장 성공", response = String.class, examples = @Example(value = @ExampleProperty(mediaType = "application/json", value = "ok"))),
        @ApiResponse(code = 400, message = "방 입장 실패", examples = @Example(value = @ExampleProperty(mediaType = "application/json", value = "{ \n errorCode: 400, \n message: fail \n}"))),
        @ApiResponse(code = 403, message = "권한 부족", examples = @Example(value = @ExampleProperty(mediaType = "application/json", value = "{ \n errorCode: 403, \n message: auth problem \n}")))
    })
    @ApiImplicitParams(
        value = {
            @ApiImplicitParam(name = "room_code", value = "방 코드", required = true, dataType = "int", paramType = "path"),
        }
    )
    @GetMapping("/{room_code}")
    public ResponseEntity<?> enterRoom(
        HttpServletRequest request,
        @PathVariable("room_code") int roomCode) {
        Long memberId = -1L;
        String loginType = "";
        String token = (String) request.getAttribute("token");
        try {
            SocialMemberInfo socialMemberInfo = jwtUtil.extractMemberId(token);
            memberId = socialMemberInfo.getId();
            loginType = socialMemberInfo.getLoginType();
        } catch (Exception e) {
            return new ResponseEntity<String>("권한이 없는 유저입니다.", HttpStatus.UNAUTHORIZED);
        }

        Optional<Room> room = roomService.enterRoom(roomCode, memberId);
        // Optional<>은 isPresent()로 확인!
        if (!room.isPresent()) {
            return new ResponseEntity<String>("존재하지 않는 방입니다.", HttpStatus.BAD_REQUEST);
        }
        // else {
            // EnterRoomRes enterRoomRes = new EnterRoomRes();
            // enterRoomRes.setRoomId(room.get().getId());
            // enterRoomRes.setRoomType(room.get().getType());
            // enterRoomRes.setCode(String.valueOf(room.get().getCode()));
            // enterRoomRes.setHostId(getHostId(room.get().getId()));
            //
            // List<Player> playerList = roomService.getPlayerList(room.get().getId());
            // List<PlayerInfoDto> playerInfos = new ArrayList<>();
            // for (Player player : playerList) {
            //     PlayerInfoDto playerInfo = new PlayerInfoDto();
            //     playerInfo.setMemberId(player.getId());
            //     playerInfo.setNickname(memberService.getMemberInfo(player.getId()).getNickname());
            //     playerInfo.setReady(roomService.getReadyStatus(player.getId()));
            //
            //     playerInfos.add(playerInfo);
            // }
            // enterRoomRes.setPlayers(playerInfos);
            // return new ResponseEntity<EnterRoomRes>(enterRoomRes, HttpStatus.OK);
            // return new ResponseEntity<Integer>(roomCode, HttpStatus.OK);

        // }
        return new ResponseEntity<>(HttpStatus.OK);
    }

    @ApiOperation(value = "방 나가기", notes = "참가자는 방에서 나간다.")
    @ApiResponses(value = {
        @ApiResponse(code = 200, message = "방 나가기 성공", response = String.class, examples = @Example(value = @ExampleProperty(mediaType = "application/json", value = "방 나가기 성공"))),
        @ApiResponse(code = 400, message = "방 나가기 실패", examples = @Example(value = @ExampleProperty(mediaType = "application/json", value = "{ \n errorCode: 400, \n message: fail \n}")))
    })
    @ApiImplicitParams(
        value = {
            @ApiImplicitParam(name = "room_id", value = "참여한 방 번호", required = true, dataType = "Long", paramType = "path"),
            // @ApiImplicitParam(name = "member_id", value = "회원 id", required = true, dataType = "Long", paramType = "path")
        }
    )
    @DeleteMapping("/{room_id}")
    public ResponseEntity<?> leaveRoom(
        HttpServletRequest request,
        @PathVariable("room_id") Long roomId) {

        String token = (String) request.getAttribute("token");
        SocialMemberInfo socialMemberInfo = jwtUtil.extractMemberId(token);
        Long memberId = socialMemberInfo.getId();
        try {
            roomService.leaveRoom(roomId, memberId);
        } catch (Exception e) {
            return new ResponseEntity<String>("오류가 발생했습니다.", HttpStatus.BAD_REQUEST);
        }
        return new ResponseEntity<String>("방 나가기 성공", HttpStatus.OK); // 웹소켓에서 처리 가능한지에 따라 변경할 예정 (일단 String으로 성공 결과만 처리)
    }

    /*
    방장인거 확인하고, 방장 맞으면 처리.
     */
    @ApiOperation(value = "방 옵션 수정", notes = "방장은 방 옵션을 수정한다.")
    @ApiResponses(value = {
        @ApiResponse(code = 200, message = "방 옵션 수정 성공", response = Integer.class, examples = @Example(value = @ExampleProperty(mediaType = "application/json", value = "479053"))),
        @ApiResponse(code = 400, message = "방 옵션 수정 실패", examples = @Example(value = @ExampleProperty(mediaType = "application/json", value = "{ \n errorCode: 400, \n message: fail \n}"))),
        @ApiResponse(code = 403, message = "권한 부족", examples = @Example(value = @ExampleProperty(mediaType = "application/json", value = "{ \n errorCode: 403, \n message: auth problem \n}")))
    })
    @ApiImplicitParams(
        value = {
            @ApiImplicitParam(name = "room_id", value = "참여한 방 번호", required = true, dataType = "Long", paramType = "path"),
            @ApiImplicitParam(name = "modifyRoomReq", value = "ModifyRoomReq object", dataTypeClass = ModifyRoomReq.class, paramType = "body")
        }
    )
    @PutMapping("/{room_id}")
    public ResponseEntity<?> modifyRoom(
        HttpServletRequest request,
        @PathVariable("room_id") Long roomId,
        @RequestBody ModifyRoomReq modifyRoomReq) {

        String token = ((String) request.getAttribute("token"));
        System.out.println("token:~~~~" + token);
        try {
            SocialMemberInfo socialMemberInfo = jwtUtil.extractMemberId(token);
            System.out.println("-------------------------------");
            Long id = socialMemberInfo.getId();
            // System.out.println("memberId:~~ ");
            // System.out.println(id);
            // log.info("memberId:~~ ", id);
            // 방장 체크 // 이렇게 깊은건 어떻게 처리하는게 깔끔한지 알아보기 (depth 3 이상)
            Long hostId = getHostId(roomId);
            // log.info("hostId:~~ ", hostId);
            // System.out.println(hostId);
            // System.out.println("hostId");

            if (hostId != id) {
                return new ResponseEntity<String>("방장이 아닙니다.", HttpStatus.FORBIDDEN);
            }
        } catch (Exception e) {
            return new ResponseEntity<String>("권한이 없는 유저입니다.", HttpStatus.FORBIDDEN);
        }

        boolean isValid = jwtUtil.validateJwtToken(token);
        System.out.println("request.getAttribute(\"token\") 찍어보기 " + token);
        System.out.println("isValid 찍어보기 " + isValid);
        if (!isValid) {
            return new ResponseEntity<String>("토큰이 만료되었습니다.", HttpStatus.UNAUTHORIZED);
        }
        roomService.modifyRoom(modifyRoomReq, roomId); // 반환 받아도 됨
        return new ResponseEntity<Integer>(roomService.getRoomInfo(roomId).get().getCode(), HttpStatus.OK);
        // return new ResponseEntity<String>("성공", HttpStatus.OK);
    }

    @ApiOperation(value = "유저 닉네임 수정", notes = "방에서 유저는 닉네임을 변경한다.")
    @ApiResponses(value = {
        @ApiResponse(code = 200, message = "닉네임 수정 성공", response = String.class, examples = @Example(value = @ExampleProperty(mediaType = "application/json", value = "닉네임이 수정되었습니다."))),
        @ApiResponse(code = 400, message = "닉네임 수정 실패", examples = @Example(value = @ExampleProperty(mediaType = "application/json", value = "{ \n errorCode: 400, \n message: fail \n}"))),
        @ApiResponse(code = 403, message = "권한 부족", examples = @Example(value = @ExampleProperty(mediaType = "application/json", value = "{ \n errorCode: 403, \n message: auth problem \n}")))
    })
    @ApiImplicitParams(
        value = {
            @ApiImplicitParam(name = "nickname", value = "수정할 닉네임", required = true, dataType = "String", paramType = "body")
        }
    )
    @PutMapping("/members/social")
    public ResponseEntity<?> modifyNickname(
        HttpServletRequest request,
        @RequestBody String nickname) {
        log.info("nickname", nickname);
        Long id = -1L;
        String token = (String) request.getAttribute("token");

        try {
            SocialMemberInfo socialMemberInfo = jwtUtil.extractMemberId(token);
            id = socialMemberInfo.getId();
        } catch (Exception e) {
            return new ResponseEntity<String>("권한이 없는 유저입니다.", HttpStatus.UNAUTHORIZED);
        }
        log.info("modify nickname - id: ", id);

        try {
            int isSuccess = roomService.modifyNickname(id, nickname);
            if (isSuccess != 1) {
                System.out.println("ididididi: " + id); //
                return new ResponseEntity<String>("권한이 없습니다.", HttpStatus.UNAUTHORIZED);
            }
            return new ResponseEntity<String>("닉네임이 수정되었습니다.", HttpStatus.OK);
        } catch (Exception e) {
            return new ResponseEntity<String>("닉네임 수정에 실패했습니다.", HttpStatus.FORBIDDEN);
        }
    }

    @ApiOperation(value = "게임 준비 및 취소", notes = "사용자는 게임 준비 및 취소를 할 수 있다.")
    @ApiResponses(value = {
        @ApiResponse(code = 200, message = "준비 상태 갱신 성공", response = Integer.class, examples = @Example(value = @ExampleProperty(mediaType = "application/json", value = "479053"))),
        @ApiResponse(code = 400, message = "준비 상태 갱신 실패", examples = @Example(value = @ExampleProperty(mediaType = "application/json", value = "{ \n errorCode: 400, \n message: fail \n}")))
    })
    @ApiImplicitParams(
        value = {
            @ApiImplicitParam(name = "room_id", value = "참여한 방 번호", required = true, dataType = "Long", paramType = "path", example = "1")
        }
    )
    @GetMapping("/ready/{room_id}")
    public ResponseEntity<?> setReady(
        HttpServletRequest request,
        @PathVariable("room_id") Long roomId) {

        SocialMemberInfo socialMemberInfo = jwtUtil.extractMemberId((String) request.getAttribute("token"));
        Long memberId = socialMemberInfo.getId();

        Player player = roomService.getPlayerInRoom(memberId, roomId);
        if (player == null) {
            return new ResponseEntity<String>("참가자가 아닙니다.", HttpStatus.UNAUTHORIZED);
        }


        try {
            roomService.modifyReady(player.getId());
        } catch (Exception e) {
            return new ResponseEntity<String>("게임 준비에 실패했습니다.", HttpStatus.BAD_REQUEST);
        }

        List<Player> readyPlayer = roomService.getReadyPlayers(roomId);
        // return new ResponseEntity<List<Player>>(readyPlayer, HttpStatus.OK);
        return new ResponseEntity<Integer>(roomService.getRoomInfo(roomId).get().getCode(), HttpStatus.OK);
    }

    @ApiOperation(value = "게임 시작 가능 여부", notes = "게임 시작 여부를 알려준다.")
    @ApiResponses(value = {
        @ApiResponse(code = 200, message = "게임 시작 성공", response = Boolean.class, examples = @Example(value = @ExampleProperty(mediaType = "application/json", value = "true"))),
        @ApiResponse(code = 400, message = "게임 시작 실패", examples = @Example(value = @ExampleProperty(mediaType = "application/json", value = "{ \n errorCode: 400, \n message: fail \n}")))
    })
    @ApiImplicitParams(
        value = {
            @ApiImplicitParam(name = "room_id", value = "참여한 방 번호", required = true, dataType = "Long", paramType = "path")
        }
    )
    @GetMapping("/start/{room_id}")
    public ResponseEntity<?> isStart(
        HttpServletRequest request,
        @PathVariable("room_id") Long roomId) {

        SocialMemberInfo socialMemberInfo = jwtUtil.extractMemberId((String) request.getAttribute("token"));
        Long memberId = socialMemberInfo.getId();

        Long host = 1L;
        // Long host = roomService.getHostId(roomId);
        if (host == null) {
            return new ResponseEntity<String>("방이 존재하지 않습니다.", HttpStatus.BAD_REQUEST);
        }
        if (!roomService.getStartStatus(roomId)) {
            return new ResponseEntity<String>("준비되지 않은 플레이어가 있습니다.", HttpStatus.BAD_REQUEST);
        }
        List<Player> players = roomService.getPlayerList(roomId);
        // return new ResponseEntity<List<Player>>(players, HttpStatus.OK);
        return new ResponseEntity<Boolean>(true, HttpStatus.OK);
    }

    // 트랜잭션 전파 문제 생겨서 일단 Service -> Controller에서 처리
    private Long getHostId(Long roomId) {
        Long hostId = roomRepository.findHostIdByRoomId(roomId);
        System.out.println("hostId~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~");
        System.out.println(hostId);
        return hostId;
    }

}

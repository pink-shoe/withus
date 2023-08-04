package com.proj.withus.controller;

import java.util.List;
import java.util.Optional;

import com.proj.withus.domain.Member;
import com.proj.withus.domain.Player;
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
import com.proj.withus.service.RoomService;
import com.proj.withus.util.JwtUtil;

import io.swagger.annotations.Api;
import io.swagger.annotations.ApiImplicitParam;
import io.swagger.annotations.ApiImplicitParams;
import io.swagger.annotations.ApiOperation;
import io.swagger.annotations.ApiResponse;
import io.swagger.annotations.ApiResponses;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;

import javax.servlet.http.HttpServletRequest;

@Api(tags = "방 api")
@RestController
@Slf4j
@RequiredArgsConstructor
@RequestMapping(value = "/api/rooms", produces = MediaType.APPLICATION_JSON_VALUE)
@ApiResponses({
    @ApiResponse(code = 401, message = "토큰 만료")
})
public class RoomController {

    private final RoomService roomService;
    private final JwtUtil jwtUtil;

    @ApiOperation(value = "방 생성", notes = "방장은 방을 생성한다.")
    @ApiResponses(value = {
        @ApiResponse(code = 201, message = "방 만들기 성공"),
        @ApiResponse(code = 400, message = "방 만들기 실패")
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
        return new ResponseEntity<Room>(newRoom, HttpStatus.CREATED);
    }

    @ApiOperation(value = "방 입장", notes = "참가자는 방에 참여한다.")
    @ApiResponses(value = {
        @ApiResponse(code = 200, message = "방 입장 성공"),
        @ApiResponse(code = 400, message = "방 입장 실패"),
        @ApiResponse(code = 403, message = "권한 부족")
    })
    @GetMapping("/{room_id}/{member_id}")
    public ResponseEntity<?> enterRoom(
            HttpServletRequest request,
            @PathVariable("room_id") Long roomId,
            @PathVariable("member_id") Long memberId) {
        Long id = -1L;
        String loginType = "";
        try {
            SocialMemberInfo socialMemberInfo = jwtUtil.extractMemberId((String) request.getAttribute("token"));
            id = socialMemberInfo.getId();
            loginType = socialMemberInfo.getLoginType();
        } catch (Exception e) {
            return new ResponseEntity<String>("권한이 없는 유저입니다.", HttpStatus.UNAUTHORIZED);
        }

        Optional<Room> room = roomService.enterRoom(roomId, memberId);
        // Optional<>은 isPresent()로 확인!
        if (!room.isPresent()) {
            return new ResponseEntity<String>("존재하지 않는 방입니다.", HttpStatus.BAD_REQUEST);
        } else {
            EnterRoomRes enterRoomRes = new EnterRoomRes();
            enterRoomRes.setRoomId(room.get().getId());
            enterRoomRes.setRoomType(room.get().getType());
            enterRoomRes.setCode(String.valueOf(room.get().getCode()));
            enterRoomRes.setHostId(roomService.getHostId(roomId));
            enterRoomRes.setPlayers(roomService.getPlayerList(roomId)); // List<>를 이렇게 set하는게 맞나..
            return new ResponseEntity<EnterRoomRes>(enterRoomRes, HttpStatus.OK);
        }

    }

    @ApiOperation(value = "방 나가기", notes = "참가자는 방에서 나간다.")
    @ApiResponses(value = {
        @ApiResponse(code = 200, message = "방 나가기 성공"),
        @ApiResponse(code = 400, message = "방 나가기 실패")
    })
    @DeleteMapping("/{room_id}/{member_id}")
    public ResponseEntity<?> leaveRoom(
            HttpServletRequest request,
            @PathVariable("room_id") Long roomId,
            @PathVariable("member_id") Long pathMemberId) {

        SocialMemberInfo socialMemberInfo = jwtUtil.extractMemberId((String) request.getAttribute("token"));
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
        @ApiResponse(code = 200, message = "방 나가기 성공"),
        @ApiResponse(code = 400, message = "방 나가기 실패"),
        @ApiResponse(code = 403, message = "권한 부족")
    })
    @ApiImplicitParam(name = "modifyRoomReq", value = "ModifyRoomReq object", dataTypeClass = ModifyRoomReq.class, paramType = "body")
    @PutMapping("/{room_id}")
    public ResponseEntity<?> modifyRoom(
            HttpServletRequest request,
            @PathVariable("room_id") Long roomId,
            @RequestBody ModifyRoomReq modifyRoomReq) {

        try {
            SocialMemberInfo socialMemberInfo = jwtUtil.extractMemberId((String) request.getAttribute("token"));
            Long id = socialMemberInfo.getId();
            // 방장 체크 // 이렇게 깊은건 어떻게 처리하는게 깔끔한지 알아보기 (depth 3 이상)
            Long hostId = roomService.getHostId(roomId);
            if (hostId != id) {
                return new ResponseEntity<String>("방장이 아닙니다.", HttpStatus.FORBIDDEN);
            }
        } catch (Exception e) {
            return new ResponseEntity<String>("권한이 없는 유저입니다.", HttpStatus.FORBIDDEN);
        }

        boolean isValid = jwtUtil.validateJwtToken((String) request.getAttribute("token"));
        if (!isValid) {
            return new ResponseEntity<String>("토큰이 만료되었습니다.", HttpStatus.UNAUTHORIZED);
        }
        roomService.modifyRoom(modifyRoomReq, roomId); // 반환 받아도 됨
        return new ResponseEntity<String>("성공", HttpStatus.OK);
    }

    @ApiOperation(value = "유저 닉네임 수정", notes = "방에서 유저는 닉네임을 변경한다.")
    @ApiResponses(value = {
        @ApiResponse(code = 200, message = "닉네임 수정 성공"),
        @ApiResponse(code = 400, message = "닉네임 수정 실패"),
        @ApiResponse(code = 403, message = "권한 부족")
    })
    @PutMapping("/members/social")
    public ResponseEntity<?> modifyNickname(
            HttpServletRequest request,
            @RequestBody() String nickname) {
        System.out.println(nickname);

        Long id = -1L;
        try {
            SocialMemberInfo socialMemberInfo = jwtUtil.extractMemberId((String) request.getAttribute("token"));
            id = socialMemberInfo.getId();
            System.out.println("ididididi: " + id); //
        } catch (Exception e) {
            return new ResponseEntity<String>("권한이 없는 유저입니다.", HttpStatus.UNAUTHORIZED);
        }
        System.out.println("ididididi: " + id); //

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
            @ApiResponse(code = 200, message = "준비 상태 갱신 성공"),
            @ApiResponse(code = 400, message = "준비 상태 갱신 실패")
    })
    @GetMapping("/ready/{is_ready}/{room_id}")
    public ResponseEntity<?> setReady(
            HttpServletRequest request,
            @PathVariable("is_ready") String isReady,
            @PathVariable("room_id") Long roomId) {

        if (isReady.trim().equals("")) {
            return new ResponseEntity<String>("준비 상태가 설정되지 않았습니다.", HttpStatus.BAD_REQUEST);
        }

        SocialMemberInfo socialMemberInfo = jwtUtil.extractMemberId((String) request.getAttribute("token"));
        Long memberId = socialMemberInfo.getId();

        Player player = roomService.getPlayerInRoom(memberId, roomId);
        if (player == null) {
            return new ResponseEntity<String>("참가자가 아닙니다.", HttpStatus.UNAUTHORIZED);
        }

        try {
            if (isReady.equals("ready")) {
                roomService.modifyReady(player.getId(), true);
            } else if (isReady.equals("cancel")) {
                roomService.modifyReady(player.getId(), false);
            }
        } catch (Exception e) {
            return new ResponseEntity<String>("게임 준비에 실패했습니다.", HttpStatus.BAD_REQUEST);
        }

        List<Long> readyPlayer = roomService.getReadyPlayers(roomId);
        return new ResponseEntity<List<Long>>(readyPlayer, HttpStatus.OK);
    }

    @ApiOperation(value = "게임 시작 여부", notes = "게임 시작 여부를 알려준다.")
    @ApiResponses(value = {
        @ApiResponse(code = 200, message = "게임 시작 성공"),
        @ApiResponse(code = 400, message = "게임 시작 실패")
    })
    @GetMapping("/start/{room_id}")
    public ResponseEntity<?> isStart(
        HttpServletRequest request,
        @PathVariable("room_id") Long roomId) {

        SocialMemberInfo socialMemberInfo = jwtUtil.extractMemberId((String) request.getAttribute("token"));
        Long memberId = socialMemberInfo.getId();

        Long host = roomService.getHostId(roomId);
        if (host == null) {
            return new ResponseEntity<String>("방이 존재하지 않습니다.", HttpStatus.BAD_REQUEST);
        }

        if (!roomService.getStartStatus(roomId)) {
            return new ResponseEntity<String>("준비되지 않은 플레이어가 있습니다.", HttpStatus.BAD_REQUEST);
        }

        return new ResponseEntity<String>("게임을 시작할 수 있습니다.", HttpStatus.OK);
    }
}

package com.proj.withus.controller;

import com.proj.withus.domain.Room;
import com.proj.withus.domain.dto.CreateRoomReq;
import com.proj.withus.domain.dto.EnterRoomRes;
import com.proj.withus.domain.dto.ModifyNicknameReq;
import com.proj.withus.domain.dto.ModifyRoomReq;
import com.proj.withus.service.RoomService;
import com.proj.withus.util.JwtUtil;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.Optional;

@RestController
@Slf4j
@RequiredArgsConstructor
@RequestMapping("/api/rooms")
public class RoomController {

    private final RoomService roomService;
    private final JwtUtil jwtUtil;

    @PostMapping
    public ResponseEntity<?> createRoom(
            @RequestHeader("Authorization") String token,
            @RequestBody CreateRoomReq createRoomReq) { // dto 새로 만들어야 함
        try {
            Long id = jwtUtil.extractMemberId(token);
        } catch (Exception e) {
            return new ResponseEntity<String>("권한이 없는 유저입니다.", HttpStatus.UNAUTHORIZED);
        }
        Room newRoom = roomService.createRoom(createRoomReq);
        return new ResponseEntity<Room>(newRoom, HttpStatus.OK);
    }

    @GetMapping("/{room_id}/{member_id}")
    public ResponseEntity<?> enterRoom(
            @RequestHeader("Authorization") String token,
            @PathVariable("room_id") Long roomId,
            @PathVariable("member_id") Long memberId) {
        try {
            Long id = jwtUtil.extractMemberId(token);
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

//    @DeleteMapping("/{room_id}/{member_id}")
//    public ResponseEntity<?> leaveRoom(
//            @RequestHeader("Authorization") String token,
//            @PathVariable("room_id") Long roomId,
//            @PathVariable("member_id") Long pathMemberId) {
//
//        Long memberId = jwtUtil.extractMemberId(token); // try-catch 뺌
//        boolean isInRoom = roomService.leaveRoom(roomId, memberId);
//
//        return new ResponseEntity<>();
//    }
    // 방 나갈 때 response가 왜 필요한가

    /*
    방장인거 확인하고, 방장 맞으면 처리.
     */
    @PutMapping("/{room_id}")
    public ResponseEntity<?> modifyRoom(
            @RequestHeader("Authorization") String token,
            @PathVariable("room_id") Long roomId,
            @RequestBody ModifyRoomReq modifyRoomReq) {
        try {
            Long id = jwtUtil.extractMemberId(token);
            // 방장 체크 // 이렇게 깊은건 어떻게 처리하는게 깔끔한지 알아보기 (depth 3 이상)
            Long hostId = roomService.getHostId(roomId);
            if (hostId != id) {
                return new ResponseEntity<String>("방장이 아닙니다.", HttpStatus.FORBIDDEN);
            }
        } catch (Exception e) {
            return new ResponseEntity<String>("권한이 없는 유저입니다.", HttpStatus.FORBIDDEN);
        }

        boolean isValid = jwtUtil.validateJwtToken(token);
        if (!isValid) {
            return new ResponseEntity<String>("토큰이 만료되었습니다.", HttpStatus.UNAUTHORIZED);
        }
        roomService.modifyRoom(modifyRoomReq); // 반환 받아도 됨
        return new ResponseEntity<String>("성공", HttpStatus.OK);
    }

    @PutMapping("/members/social")
    public ResponseEntity<?> modifyNickname(
            @RequestHeader("Authorization") String token,
            @RequestBody ModifyNicknameReq modifyNicknameReq) {
        Long id = -1L;
        try {
            id = jwtUtil.extractMemberId(token);
        } catch (Exception e) {
            return new ResponseEntity<String>("권한이 없는 유저입니다.", HttpStatus.UNAUTHORIZED);
        }
        try {
            int isSuccess = roomService.modifyNickname(id, modifyNicknameReq.getNickname());
            if (isSuccess != 1) {
                return new ResponseEntity<String>("권한이 없습니다.", HttpStatus.UNAUTHORIZED);
            }
            return new ResponseEntity<String>("닉네임이 수정되었습니다.", HttpStatus.OK);
        } catch (Exception e) {
            return new ResponseEntity<String>("닉네임 수정에 실패했습니다.", HttpStatus.FORBIDDEN);
        }
    }


}

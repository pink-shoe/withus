package com.proj.withus.controller;

import com.proj.withus.domain.Room;
import com.proj.withus.domain.dto.CreateRoomReq;
import com.proj.withus.domain.dto.EnterRoomRes;
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

        if (!room.isPresent()) {
            return new ResponseEntity<String>("존재하지 않는 방입니다.", HttpStatus.BAD_REQUEST);
        } else {
            EnterRoomRes enterRoomRes = new EnterRoomRes();
            enterRoomRes.setRoomId(room.get().getId());
            enterRoomRes.setRoomType(room.get().getType());
            enterRoomRes.setCode(String.valueOf(room.get().getCode()));
            enterRoomRes.setHostId(roomService.getHostId(roomId));
        }

    }

    @DeleteMapping("/{room_id}/{member_id}")
    public ResponseEntity<?> leaveRoom(
            @RequestHeader("Authorization") String token,
            @PathVariable("room_id") Long roomId,
            @PathVariable("member_id") Long memberId) {
        try {
            Long id = jwtUtil.extractMemberId(token);
        } catch (Exception e) {
            return new ResponseEntity<String>("권한이 없는 유저입니다.", HttpStatus.UNAUTHORIZED);
        }

        boolean isInRoom = roomService.leaveRoom(roomId, memberId);

    }

    @PutMapping("/{room_id}")
    public ResponseEntity<?> modifyRoom(
            @RequestHeader("Authorization") String token,
            @PathVariable("room_id") Long room_id,
            @RequestBody Room room) {
        try {
            Long id = jwtUtil.extractMemberId(token);
        } catch (Exception e) {
            return new ResponseEntity<String>("권한이 없는 유저입니다.", HttpStatus.UNAUTHORIZED);
        }



    }


}

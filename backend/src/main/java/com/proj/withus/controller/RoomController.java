package com.proj.withus.controller;

import com.proj.withus.domain.Room;
import com.proj.withus.service.RoomService;
import com.proj.withus.util.JwtUtil;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

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
            @RequestBody Room room) { // dto 새로 만들어야 함
        Long id = jwtUtil.extractMemberId(token);
        Room newRoom = roomService.createRoom(room);

    }

    @GetMapping("/{room_id}/{member_id}")
    public ResponseEntity<?> enterRoom(
            @RequestHeader("Authorization") String token,
            @PathVariable("room_id") Long roomId,
            @PathVariable("member_id") Long memberId) {

    }

    @DeleteMapping("/{room_id}/{member_id}")
    public ResponseEntity<?> leaveRoom(
            @RequestHeader("Authorization") String token,
            @PathVariable("room_id") Long roomId,
            @PathVariable("member_id") Long memberId) {
    }

    @PutMapping("/{room_id}")
    public ResponseEntity<?> modifyRoom(
            @RequestHeader("Authorization") String token,
            @PathVariable("room_id") Long room_id,
            @RequestBody Room room) {

    }
}

package com.proj.withus.controller;

import com.proj.withus.domain.Player;
import com.proj.withus.domain.Room;
import com.proj.withus.domain.Shape;
import com.proj.withus.domain.dto.CaptureDto;
import com.proj.withus.domain.dto.GameResultDto;
import com.proj.withus.domain.dto.RoomPlayerDto;
import com.proj.withus.domain.dto.TotalGameResultDto;
import com.proj.withus.service.GameService;
import com.proj.withus.util.JwtUtil;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@Slf4j
@RequiredArgsConstructor
@RequestMapping("/api/games")
public class GameController {


    private final GameService gameService;
    private final JwtUtil jwtUtil = new JwtUtil();

    @GetMapping("/{room_id}")
    public ResponseEntity<?> getGameInfo(@PathVariable("room_id") Long roomId, @RequestHeader("Authorization") String jwtToken) {
        Long hostId = jwtUtil.extractMemberId(jwtToken);

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

        RoomPlayerDto gameInfo = RoomPlayerDto.builder()
                .room(room)
                .players(players)
                .shapes(shapes)
                .build();

        return ResponseEntity.ok(gameInfo);
    }

    @PostMapping("/image")
    public ResponseEntity<?> getCaptureImage(@RequestHeader("Authorization") String jwtToken, @RequestBody CaptureDto captureDto) {
        if (!gameService.sendCaptureInfo(captureDto)) {
            return new ResponseEntity<>("AI 서버로 요청이 전달되지 않음", HttpStatus.BAD_REQUEST);
        }
        return ResponseEntity.ok(captureDto.getCurrentRound() + 1);
    }

    @GetMapping
    public ResponseEntity<?> getGameResult() {
        if (!gameService.getGameResult()) {
            return new ResponseEntity<>("AI 서버로부터 결과 전달 안됨", HttpStatus.BAD_REQUEST);
        }
        return new ResponseEntity<>(HttpStatus.OK);
    }

    @GetMapping("/result/{room_id}")
    public ResponseEntity<?> getGameTotalResult(@PathVariable("room_id") Long roomId) {
        List<TotalGameResultDto> totalGameResultDto = gameService.getTotalGameResult(roomId);
        if (totalGameResultDto == null) {
            return new ResponseEntity<>("전체 게임 결과를 가져오지 못함", HttpStatus.BAD_REQUEST);
        }
        return ResponseEntity.ok(totalGameResultDto);
    }
}

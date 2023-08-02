package com.proj.withus.controller;

import java.util.ArrayList;
import java.util.List;

import com.proj.withus.service.AlbumService;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestHeader;
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

@RestController
@Slf4j
@RequiredArgsConstructor
@RequestMapping("/api/games")
public class GameController {

    private final GameService gameService;
    private final AlbumService albumService;
    private final JwtUtil jwtUtil;

    @GetMapping("/{room_id}")
    public ResponseEntity<?> getGameInfo(
            @PathVariable("room_id") Long roomId,
            @RequestHeader("Authorization") String jwtToken) {

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

        return ResponseEntity.ok(GetGameInfoRes.builder()
                .room(room)
                .players(players)
                .shapes(shapes)
                .build());
    }

    @PostMapping("/image")
    public ResponseEntity<?> getCaptureImage(
            @RequestHeader("Authorization") String jwtToken,
            @RequestBody GetCaptureImageReq getCaptureImageReq) {

        if (!gameService.sendCaptureInfo(getCaptureImageReq)) {
            return new ResponseEntity<>("AI 서버로 요청이 전달되지 않음", HttpStatus.BAD_REQUEST);
        }
        return ResponseEntity.ok(getCaptureImageReq.getCurrentRound() + 1);
    }

    @GetMapping
    public ResponseEntity<?> getGameResult() {
        if (!gameService.getGameResult()) {
            return new ResponseEntity<>("AI 서버로부터 결과 전달 안됨", HttpStatus.BAD_REQUEST);
        }
        return new ResponseEntity<>(HttpStatus.OK);
    }

    @GetMapping("/result/{room_id}")
    public ResponseEntity<?> getGameTotalResult(
            @PathVariable("room_id") Long roomId,
            @RequestHeader("Authorization") String jwtToken) {

        Long memberId = jwtUtil.extractMemberId(jwtToken);
        if (memberId == null) {
            return new ResponseEntity<>("인증되지 않은 사용자", HttpStatus.BAD_REQUEST);
        }

        List<GetTotalGameResultRes> getTotalGameResultRes = gameService.getTotalGameResult(roomId);
        if (getTotalGameResultRes == null) {
            return new ResponseEntity<>("전체 게임 결과를 가져오지 못함", HttpStatus.BAD_REQUEST);
        }
        return ResponseEntity.ok(getTotalGameResultRes);
    }

    @PostMapping("/image/upload")
    public ResponseEntity<?> getSelectedImages(
            @RequestHeader("Authorization") String jwtToken,
            @RequestBody GetSelectedImagesReq getSelectedImagesReq) {

        Long memberId = jwtUtil.extractMemberId(jwtToken);

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

package com.proj.withus.service;

import java.util.ArrayList;
import java.util.List;
import java.util.Map;

import javax.transaction.Transactional;

import org.springframework.http.HttpEntity;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpMethod;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;
import org.springframework.util.LinkedMultiValueMap;
import org.springframework.util.MultiValueMap;
import org.springframework.web.client.RestTemplate;

import com.proj.withus.domain.GameResult;
import com.proj.withus.domain.Player;
import com.proj.withus.domain.Room;
import com.proj.withus.domain.Shape;
import com.proj.withus.domain.dto.GetCaptureImageReq;
import com.proj.withus.domain.dto.GetTotalGameResultRes;
import com.proj.withus.repository.GameResultRepository;
import com.proj.withus.repository.PlayerRepository;
import com.proj.withus.repository.RoomRepository;
import com.proj.withus.repository.ShapeRepository;

import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;

@Service
@RequiredArgsConstructor
@Slf4j
@Transactional
public class GameServiceImpl implements GameService {

    private final RoomRepository roomRepository;
    private final PlayerRepository playerRepository;
    private final GameResultRepository gameResultRepository;
    private final ShapeRepository shapeRepository;

    @Override
    public Room getRoomInfo(Long roomId) {
        // return playerRepository.findRoomById(memberId);
        return roomRepository.findRoomById(roomId).orElse(null);
    }


    @Override
    public List<Player> getPlayersInfo(Long roomId) {
        return playerRepository.findPlayersByRoomId(roomId);
    }

    @Override
    public List<Shape> getShapeInfo(int round) {
        return shapeRepository.findRandomShapes(round);
    }

    @Override
    public boolean sendCaptureInfo(GetCaptureImageReq getCaptureImageReq) {
        String url = ""; // flask 서버
        RestTemplate restTemplate = new RestTemplate();

        MultiValueMap<String, Object> requestBody = new LinkedMultiValueMap<>();
        requestBody.add("roomId", getCaptureImageReq.getRoomId());
        requestBody.add("captureUrl", getCaptureImageReq.getCaptureUrl());
        requestBody.add("currentRound", getCaptureImageReq.getCurrentRound());
        requestBody.add("shapeId", getCaptureImageReq.getShapeId());

        HttpEntity<MultiValueMap<String, Object>> request = new HttpEntity<>(requestBody);

        ResponseEntity<String> responseEntity = restTemplate.exchange(
                url,
                HttpMethod.POST,
                request,
                String.class
        );

        return responseEntity.getStatusCode().is2xxSuccessful();
    }

    @Override
    public boolean getGameResult() {
        String url = "";
        RestTemplate restTemplate = new RestTemplate();

        HttpHeaders headers = new HttpHeaders();
        HttpEntity<String> request = new HttpEntity<>(headers);

        ResponseEntity<Map> response = restTemplate.exchange(
            url,
            HttpMethod.GET,
            request,
            Map.class
        );

        GameResult gameResult = new GameResult();

        gameResult.setRoom(roomRepository.findRoomById((Long) response.getBody().get("roomId")).orElse(null));
        gameResult.setRound((int) response.getBody().get("currentRound"));
        gameResult.setCaptureUrl(response.getBody().get("captureUrl").toString());
        gameResult.setCorrect((Boolean) response.getBody().get("isCorrect"));
        gameResult.setCorrectRate((int) response.getBody().get("correctRate"));
        gameResult.setShape(shapeRepository.findShapeById((Long) response.getBody().get("shapeId")).orElse(null));
        Long gameResultId = gameResultRepository.save(gameResult).getId();

        if (gameResultId == null) {
            return false;
        }

        return true;
    }

    @Override
    public String getCaptureUrl(Long id) {
        return gameResultRepository.findById(id).get().getCaptureUrl();
    }

    @Override
    public List<GetTotalGameResultRes> getTotalGameResult(Long roomId) {
        List<GetTotalGameResultRes> totalGameResult = new ArrayList<>();
        List<GameResult> gameResult = gameResultRepository.findGameResultsByRoomId(roomId);

        Room room = roomRepository.findRoomById(roomId).orElse(null);
        if (gameResult.size() != room.getRound()) {
            return null;
        }

        for (GameResult result : gameResult) {
            totalGameResult.add(
                    GetTotalGameResultRes.builder()
                            .gameResult(result)
                            .shape(shapeRepository.findShapeById(result.getShape().getId()).orElse(null))
                            .build()
            );
        }

        return totalGameResult;
    }
}

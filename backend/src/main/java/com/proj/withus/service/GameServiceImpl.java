package com.proj.withus.service;

import com.proj.withus.domain.GameResult;
import com.proj.withus.domain.Player;
import com.proj.withus.domain.Room;
import com.proj.withus.domain.dto.CaptureDto;
import com.proj.withus.domain.dto.GameResultDto;
import com.proj.withus.domain.dto.TotalGameResultDto;
import com.proj.withus.repository.GameResultRepository;
import com.proj.withus.repository.PlayerRepository;
import com.proj.withus.repository.RoomRepository;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.HttpEntity;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpMethod;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;
import org.springframework.util.LinkedMultiValueMap;
import org.springframework.util.MultiValueMap;
import org.springframework.web.client.RestTemplate;
import org.springframework.web.util.UriComponentsBuilder;

import javax.transaction.Transactional;

import java.util.ArrayList;
import java.util.List;
import java.util.Map;

@Service
@RequiredArgsConstructor
@Slf4j
@Transactional
public class GameServiceImpl implements GameService {

    private final RoomRepository roomRepository;
    private final PlayerRepository playerRepository;
    private final GameResultRepository gameResultRepository;

    @Override
    public Room getRoomInfo(Long hostId) {
        return roomRepository.findByMemberId(hostId);
    }

    @Override
    public List<Player> getPlayersInfo(Long roomId) {
        return playerRepository.findPlayersByRoomId(roomId);
    }

    @Override
    public boolean sendCaptureInfo(CaptureDto captureDto) {
        String url = ""; // flask 서버
        RestTemplate restTemplate = new RestTemplate();

        MultiValueMap<String, Object> requestBody = new LinkedMultiValueMap<>();
        requestBody.add("roomId", captureDto.getRoomId());
        requestBody.add("captureUrl", captureDto.getCaptureUrl());
        requestBody.add("currentRound", captureDto.getCurrentRound());
        requestBody.add("shapeId", captureDto.getShapeId());

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

        // gameResult.setRoom(roomRepository.findByRoomId((Long) response.getBody().get("roomId")));
        gameResult.setRound((int) response.getBody().get("currentRound"));
        gameResult.setCaptureUrl(response.getBody().get("captureUrl").toString());
        gameResult.setCorrect((Boolean) response.getBody().get("isCorrect"));
        gameResult.setCorrectRate((int) response.getBody().get("correctRate"));

        Long gameResultId = gameResultRepository.save(gameResult).getId();

        if (gameResultId == null) {
            return false;
        }
        return true;
    }

    @Override
    public List<TotalGameResultDto> getTotalGameResult(Long roomId) {
        List<TotalGameResultDto> totalGameResult = new ArrayList<>();
        List<GameResult> gameResult = gameResultRepository.findGameResultsByRoomId(roomId);

        Room room = roomRepository.findRoomById(roomId);
        if (gameResult.size() != room.getRound()) {
            return null;
        }

        for (GameResult result : gameResult) {
            TotalGameResultDto totalGameResultDto = new TotalGameResultDto();
            totalGameResultDto.setGameResult(result);
            totalGameResult.add(totalGameResultDto);
        }

        return totalGameResult;
    }
}

package com.proj.withus.service;

import com.proj.withus.domain.Player;
import com.proj.withus.domain.Room;
import com.proj.withus.domain.dto.CaptureDto;
import com.proj.withus.domain.dto.GameResultDto;
import com.proj.withus.repository.PlayerRepository;
import com.proj.withus.repository.RoomRepository;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.HttpEntity;
import org.springframework.http.HttpMethod;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;
import org.springframework.util.LinkedMultiValueMap;
import org.springframework.util.MultiValueMap;
import org.springframework.web.client.RestTemplate;

import javax.transaction.Transactional;
import java.util.List;

@Service
@RequiredArgsConstructor
@Slf4j
@Transactional
public class GameServiceImpl implements GameService {

    private final RoomRepository roomRepository;
    private final PlayerRepository playerRepository;

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
    public GameResultDto getGameResult() {
        return null;
    }
}

package com.proj.withus.service;

import java.util.ArrayList;
import java.util.List;
import java.util.Map;

import javax.transaction.Transactional;

import com.proj.withus.domain.*;
import com.proj.withus.exception.CustomException;
import com.proj.withus.exception.ErrorCode;
import com.proj.withus.repository.*;
import org.springframework.http.HttpEntity;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpMethod;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;
import org.springframework.util.LinkedMultiValueMap;
import org.springframework.util.MultiValueMap;
import org.springframework.web.client.RestTemplate;

import com.proj.withus.domain.dto.GetCaptureImageReq;
import com.proj.withus.domain.dto.GetTotalGameResultRes;

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
    private final CaptureRepository captureRepository;

    @Override
    public Room getRoomInfo(Long memberId) {
         Room room = playerRepository.findRoomIdByPlayerId(memberId)
                 .orElseThrow(() -> new CustomException(ErrorCode.PLAYERS_ROOM_IS_NOT_EXIST));

         roomRepository.updateStart(room.getId(), "playing");

         return room;
    }


    @Override
    public List<Player> getPlayersInfo(Long roomId) {
        List<Player> players = playerRepository.findPlayersByRoomId(roomId);
        if (players.isEmpty()) {
            throw new CustomException(ErrorCode.PLAYER_NOT_FOUND);
        }
        return players;
    }

    @Override
    public List<Shape> getShapeInfo(int round) {
        List<Shape> shapes = shapeRepository.findRandomShapes(round);
        if (shapes.size() != round) {
            throw new CustomException(ErrorCode.SHAPE_NOT_LOAD);
        }
        return shapes;
    }

//    @Override
//    public boolean sendCaptureInfo(GetCaptureImageReq getCaptureImageReq) {
//        String url = ""; // flask 서버
//        RestTemplate restTemplate = new RestTemplate();
//
//        MultiValueMap<String, Object> requestBody = new LinkedMultiValueMap<>();
//        requestBody.add("roomId", getCaptureImageReq.getRoomId());
//        requestBody.add("captureUrl", getCaptureImageReq.getCaptureUrl());
//        requestBody.add("currentRound", getCaptureImageReq.getCurrentRound());
//        requestBody.add("shapeId", getCaptureImageReq.getShapeId());
//
//        HttpEntity<MultiValueMap<String, Object>> request = new HttpEntity<>(requestBody);
//
//        ResponseEntity<String> responseEntity = restTemplate.exchange(
//                url,
//                HttpMethod.POST,
//                request,
//                String.class
//        );
//
//        return responseEntity.getStatusCode().is2xxSuccessful();
//    }

//    @Override
//    public boolean getGameResult() {
//        String url = "";
//        RestTemplate restTemplate = new RestTemplate();
//
//        HttpHeaders headers = new HttpHeaders();
//        HttpEntity<String> request = new HttpEntity<>(headers);
//
//        ResponseEntity<Map> response = restTemplate.exchange(
//            url,
//            HttpMethod.GET,
//            request,
//            Map.class
//        );
//
//        GameResult gameResult = new GameResult();
//
//        gameResult.setRoom(roomRepository.findRoomById((Long) response.getBody().get("roomId"))
//                .orElseThrow(() -> new CustomException(ErrorCode.ROOM_NOT_FOUND)));
//        gameResult.setRound((int) response.getBody().get("currentRound"));
//        gameResult.setCaptureUrl(response.getBody().get("captureUrl").toString());
//        gameResult.setCorrect((Boolean) response.getBody().get("isCorrect"));
//        gameResult.setCorrectRate((int) response.getBody().get("correctRate"));
//        gameResult.setShape(shapeRepository.findShapeById((Long) response.getBody().get("shapeId"))
//                .orElseThrow(() -> new CustomException(ErrorCode.SHAPE_NOT_FOUND)));
//        Long gameResultId = gameResultRepository.save(gameResult).getId();
//
//        if (gameResultId == null) {
//            return false;
//        }
//
//        return true;
//    }

    // game_result & url join
    @Override
    public String getCaptureUrl(Long id) {
//        return gameResultRepository.findById(id).get().getCaptureUrl();
        return "";
    }

    @Override
    public void chooseMvp(Long roomId, Long votedPlayerId) {
        int update = playerRepository.updateVote(roomId, votedPlayerId);
        if (update == 0) {
            throw new CustomException(ErrorCode.VOTE_FAIL);
        }
    }

    @Override
    public List<GetTotalGameResultRes> getTotalGameResult(Long roomId) {
        List<GetTotalGameResultRes> totalGameResult = new ArrayList<>();
        Room room = roomRepository.findRoomById(roomId)
                .orElseThrow(() -> new CustomException(ErrorCode.ROOM_NOT_FOUND));

        List<GameResult> gameResult = gameResultRepository.findGameResultsByRoomId(roomId);

        if (gameResult.size() != room.getRound()) {
            throw new CustomException(ErrorCode.TOTAL_GAME_RESULT_NOT_LOAD);
        }

        for (GameResult result : gameResult) {
            totalGameResult.add(
                    GetTotalGameResultRes.builder()
                            .gameResult(result)
                            .captureUrl(captureRepository.findCaptureByRoomIdAndRound(roomId, result.getRound())
                                    .map(Capture::getCaptureUrl)
                                    .orElseThrow(() -> new CustomException(ErrorCode.TOTAL_GAME_RESULT_NOT_LOAD)))
//                            .shape(shapeRepository.findShapeById(result.getShape().getId()).orElse(null))
                            .build()
            );
        }

        if (totalGameResult.size() < room.getRound()) {
            throw new CustomException(ErrorCode.TOTAL_GAME_RESULT_NOT_LOAD);
        }
        return totalGameResult;
    }

    @Override
    public void saveCaptureUrl(Long roomId, int round, String imageUrl) {
        Capture capture = new Capture();
        capture.setRoom(roomRepository.findRoomById(roomId).orElseThrow(() -> new CustomException(ErrorCode.ROOM_NOT_FOUND)));
        capture.setRound(round);
        capture.setCaptureUrl(imageUrl);
        captureRepository.save(capture);
    }

    @Override
    public void saveShape(Shape shape) {
        shapeRepository.save(shape);
    }
}

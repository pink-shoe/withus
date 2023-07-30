package com.proj.withus.service;

import com.proj.withus.domain.Player;
import com.proj.withus.domain.Room;
import com.proj.withus.repository.PlayerRepository;
import com.proj.withus.repository.RoomRepository;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;

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
}

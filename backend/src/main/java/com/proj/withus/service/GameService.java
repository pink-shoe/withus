package com.proj.withus.service;

import com.proj.withus.domain.Player;
import com.proj.withus.domain.Room;

import java.util.List;

public interface GameService {

    public Room getRoomInfo(Long hostId);
    public List<Player> getPlayersInfo(Long roomId);
}

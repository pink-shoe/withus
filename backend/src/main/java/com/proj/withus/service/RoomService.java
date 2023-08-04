package com.proj.withus.service;

import com.proj.withus.domain.Member;
import com.proj.withus.domain.Player;
import com.proj.withus.domain.Room;
import com.proj.withus.domain.dto.CreateRoomReq;
import com.proj.withus.domain.dto.ModifyRoomReq;

import java.util.List;
import java.util.Optional;

public interface RoomService {

    public Room createRoom(CreateRoomReq createRoomReq);
    public Optional<Room> enterRoom(Long roomId, Long memberId);
    public void leaveRoom(Long roomId, Long memberId);
    public int modifyRoom(ModifyRoomReq req, Long roomId);
    public int modifyNickname(Long id, String nickname);
    public Long getHostId(Long roomId);
    public List<Player> getPlayerList(Long roomId);
    public int createCode(); // Impl에서만 따로 private으로 관리 고려해 볼 것
    public Player getPlayerInRoom(Long memberId, Long roomId);
    public int modifyReady(Long playerId, boolean readyStatus);
    public List<Long> getReadyPlayers(Long roomId);
}

package com.proj.withus.domain.dto;

import com.proj.withus.domain.Room;
import lombok.Builder;
import lombok.Data;

import java.util.List;
import java.util.Optional;

@Data
@Builder
public class GetRoomInfoRes {

	private Optional<Room> room;

	private List<PlayerInfo> playerInfos;

	private Long hostId;
}

package com.proj.withus.domain.dto;

import java.util.List;
import java.util.Optional;

import com.proj.withus.domain.Room;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class GetRoomInfoRes {

	private Optional<Room> room;

	private List<PlayerInfo> playerInfos;


}

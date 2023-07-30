package com.proj.withus.domain.dto;

import com.proj.withus.domain.Player;
import com.proj.withus.domain.Room;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.List;

@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class RoomPlayerDto {

    private Room room;
    private List<Player> players;

    @Builder.Default
    private int currentRound = 1;
}

package com.proj.withus.domain.dto;

import com.proj.withus.domain.Player;
import com.proj.withus.domain.Room;
import com.proj.withus.domain.Shape;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.List;

@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class GetGameInfoRes {

    private Room room;
    private List<Player> players;
    private List<Shape> shapes;

    @Builder.Default
    private int currentRound = 1;
}

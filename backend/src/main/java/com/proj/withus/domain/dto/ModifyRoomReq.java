package com.proj.withus.domain.dto;

import lombok.Getter;
import lombok.RequiredArgsConstructor;
import lombok.Setter;

@Getter
@Setter
@RequiredArgsConstructor
public class ModifyRoomReq {

    private final int roomType;
    private final String roomCode;
    private final String roomLink;
    private final int roomRound;
}

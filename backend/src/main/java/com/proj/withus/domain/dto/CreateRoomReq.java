package com.proj.withus.domain.dto;

import lombok.Getter;
import lombok.RequiredArgsConstructor;
import lombok.Setter;

@Getter @Setter
@RequiredArgsConstructor
public class CreateRoomReq {

    private final Long id;
    private final int roomType;
    private final int roomRound = 5; // room round 5로 고정?

}

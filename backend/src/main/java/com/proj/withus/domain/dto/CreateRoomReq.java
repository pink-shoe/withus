package com.proj.withus.domain.dto;

import io.swagger.annotations.ApiModel;
import io.swagger.annotations.ApiModelProperty;
import lombok.Getter;
import lombok.RequiredArgsConstructor;
import lombok.Setter;

@Getter @Setter
@RequiredArgsConstructor
@ApiModel(description = "방 생성 정보")
public class CreateRoomReq {

    @ApiModelProperty(value = "유저 id", required = true, example = "1")
    private final Long id; // memberId

    @ApiModelProperty(value = "방 타입(팀전, 협동전)", required = true, example = "1")
    private final int roomType;

    @ApiModelProperty(value = "게임 총 라운드", required = true, example = "5")
    private final int roomRound; // room round 5로 고정?

}

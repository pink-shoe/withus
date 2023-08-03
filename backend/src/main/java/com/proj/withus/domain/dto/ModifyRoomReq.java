package com.proj.withus.domain.dto;

import io.swagger.annotations.ApiModel;
import io.swagger.annotations.ApiModelProperty;
import lombok.Getter;
import lombok.RequiredArgsConstructor;
import lombok.Setter;

@Getter
@Setter
@RequiredArgsConstructor
@ApiModel(description = "방 옵션 수정 정보")
public class ModifyRoomReq {

    @ApiModelProperty(value = "방 타입(팀전, 협동전)", required = true, example = "coop")
    private final String roomType;

    @ApiModelProperty(value = "방 입장 코드", required = true)
    private final String roomCode;

    @ApiModelProperty(value = "방 입장 링크", required = true)
    private final String roomLink;

    @ApiModelProperty(value = "게임 총 라운드", required = true, example = "5")
    private final int roomRound;
}

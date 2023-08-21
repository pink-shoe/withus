package com.proj.withus.domain.dto;

import io.swagger.annotations.ApiModel;
import io.swagger.annotations.ApiModelProperty;
import lombok.Builder;
import lombok.Data;
import org.hibernate.annotations.ColumnDefault;


@Data
@Builder
@ApiModel(description = "방 옵션 수정 정보")
public class ModifyRoomReq {

    @ApiModelProperty(value = "방 타입(팀전, 협동전)", required = true, example = "coop")
    @ColumnDefault("none")
    private final String roomType;

    @ApiModelProperty(value = "게임 총 라운드", required = true, example = "5")
    @ColumnDefault("0")
    private final int roomRound;
}

package com.proj.withus.domain.dto;

import com.proj.withus.domain.Room;
import com.proj.withus.domain.Shape;
import io.swagger.annotations.ApiModel;
import io.swagger.annotations.ApiModelProperty;
import lombok.Builder;
import lombok.Data;

import java.util.List;

@Data
@Builder
@ApiModel(description = "방 정보, 참가자, 문제(모양), 라운드 정보가 포함된 게임 기본 정보")
public class GetGameInfoRes {

    @ApiModelProperty(value = "방 정보", required = true)
    private Room room;

    @ApiModelProperty(value = "참가자 정보", required = true)
    private List<PlayerInfo> playerInfos;

    @ApiModelProperty(value = "문제 정보", required = true)
    private List<Shape> shapes;

    @ApiModelProperty(value = "방장", required = true, example = "1")
    private Long hostId;
}

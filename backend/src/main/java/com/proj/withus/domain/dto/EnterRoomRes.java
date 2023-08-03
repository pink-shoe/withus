package com.proj.withus.domain.dto;

import com.proj.withus.domain.Member;
import com.proj.withus.domain.Player;

import io.swagger.annotations.ApiModel;
import io.swagger.annotations.ApiModelProperty;
import lombok.Getter;
import lombok.RequiredArgsConstructor;
import lombok.Setter;

import java.util.ArrayList;
import java.util.List;

@Getter @Setter
@RequiredArgsConstructor
@ApiModel(description = "방 입장 정보")
public class EnterRoomRes {

    /*
    roomId: Long
    roomtype: int
    hostId: Long
    code: String
    member: {
    memberId: Long
    nickname: String
    }[]: Object[]
     */
    @ApiModelProperty(value = "방 id", required = true, example = "1")
    private Long roomId;

    @ApiModelProperty(value = "방 타입(팀전, 협동전)", required = true, example = "coop")
    private int roomType;

    @ApiModelProperty(value = "방장 id", required = true, example = "1")
    private Long hostId;

    @ApiModelProperty(value = "방 입장 코드", required = true)
    private String code; // 일단 10진수여도 String으로 하는걸로?

    @ApiModelProperty(value = "참가자 리스트", required = true)
    private List<Player> players = new ArrayList<>();
}

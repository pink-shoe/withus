package com.proj.withus.domain.dto;

import com.fasterxml.jackson.annotation.JsonProperty;
import io.swagger.annotations.ApiModel;
import io.swagger.annotations.ApiModelProperty;
import io.swagger.v3.oas.annotations.media.Schema;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.RequiredArgsConstructor;
import lombok.Setter;

@Getter @Setter
@NoArgsConstructor
@Schema(description = "방 생성 정보")
public class CreateRoomReq {

    @JsonProperty("memberId")
    @Schema(description = "유저 id", required = true, example = "1")
    private Long id; // memberId

    @Schema(description = "방 타입(팀전, 협동전)", required = true, example = "coop")
    private String roomType;

    @Schema(description = "게임 총 라운드", required = true, example = "5")
    private int roomRound; // room round 5로 고정?

}

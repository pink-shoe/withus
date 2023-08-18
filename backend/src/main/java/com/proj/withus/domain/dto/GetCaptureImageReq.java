package com.proj.withus.domain.dto;

import io.swagger.annotations.ApiModel;
import io.swagger.annotations.ApiModelProperty;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
@ApiModel(description = "1개 라운드별 게임 결과 정보")
public class GetCaptureImageReq {

    @ApiModelProperty(value = "방 id", required = true, example = "1")
    private Long roomId;

    @ApiModelProperty(value = "캡처한 이미지", required = true, example = "test.png")
    private String captureUrl;

    @ApiModelProperty(value = "현재 라운드", required = true, example = "1")
    private int currentRound;

    @ApiModelProperty(value = "문제(모양) id", required = true, example = "1")
    private Long shapeId;
}

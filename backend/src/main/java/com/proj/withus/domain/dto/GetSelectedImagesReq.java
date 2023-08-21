package com.proj.withus.domain.dto;

import io.swagger.annotations.ApiModel;
import io.swagger.annotations.ApiModelProperty;
import lombok.Builder;
import lombok.Data;

import java.util.List;

@Data
@Builder
@ApiModel(description = "사용자가 선택한 사진 정보")
public class GetSelectedImagesReq {

    @ApiModelProperty(value = "방 정보", required = true)
    private Long roomId;

    @ApiModelProperty(value = "게임 결과 id 리스트(사진 정보 포함)", required = true)
    private List<Long> results;
}

package com.proj.withus.domain.dto;

import io.swagger.annotations.ApiModel;
import io.swagger.annotations.ApiModelProperty;
import lombok.Data;

@Data
@ApiModel(description = "mvp 투표 정보")
public class ChooseMvpPlayerReq {

	@ApiModelProperty(value = "투표 받은 플레이어 id", required = true, example = "1")
	private Long votedId;
}

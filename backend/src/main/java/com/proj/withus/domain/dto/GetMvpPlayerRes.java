package com.proj.withus.domain.dto;

import com.fasterxml.jackson.annotation.JsonProperty;
import io.swagger.annotations.ApiModel;
import io.swagger.annotations.ApiModelProperty;
import lombok.Builder;
import lombok.Data;

@Data
@Builder
@ApiModel(description = "최다 득표자 정보")
public class GetMvpPlayerRes {

	@ApiModelProperty(value = "플레이어 id", required = true)
	@JsonProperty("playerId")
	private Long id;

	private int vote;

}

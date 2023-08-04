package com.proj.withus.domain.dto;

import io.swagger.annotations.ApiModel;
import io.swagger.annotations.ApiModelProperty;
import lombok.Builder;
import lombok.Getter;
import lombok.RequiredArgsConstructor;
import lombok.Setter;

@Getter
@Setter
@RequiredArgsConstructor
@ApiModel(description = "게임 참가자 정보")
public class PlayerInfoDto {

	@ApiModelProperty(value = "참가자 id", required = true, example = "1")
	private Long memberId;

	@ApiModelProperty(value = "참가자 닉네임", required = true, example = "user")
	private String nickname;

	@ApiModelProperty(value = "참가자 준비 상태", required = true, example = "false")
	private boolean ready;
}

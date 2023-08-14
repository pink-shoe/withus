package com.proj.withus.domain.dto;

import com.proj.withus.domain.GameResult;
import com.proj.withus.domain.Shape;
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
@ApiModel(description = "총 라운드의 게임 결과")
public class GetTotalGameResultRes {

	@ApiModelProperty(value = "게임 결과(ex: 2라운드 게임 결과)", required = true)
	private GameResult gameResult;


	@ApiModelProperty(value = "캡처한 사진 url", required = true)
	private String captureUrl;

//	@ApiModelProperty(value = "문제(ex: 2라운드에 출제된 문제)", required = true)
//	private Shape shape;

}

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

	@ApiModelProperty(value = "AI가 예측한 정답 모양 정보", required = true)
	private Shape predictionShape;

	@ApiModelProperty(value = "정답 모양 사진 url", required = true)
	private String answerUrl;

}

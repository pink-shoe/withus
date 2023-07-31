package com.proj.withus.domain.dto;

import com.proj.withus.domain.GameResult;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class TotalGameResultDto {

	private GameResult gameResult;
	// shape

}

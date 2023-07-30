package com.proj.withus.domain.dto;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class GameResultDto {

    private CaptureDto captureDto;
    private String isCorrect;
    private int correctRate;
    // shape
}

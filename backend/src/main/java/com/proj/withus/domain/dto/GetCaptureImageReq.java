package com.proj.withus.domain.dto;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class GetCaptureImageReq {

    private Long roomId;
    private String captureUrl;
    private int currentRound;
    private Long shapeId;
}

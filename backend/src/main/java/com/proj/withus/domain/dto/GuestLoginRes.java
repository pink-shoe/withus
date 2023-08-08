package com.proj.withus.domain.dto;

import io.swagger.annotations.ApiModel;
import io.swagger.annotations.ApiModelProperty;
import lombok.Getter;
import lombok.RequiredArgsConstructor;
import lombok.Setter;

@Getter
@Setter
@RequiredArgsConstructor
@ApiModel(description = "게스트 로그인")
public class GuestLoginRes {

    private EnterRoomRes enterRoomRes;

    @ApiModelProperty(value = "jwt", required = true)
    private String jwtToken;
}

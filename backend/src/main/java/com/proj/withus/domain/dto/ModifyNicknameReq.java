package com.proj.withus.domain.dto;

import lombok.Getter;
import lombok.RequiredArgsConstructor;
import lombok.Setter;

@Getter @Setter
@RequiredArgsConstructor
public class ModifyNicknameReq {

    private final String nickname;
}

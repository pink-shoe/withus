package com.proj.withus.exception;

import lombok.AllArgsConstructor;
import lombok.Getter;
import org.springframework.http.HttpStatus;

@Getter
@AllArgsConstructor
public enum ErrorCode {
    IS_NOT_AUTHORIZED(HttpStatus.UNAUTHORIZED, "인증되지 않은 회원입니다.");

    private final HttpStatus status;
    private final String message;
}

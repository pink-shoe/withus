package com.proj.withus.exception;

import lombok.AllArgsConstructor;
import lombok.Getter;
import org.springframework.http.HttpStatus;

@Getter
@AllArgsConstructor
public enum ErrorCode {
    IS_NOT_AUTHORIZED(HttpStatus.UNAUTHORIZED, "인증되지 않은 회원입니다."),

    // member 관련 (social, guest 포함)
    MEMBER_NOT_FOUND(HttpStatus.NOT_FOUND, "존재하지 않는 회원입니다."),
    DUPLICATE_MEMBER(HttpStatus.BAD_REQUEST, "이미 존재하는 회원입니다."),

    // album 관련
    ALBUM_NOT_FOUND(HttpStatus.NOT_FOUND, "앨범이 존재하지 않습니다."),

    ;





    private final HttpStatus status;
    private final String message;
}

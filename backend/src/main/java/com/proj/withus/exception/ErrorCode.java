package com.proj.withus.exception;

import lombok.AllArgsConstructor;
import lombok.Getter;
import org.springframework.http.HttpStatus;

@Getter
@AllArgsConstructor
public enum ErrorCode {
    IS_NOT_AUTHORIZED(HttpStatus.UNAUTHORIZED, "인증되지 않은 회원입니다."),

    // Album
    ALBUM_IS_NOT_EXIST(HttpStatus.BAD_REQUEST, "앨범 정보가 존재하지 않습니다."),
    IMAGE_NOT_DELETED(HttpStatus.NO_CONTENT, "이미지가 삭제되지 않았습니다."),
    IMAGE_NOT_SAVED(HttpStatus.BAD_REQUEST, "이미지가 저장되지 않았습니다.");

    private final HttpStatus status;
    private final String message;
}

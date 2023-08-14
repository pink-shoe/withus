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
    DUPLICATE_MEMBER(HttpStatus.BAD_REQUEST, "이미 존재하는 회원입니다."), // guest, social 통합

    // room 관련
    ROOM_NOT_FOUND(HttpStatus.NOT_FOUND, "존재하지 않는 방입니다."),
    ROOM_DISABLE_ROUND(HttpStatus.BAD_REQUEST, "해당 판 수로는 설정이 불가능합니다."),
    ROOM_DISABLE_TYPE(HttpStatus.BAD_REQUEST, "해당 게임 타입으로는 설정이 불가능합니다."),
    DUPLICATE_MEMBER_IN_ROOM(HttpStatus.FORBIDDEN, "여러 방에 들어갈 수 없습니다."),
    ROOM_FULL(HttpStatus.FORBIDDEN, "방의 정원이 찼습니다."),
    HOST_LEAVE(HttpStatus.NO_CONTENT, "방장이 떠나, 해당 방은 종료됩니다."),


    // album 관련
    ALBUM_NOT_FOUND(HttpStatus.NOT_FOUND, "앨범이 존재하지 않습니다."),
    DUPLICATE_ALBUM(HttpStatus.BAD_REQUEST, "이미 존재하는 앨범입니다."),

    // player 관련
    PLAYER_NOT_FOUND(HttpStatus.NOT_FOUND, "존재하지 않는 플레이어입니다."),

    ;
    private final HttpStatus status;
    private final String message;
}

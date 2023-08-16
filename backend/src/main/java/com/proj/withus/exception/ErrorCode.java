package com.proj.withus.exception;

import lombok.AllArgsConstructor;
import lombok.Getter;
import org.springframework.http.HttpStatus;

@Getter
@AllArgsConstructor
public enum ErrorCode {
    /*
    지은
     */
    IS_NOT_AUTHORIZED(HttpStatus.UNAUTHORIZED, "인증되지 않은 회원입니다."),
    MEMBER_NO_PERMISSION(HttpStatus.FORBIDDEN, "권한이 없는 유저입니다."),

    // Album
    ALBUM_IS_NOT_EXIST(HttpStatus.BAD_REQUEST, "앨범 정보가 존재하지 않습니다."),
    ALBUM_NOT_DELETED(HttpStatus.NO_CONTENT, "앨범이 삭제되지 않았습니다."),
    IMAGE_NOT_DELETED(HttpStatus.NO_CONTENT, "이미지가 삭제되지 않았습니다."),
    IMAGE_NOT_SAVED(HttpStatus.BAD_REQUEST, "이미지가 저장되지 않았습니다."),

    // Game
    PLAYERS_ROOM_IS_NOT_EXIST(HttpStatus.BAD_REQUEST, "플레이어가 참여한 방이 없습니다."),
    PLAYER_NOT_FOUND(HttpStatus.BAD_REQUEST, "플레이어 정보를 찾을 수 없습니다."),
    SHAPE_NOT_LOAD(HttpStatus.BAD_REQUEST, "문제 정보가 부족합니다."),
    SHAPE_NOT_FOUND(HttpStatus.BAD_REQUEST, "문제 정보를 찾을 수 없습니다."),
    FLASK_SEND_FAIL(HttpStatus.BAD_REQUEST, "Flask 서버에 전달 실패했습니다."),
    FLASK_RECEIVE_FAIL(HttpStatus.BAD_GATEWAY, "Flask 서버로부터 정보 받기 실패했습니다."),

    TOTAL_GAME_RESULT_NOT_LOAD(HttpStatus.BAD_REQUEST, "전체 게임 정보를 불러오지 못했습니다."),

    LOCAL_IMAGE_NOT_DELETED(HttpStatus.NO_CONTENT, "로컬 이미지가 삭제되지 않았습니다."),
    S3_IMAGE_LOAD_FAIl(HttpStatus.INTERNAL_SERVER_ERROR, "S3서버 이미지 업로드에 실패했습니다."),

    VOTE_FAIL(HttpStatus.BAD_REQUEST, "투표가 반영되지 않았습니다."),

    LAST_ROUND(HttpStatus.BAD_REQUEST, "마지막 라운드 입니다."),

    /*
    찬희
     */
    // member 관련 (social, guest 포함)
    MEMBER_NOT_FOUND(HttpStatus.NOT_FOUND, "존재하지 않는 회원입니다."),
    DUPLICATE_MEMBER(HttpStatus.BAD_REQUEST, "이미 존재하는 회원입니다."), // guest, social 통합

    // room 관련
    ROOM_NOT_FOUND(HttpStatus.NOT_FOUND, "존재하지 않는 방입니다."),
    ROOM_DISABLE_ROUND(HttpStatus.BAD_REQUEST, "해당 판 수로는 설정이 불가능합니다."),
    ROOM_DISABLE_TYPE(HttpStatus.BAD_REQUEST, "해당 게임 타입으로는 설정이 불가능합니다."),
    DUPLICATE_MEMBER_IN_ROOM(HttpStatus.FORBIDDEN, "여러 방에 들어갈 수 없습니다."),
    ROOM_FULL(HttpStatus.FORBIDDEN, "방의 정원이 찼습니다."),
    DUPLICATE_HOST(HttpStatus.FORBIDDEN, "두 개의 방을 만들 수 없습니다."),
    HOST_LEAVE(HttpStatus.NO_CONTENT, "방장이 떠나, 해당 방은 종료됩니다."), // error 아님:: 추후에 분리 필요
    ROOM_NOT_ROUND(HttpStatus.BAD_REQUEST, "판 수를 선택해야 합니다."),
    ROOM_NOT_TYPE(HttpStatus.BAD_REQUEST, "게임 타입을 선택해야 합니다."),

    // album 관련
    ALBUM_NOT_FOUND(HttpStatus.NOT_FOUND, "앨범이 존재하지 않습니다."),
    DUPLICATE_ALBUM(HttpStatus.BAD_REQUEST, "이미 존재하는 앨범입니다."),

    // player 관련
//    PLAYER_NOT_FOUND(HttpStatus.NOT_FOUND, "존재하지 않는 플레이어입니다."),

    // capture 관련
    CAPTURE_IMAGE_NOT_FOUND(HttpStatus.BAD_REQUEST, "캡처한 이미지가 존재하지 않습니다.")
    ;
    private final HttpStatus status;
    private final String message;
}

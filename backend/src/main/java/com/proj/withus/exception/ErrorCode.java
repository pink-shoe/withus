package com.proj.withus.exception;

import lombok.AllArgsConstructor;
import lombok.Getter;
import org.springframework.http.HttpStatus;

@Getter
@AllArgsConstructor
public enum ErrorCode {
    IS_NOT_AUTHORIZED(HttpStatus.UNAUTHORIZED, "인증되지 않은 회원입니다."),
    MEMBER_NO_PERMISSION(HttpStatus.FORBIDDEN, "권한이 없는 유저입니다."),

    // Album
    ALBUM_IS_NOT_EXIST(HttpStatus.BAD_REQUEST, "앨범 정보가 존재하지 않습니다."),
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


    // Room
    ROOM_NOT_FOUND(HttpStatus.BAD_REQUEST, "방 정보가 존재하지 않습니다."),
    ;

    private final HttpStatus status;
    private final String message;
}

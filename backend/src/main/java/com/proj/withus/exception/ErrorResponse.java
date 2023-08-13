package com.proj.withus.exception;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.Setter;
import org.springframework.http.HttpStatus;

@Getter @Setter
@AllArgsConstructor
public class ErrorResponse {

    private HttpStatus code;
    private String message;

    public ErrorResponse(ErrorCode errorCode) {
        this.code = errorCode.getStatus();
        this.message = errorCode.getMessage();
    }
}

package com.proj.withus.exception;

import lombok.extern.slf4j.Slf4j;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.bind.annotation.RestControllerAdvice;

@Slf4j
@RestControllerAdvice
public class GlobalExceptionHandler {

    @ExceptionHandler(CustomException.class)
    public ResponseEntity<ErrorResponse> handleCustomException(CustomException exception) {
        log.error("handle user not found exception", exception);
        ErrorResponse response = new ErrorResponse(exception.getErrorCode());
        return new ResponseEntity<>(response,
                exception.getErrorCode().getStatus());
    }
}

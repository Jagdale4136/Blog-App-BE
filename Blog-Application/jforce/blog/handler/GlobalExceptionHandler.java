package com.jforce.blog.handler;

import com.jforce.blog.constants.Status;
import com.jforce.blog.dto.AppResponse;
import com.jforce.blog.exceptions.BadRequestException;
import com.jforce.blog.exceptions.ResourceNotFoundException;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.bind.annotation.RestControllerAdvice;

@RestControllerAdvice
@Slf4j
public class GlobalExceptionHandler {
    @ExceptionHandler(BadRequestException.class)
    public ResponseEntity<AppResponse<Void>> handleBadRequest(BadRequestException ex) {
        return buildErrorResponse(HttpStatus.BAD_REQUEST,Status.FAILED.name(), ex.getMessage());
    }

    @ExceptionHandler(ResourceNotFoundException.class)
    public ResponseEntity<AppResponse<Void>> handleResourceNotFound(ResourceNotFoundException ex) {
        return buildErrorResponse(HttpStatus.NOT_FOUND,Status.FAILED.name(), ex.getMessage());
    }

    @ExceptionHandler(RuntimeException.class)
    public ResponseEntity<AppResponse<Void>> handleBadRequest(RuntimeException ex) {
        return buildErrorResponse(HttpStatus.INTERNAL_SERVER_ERROR, Status.FAILED.name(),ex.getMessage());
    }

    private ResponseEntity<AppResponse<Void>> buildErrorResponse(HttpStatus httpStatus, String status, String message) {
        AppResponse errorResponse = AppResponse.error(httpStatus.value(), status, message);
        return new ResponseEntity<>(errorResponse, httpStatus);
    }



}

package com.jforce.blog.dto;

import com.jforce.blog.constants.Status;
import lombok.Getter;

@Getter
public class AppResponse<T> {

    private final int statusCode;
    private final String status;
    private final String message;
    private final T data;

    private AppResponse(int statusCode, String status, String message, T data) {
        this.statusCode = statusCode;
        this.status = status;
        this.message = message;
        this.data = data;
    }

    // ── Constants (kept for backward compatibility) ─────────────────────

    public static final AppResponse<?> SUCCESS =
            new AppResponse<>(200, Status.SUCCESS.name(), "Request Processed Successfully.", null);

    public static final AppResponse<?> FAILED =
            new AppResponse<>(500, Status.FAILED.name(), "Error Occurred while processing request.", null);

    // ── Static factory methods ──────────────────────────────────────────

    public static <T> AppResponse<T> success(String message, T data) {
        return new AppResponse<>(200, Status.SUCCESS.name(), message, data);
    }

    public static <T> AppResponse<T> success(T data) {
        return new AppResponse<>(200, Status.SUCCESS.name(), "Request Processed Successfully.", data);
    }

    public static <T> AppResponse<T> success() {
        return new AppResponse<>(200, Status.SUCCESS.name(), "Request Processed Successfully.", null);
    }

    public static <T> AppResponse<T> withData(AppResponse<?> response, T data) {
        return new AppResponse<>(response.statusCode, response.status, response.message, data);
    }

    public static <T> AppResponse<T> error(int statusCode, String message) {
        return new AppResponse<>(statusCode, Status.FAILED.name(), message, null);
    }

    public static <T> AppResponse<T> error(String message) {
        return new AppResponse<>(500, Status.FAILED.name(), message, null);
    }

    public static <T> AppResponse<T> of(int statusCode, String status, String message, T data) {
        return new AppResponse<>(statusCode, status, message, data);
    }

    public static AppResponse error(int value, String status, String message) {
        return new AppResponse(value,status,message,null);
    }
}
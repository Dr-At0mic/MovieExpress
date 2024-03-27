package com.movieexpress.backend.customexception;

import lombok.Data;

import java.time.LocalDateTime;

@Data
public class ApiErrorResponse {
    private final String guild;
    private final int errorCode;
    private final String message;
    private final Integer statusCode;
    private final String statusName;
    private final String path;
    private final String method;
    private final LocalDateTime timeStamp;
}

package com.movieexpress.backend.models;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.springframework.http.HttpStatus;

@Data
@Builder
@AllArgsConstructor
@NoArgsConstructor
public class Response {
    private Object data;
    private boolean status;
    private String message;
    private int statusCode;
    private HttpStatus httpStatus;

}

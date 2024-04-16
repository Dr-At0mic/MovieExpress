package com.movieexpress.backend.models;

import lombok.Data;

@Data
public class SignupRequest {
    private String emailId;
    private String password;
    private String ipAddress;
    private String accessToken;
}

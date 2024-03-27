package com.movieexpress.backend.models;

import lombok.Builder;
import lombok.Data;

@Data
@Builder
public class EmailVerificationResponse {
    private String accessToken;
    private String refreshToken;
}

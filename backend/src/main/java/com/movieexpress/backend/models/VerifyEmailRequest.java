package com.movieexpress.backend.models;

import lombok.Builder;
import lombok.Data;

@Data
@Builder
public class VerifyEmailRequest {
    private String sessionAccessToken;
}

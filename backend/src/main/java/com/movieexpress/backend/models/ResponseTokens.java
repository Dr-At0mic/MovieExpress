package com.movieexpress.backend.models;

import lombok.Builder;
import lombok.Data;

@Data
@Builder
public class ResponseTokens {
    private String accessToken;
    private String refreshToken;
}

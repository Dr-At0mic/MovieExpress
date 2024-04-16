package com.movieexpress.backend.models;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@Builder
@AllArgsConstructor
@NoArgsConstructor
public class CaptchaValidationRequest {
    private String captchaId;
    private String captchaText;
    private String accessToken;

}

package com.movieexpress.backend.controller;

import com.movieexpress.backend.component.IdentityVerificationComponent;
import com.movieexpress.backend.component.RequestLog;
import com.movieexpress.backend.component.SigninComponent;
import com.movieexpress.backend.component.SignupComponent;
import com.movieexpress.backend.customexception.ErrorCodes;
import com.movieexpress.backend.models.*;
import com.movieexpress.backend.systemutils.SystemConstants;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import org.bson.types.ObjectId;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseCookie;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.io.IOException;
import java.time.Duration;

@RestController
@RequestMapping("/auth")
@CrossOrigin()
public class AuthenticationController {
    @Autowired
    private SignupComponent signupComponent;
    @Autowired
    private SigninComponent signinComponent;
    @Autowired
    private RequestLog requestLog;
    @Autowired
    private IdentityVerificationComponent identityVerificationComponent;

    //not completed
    @GetMapping("/tempUser")
    public ResponseEntity<Response> allocatingTempUser(HttpServletRequest httpServletRequest) {
        System.out.println(httpServletRequest.getLocalName());
        ResponseTokens tempUserResponse = signupComponent.createNewTempUser(httpServletRequest.getLocalAddr());
        requestLog.registerRequest(httpServletRequest.getLocalAddr(), "", tempUserResponse.getAccessToken());
        return new ResponseEntity<>(Response.builder().data(tempUserResponse).build(), HttpStatus.OK);
    }

    @PostMapping("/captcha")
    public void generateCaptcha(HttpServletResponse httpServletResponse,@RequestBody CaptchaRequest captchaRequest) throws IOException {
        identityVerificationComponent.captchaGenerate(httpServletResponse, captchaRequest.getAccessToken());
    }

    @PostMapping("/Validate-captcha")
    public ResponseEntity<Response> validateCaptcha(@RequestBody CaptchaValidationRequest captchaValidationRequest) {
        Response response = identityVerificationComponent.ValidateCaptcha(captchaValidationRequest.getCaptchaId(), captchaValidationRequest.getCaptchaText(), captchaValidationRequest.getAccessToken());
        return new ResponseEntity<Response>(Response
                .builder()
                .status(response.isStatus())
                .message(response.getMessage())
                .statusCode(ErrorCodes.SUCCESS)
                .httpStatus(HttpStatus.OK)
                .build(),
                HttpStatus.OK
        );
    }

    @PostMapping("/signUp")
    public ResponseEntity<Response> singUp(@RequestBody SignupRequest signUpRequest) {
        SendEmailResponse sendEmailResponse = signupComponent.verifyEmail(signUpRequest);
        return new ResponseEntity<Response>(Response
                .builder()
                .status(true)
                .data(sendEmailResponse.getSessionId().toHexString())
                .message(sendEmailResponse.getMessage())
                .statusCode(ErrorCodes.SUCCESS)
                .httpStatus(HttpStatus.OK)
                .build()
                , HttpStatus.OK
        );
    }

    @PostMapping("/activateAccount")
    public ResponseEntity<Response> verifyAccount(@RequestBody VerifyEmailRequest verifyEmailRequest) {
        ResponseTokens emailVerificationResponse = signupComponent.authenticateVerificationToken(verifyEmailRequest);
        ResponseCookie accessTokenCookie = ResponseCookie.from("accessToken", emailVerificationResponse.getAccessToken())
                .maxAge(Duration.ofDays(SystemConstants.ACCESS_TOKEN_VALIDATION_TIME))
                .path("/")
                .httpOnly(false)
                .secure(false)
                .sameSite("None")
                .build();

        ResponseCookie refreshTokenCookie = ResponseCookie.from("refreshToken", emailVerificationResponse.getRefreshToken())
                .maxAge(Duration.ofDays(SystemConstants.REFRESH_TOKEN_VALIDATION_TIME))
                .path("/")
                .httpOnly(false)
                .secure(false)
                .sameSite("None")
                .build();
        return ResponseEntity.ok()
                .header(HttpHeaders.SET_COOKIE, accessTokenCookie.toString())
                .header(HttpHeaders.SET_COOKIE, refreshTokenCookie.toString())
                .body(Response.builder()
                        .status(true)
                        .message("Account Activated.")
                        .statusCode(ErrorCodes.SUCCESS)
                        .httpStatus(HttpStatus.OK)
                        .build());
    }
    //not completed
    @GetMapping("/resendemail")
    public ResponseEntity<Response> resendEmail(@RequestParam String objectId, HttpServletRequest httpServletRequest) {
        requestLog.registerRequest(httpServletRequest.getHeader("ipAddress"), null, objectId);
        ObjectId sessionId = new ObjectId(objectId);
        signupComponent.resendEmail(ResendEmailRequest.builder().sessionId(sessionId).build());
        return new ResponseEntity<Response>(Response
                .builder()
                .status(true)
                .message("Email-Send")
                .statusCode(ErrorCodes.SUCCESS)
                .httpStatus(HttpStatus.OK)
                .build(),
                HttpStatus.OK
        );
    }
    //not completed
    @GetMapping("/notme")
    public ResponseEntity<Response> unAuthorizedLogin(@RequestParam String verificationToken, HttpServletRequest httpServletRequest) {
        requestLog.registerRequest(httpServletRequest.getHeader("ipAddress"), null, verificationToken);
        return null;
    }

    @PostMapping("/login")
    public ResponseEntity<Response> signIn(@RequestBody SigninRequest sinSigninRequest, HttpServletResponse httpServletResponse) {
        SigninResponse signinResponse = signinComponent.verifyUser(sinSigninRequest);
        ResponseCookie accessTokenCookie = ResponseCookie.from("accessToken", signinResponse.getAccessToken())
                .maxAge(Duration.ofDays(SystemConstants.ACCESS_TOKEN_VALIDATION_TIME))
                .path("/")
                .httpOnly(false)
                .secure(false)
                .sameSite("None")
                .build();

        ResponseCookie refreshTokenCookie = ResponseCookie.from("refreshToken", signinResponse.getRefreshToken())
                .maxAge(Duration.ofDays(SystemConstants.REFRESH_TOKEN_VALIDATION_TIME))
                .path("/")
                .httpOnly(false)
                .secure(false)
                .sameSite("None")
                .build();

        httpServletResponse.addHeader(HttpHeaders.SET_COOKIE, accessTokenCookie.toString());
        httpServletResponse.addHeader(HttpHeaders.SET_COOKIE, refreshTokenCookie.toString());

        return ResponseEntity.ok()
                .header(HttpHeaders.SET_COOKIE, accessTokenCookie.toString())
                .header(HttpHeaders.SET_COOKIE, refreshTokenCookie.toString())
                .body(Response.builder()
                        .status(true)
                        .message("Login-Success-full")
                        .statusCode(ErrorCodes.SUCCESS)
                        .httpStatus(HttpStatus.OK)
                        .build());
    }


}
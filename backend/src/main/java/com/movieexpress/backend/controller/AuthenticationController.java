package com.movieexpress.backend.controller;

import com.movieexpress.backend.component.RequestLog;
import com.movieexpress.backend.component.SigninComponent;
import com.movieexpress.backend.component.SignupComponent;
import com.movieexpress.backend.customexception.ErrorCodes;
import com.movieexpress.backend.models.*;
import jakarta.servlet.http.Cookie;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import org.bson.types.ObjectId;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseCookie;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.time.Duration;

@RestController
@RequestMapping("api/auth")
@CrossOrigin()
public class AuthenticationController {
    @Autowired
    private SignupComponent signupComponent;
    @Autowired
    private SigninComponent signinComponent;
    @Autowired
    private RequestLog requestLog;
    @PostMapping("/signUp")
    public ResponseEntity<Response> singUp(@RequestBody SignupRequest signUpRequest) {
        requestLog.registerRequest(signUpRequest.getIpAddress(),signUpRequest.getEmailId(),null);
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

    @GetMapping("/verifyaccount")
    //change the @RequestParam to @RequestHeader
    public ResponseEntity<Response> verifyAccount(@RequestParam String token, HttpServletRequest httpServletRequest){
        requestLog.registerRequest(httpServletRequest.getHeader("ipAddress"),null,token);
        // change request param to request body later
        EmailVerificationResponse emailVerificationResponse = signupComponent.authenticateVerificationToken(VerifyEmailRequest.builder().sessionAccessToken(token).build());
        return new ResponseEntity<Response>(Response
                .builder()
                .data(emailVerificationResponse)
                .status(true)
                .message("Account-Activated")
                .statusCode(ErrorCodes.SUCCESS)
                .httpStatus(HttpStatus.OK)
                .build(),
                HttpStatus.OK
        );
    }
    @GetMapping("/resendemail")
    public ResponseEntity<Response> resendEmail(@RequestParam String objectId, HttpServletRequest httpServletRequest){
        requestLog.registerRequest(httpServletRequest.getHeader("ipAddress"),null,objectId);
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
    @GetMapping("/notme")
    public ResponseEntity<Response> unAuthorizedLogin(@RequestParam String verificationToken, HttpServletRequest httpServletRequest){
        requestLog.registerRequest(httpServletRequest.getHeader("ipAddress"),null,verificationToken);
        return null;
    }
    @PostMapping("/login")
    public ResponseEntity<Response> signIn(@RequestBody SigninRequest sinSigninRequest, HttpServletResponse httpServletResponse, HttpServletRequest httpServletRequest){
        requestLog.registerRequest(httpServletRequest.getRequestId()+" "+httpServletRequest.getLocalAddr()+ " "+httpServletRequest.getRemoteAddr(), sinSigninRequest.getEmailId(), null);
        SigninResponse signinResponse = signinComponent.verifyUser(sinSigninRequest);
        ResponseCookie accessTokenCookie = ResponseCookie.from("accessToken", signinResponse.getAccessToken())
                .maxAge(Duration.ofDays(1)) // Max-Age set to 1 day
                .path("/")
                .httpOnly(false)
                .secure(false)
                .sameSite("None")
                .build();

        ResponseCookie refreshTokenCookie = ResponseCookie.from("refreshToken", signinResponse.getRefreshToken())
                .maxAge(Duration.ofDays(10)) // Max-Age set to 10 days
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

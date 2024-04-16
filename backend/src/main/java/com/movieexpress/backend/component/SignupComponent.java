package com.movieexpress.backend.component;

import com.movieexpress.backend.customexception.ApplicationException;
import com.movieexpress.backend.customexception.ErrorCodes;
import com.movieexpress.backend.models.*;
import com.movieexpress.backend.service.CrossCheck;
import com.movieexpress.backend.service.SessionHandler;
import com.movieexpress.backend.service.SignUpService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Component;
import org.springframework.web.bind.annotation.CrossOrigin;

import java.util.Map;
import java.util.UUID;

@Component
@CrossOrigin
public class SignupComponent {

    @Autowired
    private CrossCheck crossCheck;
    @Autowired
    private SessionHandler sessionHandler;
    @Autowired
    private SignUpService signUpService;
    @Autowired
    private IdentityVerificationComponent identityVerificationComponent;

    public SendEmailResponse verifyEmail(SignupRequest signUpRequest) {
        if (null == signUpRequest.getEmailId() || null == signUpRequest.getPassword() || signUpRequest.getEmailId().isEmpty() || signUpRequest.getPassword().isEmpty())
            throw new ApplicationException(
                    ErrorCodes.INVALID_INPUT,
                    "Input-Fields-Are-Empty",
                    HttpStatus.BAD_REQUEST
            );
        if (signUpRequest.getPassword().length() <= 8)
            throw new ApplicationException(
                    ErrorCodes.PASSWORD_TOO_SHORT,
                    "Password-Must-Have-At-lest-8-Characters",
                    HttpStatus.BAD_REQUEST
            );
        if (!crossCheck.emailValidation(signUpRequest.getEmailId()))
            throw new ApplicationException(
                    ErrorCodes.INVALID_EMAIL_FORMAT,
                    "Email-Address-Not-Valid",
                    HttpStatus.FORBIDDEN
            );
        if (crossCheck.userExist(signUpRequest.getEmailId()))
            throw new ApplicationException(
                    ErrorCodes.USER_ALREADY_EXISTS,
                    "Another-User-Exist-With-This-Email-Address",
                    HttpStatus.FORBIDDEN
            );
        String authenticationToken = UUID.randomUUID().toString();
        identityVerificationComponent.sendVerificationEmail(signUpRequest.getEmailId(), authenticationToken);
        return signUpService.createNewUser(authenticationToken, signUpRequest);

    }

    public ResponseTokens authenticateVerificationToken(VerifyEmailRequest verifyEmailRequest) {
        if (verifyEmailRequest.getSessionAccessToken().isEmpty() || verifyEmailRequest.getSessionAccessToken().isBlank())
            throw new ApplicationException(
                    ErrorCodes.INVALID_TOKEN,
                    "Token-Cannot-Be-Empty || Blank",
                    HttpStatus.BAD_REQUEST
            );
        return signUpService.activateUser(verifyEmailRequest.getSessionAccessToken());
    }


    public void resendEmail(ResendEmailRequest resendEmailRequest) {
        if (null == resendEmailRequest.getSessionId() || resendEmailRequest.getSessionId().equals(" "))
            throw new ApplicationException(
                    ErrorCodes.INVALID_ID,
                    "Id-Cannot-Be-Empty || Blank",
                    HttpStatus.BAD_REQUEST
            );
        Map<String, String> userData = signUpService.resendEmail(resendEmailRequest.getSessionId());
        identityVerificationComponent.sendVerificationEmail(userData.get("EmailId"),userData.get("ValidationToken"));
    }

    public ResponseTokens createNewTempUser(String ipAddress) {
        if(!crossCheck.ipValidatr((ipAddress)))
            throw new ApplicationException(
                ErrorCodes.INVALID_IP_ADDRESS,
                "cannot establish a connection with server",
                HttpStatus.FORBIDDEN
            );
        return signUpService.generateTokens(ipAddress);
    }
}

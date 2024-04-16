package com.movieexpress.backend.component;

import com.movieexpress.backend.customexception.ApplicationException;
import com.movieexpress.backend.customexception.ErrorCodes;
import com.movieexpress.backend.models.SigninRequest;
import com.movieexpress.backend.models.SigninResponse;
import com.movieexpress.backend.service.CrossCheck;
import com.movieexpress.backend.service.SignInService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Component;

@Component
public class SigninComponent {

    @Autowired
    private CrossCheck crossCheck;
    @Autowired
    private SignInService signinService;

    public SigninResponse verifyUser(SigninRequest signinRequest) {
        if (signinRequest.getEmailId().isEmpty() || signinRequest.getPassword().isEmpty())
            throw new ApplicationException(
                    ErrorCodes.INVALID_INPUT,
                    "Input Fields Are Empty",
                    HttpStatus.BAD_REQUEST
            );
        if (signinRequest.getPassword().length() <= 8)
            throw new ApplicationException(
                    ErrorCodes.PASSWORD_TOO_SHORT,
                    "Password Must Have At lest 8 Characters",
                    HttpStatus.BAD_REQUEST
            );
        if (!crossCheck.emailValidation(signinRequest.getEmailId()))
            throw new ApplicationException(
                    ErrorCodes.INVALID_EMAIL_FORMAT,
                    "Email Address Not Valid",
                    HttpStatus.NOT_ACCEPTABLE
            );
        if (!crossCheck.userExist(signinRequest.getEmailId()))
            throw new ApplicationException(
                    ErrorCodes.USER_ALREADY_EXISTS,
                    "No User Found",
                    HttpStatus.FORBIDDEN
            );
        return signinService.verifyUser(signinRequest);
    }
}

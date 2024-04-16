package com.movieexpress.backend.service;

import com.movieexpress.backend.customexception.ApplicationException;
import com.movieexpress.backend.customexception.ErrorCodes;
import com.movieexpress.backend.entity.User;
import com.movieexpress.backend.entity.UserAuthentication;
import com.movieexpress.backend.models.SigninRequest;
import com.movieexpress.backend.models.SigninResponse;
import com.movieexpress.backend.repository.UserAuthenticationRepository;
import com.movieexpress.backend.repository.UserRepository;
import com.movieexpress.backend.systemutils.EncrptDecrypt;
import com.movieexpress.backend.systemutils.JwtUtils;
import com.movieexpress.backend.systemutils.SystemConstants;
import jakarta.transaction.Transactional;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Service;

@Service
@Transactional
public class SigninService {

    @Autowired
    private UserRepository userRepository;
    @Autowired
    private UserAuthenticationRepository userAuthenticationRepository;
    @Autowired
    private JwtUtils jwtUtils;

    public SigninResponse verifyUser(SigninRequest signinRequest) {
        EncrptDecrypt encrptDecrypt = new EncrptDecrypt();
        User user = userRepository.findByEmailId(signinRequest.getEmailId());
        UserAuthentication userAuthentication = userAuthenticationRepository.findByUser(user);
        if(!userAuthentication.getPassword().equals(encrptDecrypt.encryption(signinRequest.getPassword())))
            throw new ApplicationException(
                    ErrorCodes.INVALID_PASSWORD,
                    "Invalid-Password",
                    HttpStatus.FORBIDDEN
            );
        if(user.getAccountStatus()<1)
            throw new ApplicationException(
                ErrorCodes.ACCOUNT_DISABLED,
                "Account not activated",
                HttpStatus.FORBIDDEN
            );
        String refreshToken = jwtUtils.tokenGenerator(user, SystemConstants.ACCESS_TOKEN_VALIDATION_TIME);
        userAuthentication.setRefreshToken(refreshToken);
        userAuthenticationRepository.save(userAuthentication);
        return SigninResponse.builder()
                .accessToken(jwtUtils.tokenGenerator(user,SystemConstants.REFRESH_TOKEN_VALIDATION_TIME))
                .refreshToken(refreshToken)
                .build();
    }
}

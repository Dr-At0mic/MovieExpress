package com.movieexpress.backend.service;

import com.movieexpress.backend.customexception.ApplicationException;
import com.movieexpress.backend.customexception.ErrorCodes;
import com.movieexpress.backend.entity.User;
import com.movieexpress.backend.entity.UserAuthentication;
import com.movieexpress.backend.models.EmailVerificationResponse;
import com.movieexpress.backend.models.SignupRequest;
import com.movieexpress.backend.models.SendEmailResponse;
import com.movieexpress.backend.repository.UserAuthenticationRepository;
import com.movieexpress.backend.repository.UserRepository;
import com.movieexpress.backend.systemutils.EncrptDecrypt;
import com.movieexpress.backend.systemutils.JwtUtils;
import jakarta.transaction.Transactional;
import org.bson.types.ObjectId;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Service;

import java.util.HashMap;
import java.util.Map;

@Service
@Transactional
public class SignUpService {
    @Autowired
    private UserRepository userRepository;
    @Autowired
    private UserAuthenticationRepository userAuthenticationRepository;
    @Autowired
    private SessionHandler sessionHandler;
    @Autowired
    private JwtUtils jwtUtils;


    public SendEmailResponse createNewUser(String authenticationToken, SignupRequest sendEmailRequest) {
        try {
            User user = userRepository.save(User
                    .builder()
                    .emailId(sendEmailRequest.getEmailId())
                    .build()
            );
            userAuthenticationRepository.save(UserAuthentication
                    .builder()
                    .user(user)
                    .password(new EncrptDecrypt().encryption(sendEmailRequest.getPassword()))
                    .build()
            );
            ObjectId objectId = sessionHandler.setDataInSession(authenticationToken, user);
            sessionHandler.validateSessionAccessToken(objectId);
            return SendEmailResponse.builder().message("Verification-Mail-Send").sessionId(objectId).build();
        } catch (Exception e) {
            throw new ApplicationException(
                    ErrorCodes.DATABASE_ERROR,
                    "Unknown-Error-Occurred-something",
                    HttpStatus.INTERNAL_SERVER_ERROR
            );
        }
    }

    public EmailVerificationResponse authenticateVerificationToken(String sessionAccessToken) {
            User user = (User) sessionHandler.getDataFromSession(sessionAccessToken);
            user.setAccountStatus(1);
            UserAuthentication userAuthentication = userAuthenticationRepository.findByUser(user);
            user = userRepository.save(user);
            String refreshToken = jwtUtils.tokenGenerator(user, 7);
            userAuthentication.setRefreshToken(refreshToken);
            userAuthenticationRepository.save(userAuthentication);
            return EmailVerificationResponse.builder().accessToken(jwtUtils.tokenGenerator(user, 1)).refreshToken(refreshToken).build();

    }

    public Map<String, String> resendEmail(ObjectId sessionId) {
        Map<String, String> userData = new HashMap<>();
        String verificationToken = sessionHandler.getDataFromSessionUsingObjectId(sessionId);
        User user = (User)sessionHandler.getDataFromSession(verificationToken);
        userData.put("EmailId",user.getEmailId());
        userData.put("ValidationToken",verificationToken);
        sessionHandler.setDataInSession(verificationToken, user);
        return userData;

    }
}

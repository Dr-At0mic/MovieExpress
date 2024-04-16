package com.movieexpress.backend.service;

import com.movieexpress.backend.customexception.ApplicationException;
import com.movieexpress.backend.customexception.ErrorCodes;
import com.movieexpress.backend.entity.Roles;
import com.movieexpress.backend.entity.User;
import com.movieexpress.backend.entity.UserAuthentication;
import com.movieexpress.backend.models.ResponseTokens;
import com.movieexpress.backend.models.SignupRequest;
import com.movieexpress.backend.models.SendEmailResponse;
import com.movieexpress.backend.repository.RolesRepository;
import com.movieexpress.backend.repository.UserAuthenticationRepository;
import com.movieexpress.backend.repository.UserRepository;
import com.movieexpress.backend.systemutils.EncrptDecrypt;
import com.movieexpress.backend.systemutils.IdManager;
import com.movieexpress.backend.systemutils.JwtUtils;
import com.movieexpress.backend.systemutils.SystemConstants;
import jakarta.transaction.Transactional;
import jakarta.transaction.TransactionalException;
import org.bson.types.ObjectId;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

@Service
@Transactional
public class SignUpService {
    @Autowired
    private UserRepository userRepository;
    @Autowired
    private UserAuthenticationRepository userAuthenticationRepository;
    @Autowired
    private RolesRepository rolesRepository;
    @Autowired
    private SessionHandler sessionHandler;
    @Autowired
    private JwtUtils jwtUtils;
    @Autowired
    private IdManager idManager;


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
                    "Unknown-Error-Occurred",
                    HttpStatus.INTERNAL_SERVER_ERROR
            );
        }
    }

    public ResponseTokens activateUser(String sessionAccessToken) {
        User user = (User) sessionHandler.getDataFromSession(sessionAccessToken);
        user.setAccountStatus(1);
        UserAuthentication userAuthentication = userAuthenticationRepository.findByUser(user);
        user = userRepository.save(user);
        String refreshToken = jwtUtils.tokenGenerator(user, SystemConstants.REFRESH_TOKEN_VALIDATION_TIME);
        userAuthentication.setRefreshToken(refreshToken);
        userAuthenticationRepository.save(userAuthentication);
        return ResponseTokens.builder().accessToken(jwtUtils.tokenGenerator(user, SystemConstants.ACCESS_TOKEN_VALIDATION_TIME)).refreshToken(refreshToken).build();
    }

    public Map<String, String> resendEmail(ObjectId sessionId) {
        Map<String, String> userData = new HashMap<>();
        String verificationToken = sessionHandler.getTokenFromSessionUsingObjectId(sessionId);
        User user = (User) sessionHandler.getDataFromSession(verificationToken);
        userData.put("EmailId", user.getEmailId());
        userData.put("ValidationToken", verificationToken);
        sessionHandler.setDataInSession(verificationToken, user);
        return userData;

    }

    public ResponseTokens generateTokens(String ipAddress) {
        List<Roles> rolesList = new ArrayList<>();
        try {
            User user = userRepository.findByIpAddress(ipAddress);
            if (null != user && user.getIpAddress().equals(ipAddress))
                throw new ApplicationException(
                        ErrorCodes.USER_ALREADY_EXISTS,
                        "Refresh your browser",
                        HttpStatus.FORBIDDEN
                );
            rolesList.add(rolesRepository.findById(11L).orElse(null));
            User newUser = User.builder().userName("tempUser").roles(rolesList).emailId(idManager.tokenGenerator()).ipAddress(ipAddress).build();
            UserAuthentication userAuthentication = UserAuthentication.builder().user(newUser).build();
            userAuthenticationRepository.save(userAuthentication);
            return ResponseTokens.builder().accessToken(jwtUtils.tokenGenerator(newUser, SystemConstants.ACCESS_TOKEN_VALIDATION_TIME)).build();
        } catch (TransactionalException transactionalException) {
            throw new ApplicationException(
                    ErrorCodes.INVALID_ID,
                    "oops something wrong",
                    HttpStatus.INTERNAL_SERVER_ERROR
            );
        }

    }
}

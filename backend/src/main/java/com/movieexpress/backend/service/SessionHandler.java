package com.movieexpress.backend.service;

import com.mongodb.client.MongoClients;
import com.movieexpress.backend.customexception.ApplicationException;
import com.movieexpress.backend.customexception.ErrorCodes;
import com.movieexpress.backend.sessiondocument.SessionDocument;
import com.movieexpress.backend.sessionrepository.SessionRepository;
import jakarta.transaction.Transactional;
import jakarta.transaction.TransactionalException;
import org.bson.types.ObjectId;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.mongodb.core.MongoOperations;
import org.springframework.data.mongodb.core.MongoTemplate;
import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;
import java.util.Optional;

@Service
@Transactional
public class SessionHandler {
    @Autowired
    private SessionRepository sessionRepository;

    public ObjectId setDataInSession(
            String sessionAccessToken,
            Object data
    ) {
        try {
            SessionDocument sessionDocument = sessionRepository.findByAccountVerificationToken(sessionAccessToken);
            if (null == sessionDocument) {
                sessionDocument = sessionRepository.save(SessionDocument
                        .builder()
                        .accountVerificationToken(sessionAccessToken)
                        .data(data)
                        .Count(0)
                        .timeStamp(LocalDateTime.now())
                        .build()
                );
            } else {
                if (sessionDocument.getCount() > 2) {
                    throw new ApplicationException(
                            ErrorCodes.LIMIT_EXCEED,
                            "Limit-Exceeded",
                            HttpStatus.FORBIDDEN
                    );
                }

                sessionDocument.setCount(sessionDocument.getCount() + 1);
                sessionDocument.setTimeStamp(LocalDateTime.now());
                sessionDocument = sessionRepository.save(sessionDocument);//instead of updating its saving this document and its causing problem in searching

            }
            return sessionDocument.getMongosId();

        } catch (TransactionalException e) {
            throw new ApplicationException(
                    ErrorCodes.DATABASE_ERROR,
                    "Unknown-Error-Occurred",
                    HttpStatus.INTERNAL_SERVER_ERROR
            );
        }
    }

    public Object getDataFromSession(String sessionAccessToken) {
        SessionDocument sessionDocument = sessionRepository.findByAccountVerificationToken(sessionAccessToken);
        if (null == sessionDocument)
            throw new ApplicationException(
                    ErrorCodes.TOKEN_INVALID,
                    "Token-Is-Not-Valid",
                    HttpStatus.FORBIDDEN
            );
        sessionRepository.delete(sessionDocument);
        return sessionDocument.getData();
    }

    public String getDataFromSessionUsingObjectId(ObjectId sessionId) {
        Optional<SessionDocument> sessionDocument = sessionRepository.findById(sessionId);
        if (sessionDocument.isEmpty())
            throw new ApplicationException(
                    ErrorCodes.INVALID_ID,
                    "Id-Is-Not-Valid",
                    HttpStatus.FORBIDDEN
            );
        return sessionDocument.get().getAccountVerificationToken();
    }

    public void validateSessionAccessToken(ObjectId objectId) {
        Optional<SessionDocument> sessionDocument = sessionRepository.findById(objectId);
        if (sessionDocument.get().getTimeStamp().isAfter(sessionDocument.get().getTimeStamp().plusSeconds(90))) {
            throw new ApplicationException(
                    ErrorCodes.EXPIRED_TOKEN,
                    "Token-Is-Expired",
                    HttpStatus.FORBIDDEN
            );
        }
    }
}

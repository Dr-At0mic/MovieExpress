package com.movieexpress.backend.service;

import com.movieexpress.backend.sessiondocument.Log;
import com.movieexpress.backend.sessionrepository.LogRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;

@Service
public class RequestLogService {
    @Autowired
    private LogRepository logRepository;

    public void saveRequest(String ipAddress, String emailId, String token) {
        logRepository.save(Log.builder()
                .emailId(emailId)
                .ipAddress(ipAddress)
                .token(token)
                .timeStamp(LocalDateTime.now())
                .build());
    }
}

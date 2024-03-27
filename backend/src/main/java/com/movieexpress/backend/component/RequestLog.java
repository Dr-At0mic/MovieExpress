package com.movieexpress.backend.component;

import com.movieexpress.backend.service.RequestLogService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;

@Component
public class RequestLog {
    @Autowired
    private RequestLogService requestLogService;
    public void registerRequest(String ipAddress,String emailId, String token) {
        // can validate the ips and filter the request before getting inside business logic
        requestLogService.saveRequest(ipAddress,emailId,token);
    }
}

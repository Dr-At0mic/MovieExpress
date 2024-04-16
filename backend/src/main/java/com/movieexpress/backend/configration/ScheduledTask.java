package com.movieexpress.backend.configration;

import com.movieexpress.backend.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.Configuration;
import org.springframework.scheduling.annotation.EnableScheduling;
import org.springframework.scheduling.annotation.Scheduled;

@Configuration
@EnableScheduling
public class ScheduledTask {
    @Autowired
    private UserRepository userRepository;

    @Scheduled(cron = "0 0 0 * * *")
    public void unVerifiedUser(){

    }
}

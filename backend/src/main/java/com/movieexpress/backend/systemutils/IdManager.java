package com.movieexpress.backend.systemutils;

import org.springframework.stereotype.Component;

import java.util.UUID;
@Component
public class IdManager {
    public String tokenGenerator(){
        return UUID.randomUUID().toString().replace("-","");
    }
}

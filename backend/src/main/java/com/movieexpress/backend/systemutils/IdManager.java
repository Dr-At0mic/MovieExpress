package com.movieexpress.backend.systemutils;

import java.util.UUID;

public class IdManager {
    public String tokenGenerator(){
        return UUID.randomUUID().toString().replace("-","");
    }
}

package com.movieexpress.backend.systemutils;

import java.util.Base64;

public class EncrptDecrypt {
    public String encryption(String data){
        return Base64.getEncoder().encodeToString(data.getBytes());
    }
    public Object decryption(String data){
        return Base64.getDecoder().decode(data);
    }
}

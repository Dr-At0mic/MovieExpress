package com.movieexpress.backend.service;

import com.movieexpress.backend.entity.User;
import com.movieexpress.backend.repository.UserRepository;
import jakarta.mail.internet.AddressException;
import jakarta.mail.internet.InternetAddress;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class CrossCheck {
    @Autowired
    private UserRepository userRepository;
    public boolean userExist(String emailId) {
        User user = userRepository.findByEmailId(emailId);
        return null!=user;
    }
    public boolean emailValidation(String emailId) {
        try {
            InternetAddress internetAddress = new InternetAddress(emailId);
            internetAddress.validate();
            return true;
        }catch (AddressException addressException){
            return false;
        }
    }
}

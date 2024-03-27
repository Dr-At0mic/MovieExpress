package com.movieexpress.backend.systemutils;

import com.movieexpress.backend.entity.User;
import io.jsonwebtoken.Claims;
import io.jsonwebtoken.Jwts;
import io.jsonwebtoken.SignatureAlgorithm;
import io.jsonwebtoken.security.Keys;
import org.springframework.stereotype.Component;


import java.security.Key;
import java.util.Date;
import java.util.HashMap;
import java.util.Map;

@Component
public class JwtUtils {



    public String tokenGenerator(User user, int expirationDuration) {
        Date currentDate = new Date(System.currentTimeMillis());
        return Jwts.builder()
                .setClaims(extraClaims(user))
                .setSubject(user.getEmailId())
                .setIssuedAt(currentDate)
                .setExpiration(new Date(currentDate.getTime()+ (long) expirationDuration * 24 * 60 * 60 * 1000))
                .signWith(Keys.hmacShaKeyFor(SystemConstants.SECRET_KEY.getBytes()), SignatureAlgorithm.HS256)
                .compact();

    }
    public Map<String, Object> extraClaims(User user){
        Map<String ,Object> extraClaims = new HashMap<>();
        extraClaims.put("User_Name", user.getUserName());
        extraClaims.put("Account_Status", user.getAccountStatus()   );
        return extraClaims;
    }
    public Claims tokenExtractor(String token){
        return Jwts.parser().setSigningKey(Keys.hmacShaKeyFor(SystemConstants.SECRET_KEY.getBytes())).build().parseClaimsJws(token).getBody();
    }
    public String extractUserName(String token) {
        return tokenExtractor(token).getSubject();
    }

}

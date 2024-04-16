package com.movieexpress.backend.service;

import com.google.code.kaptcha.impl.DefaultKaptcha;
import com.movieexpress.backend.customexception.ApplicationException;
import com.movieexpress.backend.customexception.ErrorCodes;
import com.movieexpress.backend.models.Response;
import jakarta.servlet.http.HttpServletResponse;
import org.bson.types.ObjectId;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Service;

import javax.imageio.ImageIO;
import java.awt.image.BufferedImage;
import java.io.ByteArrayOutputStream;
import java.io.IOException;

@Service
public class CaptchaService {

    @Autowired
    private DefaultKaptcha captchaProducer;
    @Autowired
    private SessionHandler sessionHandler;

    public void generateCapthca(HttpServletResponse response) throws IOException {
        response.setDateHeader("Expires", 0);
        response.setHeader("Cache-Control", "no-store, no-cache, must-reval idate");
        response.addHeader("Cache-Control", "post-check=0, pre-check=0");
        response.setHeader("Pragma", "no-cache");
        response.setContentType("image/jpeg");
        String captchaText = captchaProducer.createText();
        String captchaId = sessionHandler.setCatpcha(captchaText);
        response.setHeader("captchaId", captchaId);
        BufferedImage captchaImage = captchaProducer.createImage(captchaText);
        response.setHeader("Access-Control-Expose-Headers", "captchaId");
        ByteArrayOutputStream out = new ByteArrayOutputStream();
        ImageIO.write(captchaImage, "jpg", out);
        byte[] captchaBytes = out.toByteArray();
        response.getOutputStream().write(captchaBytes);
        response.getOutputStream().flush();
        response.getOutputStream().close();
    }

    public Response validateCaptcha(String captchaId, String captchaText) {
        String orgCaptchaText = sessionHandler.getTokenFromSessionUsingObjectId(new ObjectId(captchaId));
        if (captchaText.equals(orgCaptchaText)) {
            sessionHandler.deleteSessionDocument(new ObjectId(captchaId));
            return Response.builder()
                    .status(true)
                    .message("not a robot")
                    .build();
        }

        throw new ApplicationException(
                ErrorCodes.INVALID_CAPTCHA,
                "captcha is invalid",
                HttpStatus.BAD_REQUEST
        );
    }

}

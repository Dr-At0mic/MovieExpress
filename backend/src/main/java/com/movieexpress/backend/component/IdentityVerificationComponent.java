package com.movieexpress.backend.component;

import com.movieexpress.backend.customexception.ApplicationException;
import com.movieexpress.backend.customexception.ErrorCodes;
import com.movieexpress.backend.models.Response;
import com.movieexpress.backend.service.CaptchaService;
import com.movieexpress.backend.service.EmailService;
import com.movieexpress.backend.systemutils.SystemConstants;
import jakarta.servlet.http.HttpServletResponse;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Component;

import java.io.IOException;
import java.util.concurrent.ExecutorService;
import java.util.concurrent.Executors;

@Component
public class IdentityVerificationComponent {
    @Autowired
    private EmailService emailService;
    @Autowired
    private CaptchaService captchaService;
    private static final ExecutorService newThread = Executors.newFixedThreadPool(SystemConstants.MAXIMUM_POOL_SIZE);

    public void sendVerificationEmail(String emailId, String authenticationToken) {
        final String htmlBody = "<!DOCTYPE html>\n" +
                "<html lang=\"en\">\n" +
                "<head>\n" +
                "    <meta charset=\"UTF-8\">\n" +
                "    <meta name=\"viewport\" content=\"width=device-width, initial-scale=1.0\">\n" +
                "    <title>Authentication Email</title>\n" +
                "    <style>\n" +
                "        /* Reset styles */\n" +
                "        body, table, td, p, a {\n" +
                "            font-family: Arial, sans-serif;\n" +
                "            font-size: 14px;\n" +
                "            line-height: 1.5;\n" +
                "            margin: 0;\n" +
                "            padding: 0;\n" +
                "            border: 0;\n" +
                "        }\n" +
                "        table {\n" +
                "            border-collapse: collapse;\n" +
                "            width: 100%;\n" +
                "        }\n" +
                "        td {\n" +
                "            padding: 10px;\n" +
                "        }\n" +
                "        /* Main styles */\n" +
                "        .container {\n" +
                "            max-width: 600px;\n" +
                "            margin: 0 auto;\n" +
                "        }\n" +
                "        .header {\n" +
                "            background-color: #f2f2f2;\n" +
                "            padding: 20px;\n" +
                "            text-align: center;\n" +
                "        }\n" +
                "        .header h1 {\n" +
                "            color: #333333;\n" +
                "            font-size: 24px;\n" +
                "            margin: 0;\n" +
                "        }\n" +
                "        .content {\n" +
                "            padding: 20px;\n" +
                "        }\n" +
                "        .button {\n" +
                "            background-color: #007bff;\n" +
                "            color: #ffffff;\n" +
                "            padding: 10px 20px;\n" +
                "            text-decoration: none;\n" +
                "            margin-top: 40px\n" +
                "            border-radius: 5px;\n" +
                "            display: inline-block;\n" +
                "        }\n" +
                "        .footer {\n" +
                "            background-color: #f2f2f2;\n" +
                "            padding: 20px;\n" +
                "            text-align: center;\n" +
                "        }\n" +
                "        .footer p {\n" +
                "            color: #777777;\n" +
                "            font-size: 12px;\n" +
                "            margin: 0;\n" +
                "        }\n" +
                "    </style>\n" +
                "</head>\n" +
                "<body>\n" +
                "    <div class=\"container\">\n" +
                "        <div class=\"header\">\n" +
                "            <h1>Welcome to Our MovieExpress</h1>\n" +
                "        </div>\n" +
                "        <div class=\"content\">\n" +
                "            <p>Dear Sir/Madam,</p>\n" +
                "            <p>Thank you for signing up. Please click the button below to verify your email address:</p>\n" +
                "            <p><a href=\"[VerificationLink]\" class=\"button\">Verify Email Address</a></p>\n" +
                "            <p>If you didn't request this, you can safely ignore this email.</p>\n" +
                "            <p>Best regards,<br>[Your Organization]</p>\n" +
                "        </div>\n" +
                "        <div class=\"footer\">\n" +
                "            <p>This email was sent to you by Example Company. If you wish to unsubscribe, <a href=\"#\">click here</a>.</p>\n" +
                "        </div>\n" +
                "    </div>\n" +
                "</body>\n" +
                "</html>\n";
        try {
            newThread.submit(() -> {
                emailService.sendEmail(
                        emailId,
                        "verification email for your signup in movieexpress",
                        htmlBody.replace("[VerificationLink]",
                                "http://localhost:8080/api/auth/verifyaccount?token="+authenticationToken
                        )
                );
            });
        } catch (Exception e) {
            newThread.shutdown();
            throw new ApplicationException(
                    ErrorCodes.EXECUTOR_ERROR,
                    e.getMessage(),
                    HttpStatus.INTERNAL_SERVER_ERROR
            );
        }
    }
    public void captchaGenerate(HttpServletResponse response) throws IOException {
        captchaService.generateCapthca(response);
    }

    public Response ValidateCaptcha(String captchaId, String captchaText) {
        if(null == captchaId || null == captchaText || captchaId.length()<24)
            throw new ApplicationException(
                    ErrorCodes.INVALID_CAPTCHA,
                    "captcha is invalid",
                    HttpStatus.BAD_REQUEST
            );
        return captchaService.validateCaptcha(captchaId,captchaText);
    }
}

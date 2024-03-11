package com.demo.utils;
import org.springframework.stereotype.Service;

import java.util.UUID;

@Service
public class AuthUtils {

    public static String getLoggedInUserId() {
//        return authService.getAuthenticatedUser().getId().toString();
        return "DEFAULT_USER";
    }
}

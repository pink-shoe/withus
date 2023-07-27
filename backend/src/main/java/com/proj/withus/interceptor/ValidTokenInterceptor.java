package com.proj.withus.interceptor;

import com.proj.withus.util.JwtUtil;
import lombok.extern.slf4j.Slf4j;
import org.springframework.web.servlet.HandlerInterceptor;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.net.HttpURLConnection;
import java.net.URL;

@Slf4j
public class ValidTokenInterceptor implements HandlerInterceptor {

    private JwtUtil jwtUtil = new JwtUtil();

    @Override
    public boolean preHandle(HttpServletRequest request, HttpServletResponse response, Object Handler) throws Exception {

//        // Jwt 인증 확인
//        JwtUtil jwtUtil = new JwtUtil();
//        String jwt = jwtUtil.generateJwtToken(12345678L);
//        System.out.println("jwt: " + jwt);
//        boolean jwt_validation = jwtUtil.validateJwtToken(jwt);
//        System.out.println("isValid: " + jwt_validation);
//        String id = jwtUtil.extractMemberId(jwt);
//        System.out.println("member id: " + id);

        String jwtToken = request.getHeader("Authorization").substring(7);
        boolean isValid = jwtUtil.validateJwtToken(jwtToken);
        if (!isValid) {
            return false;
        }
        return true;
    }
}

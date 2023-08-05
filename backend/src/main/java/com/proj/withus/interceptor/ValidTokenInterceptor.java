package com.proj.withus.interceptor;

import com.proj.withus.domain.dto.SocialMemberInfo;
import com.proj.withus.util.JwtUtil;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;
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

        log.info("interceptor가 불렸는지 확인~~~~~~~~~~~~~~~~~~~~~ ");

//        String jwtToken = "";
//        try {
//            jwtToken = request.getHeader("Authorization").substring(7);
//        } catch (Exception e) {
//            return false;
//        }
//        boolean isValid = jwtUtil.validateJwtToken(jwtToken);
//        if (!isValid) {
//            return false;
//        }
//        return true;

        String token = request.getHeader("Authorization");
        Long memberId = -1234L;
        System.out.println("tokennnnnnnnnnnnnnnn:" + token);

        if (token != null && token.startsWith("Bearer ")) {
            String jwt = token.substring(7); // 두 번 처리하는 듯
//            String jwt = token;

            if (!jwtUtil.validateJwtToken(jwt)) {
                response.sendError(HttpServletResponse.SC_UNAUTHORIZED, "Invalid token"); // 401
                return false;
            } else {
                SocialMemberInfo socialMemberInfo = jwtUtil.extractMemberId(token);
                memberId = socialMemberInfo.getId();
                request.setAttribute("memberId", memberId);
                request.setAttribute("token", jwt);
            }
        }
        System.out.println("Valid check ~ id: " + memberId);
        return true;
    }
}

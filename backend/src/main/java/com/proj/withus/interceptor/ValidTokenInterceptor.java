package com.proj.withus.interceptor;

import lombok.extern.slf4j.Slf4j;
import org.springframework.web.servlet.HandlerInterceptor;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.net.HttpURLConnection;
import java.net.URL;

@Slf4j
public class ValidTokenInterceptor implements HandlerInterceptor {

    @Override
    public boolean preHandle(HttpServletRequest request, HttpServletResponse response, Object Handler) throws Exception {

        // Jwt 인증 확인
        JwtUtil




//        String path = request.getRequestURI();
//        System.out.println("URL 요청 처리 // : " + path);

        try {
            String token = request.getHeader("Authorization").substring(7);
            String reqURL = "https://kapi.kakao.com/v2/user/me";
            URL url = new URL(reqURL);
            HttpURLConnection conn = (HttpURLConnection) url.openConnection();
            conn.setRequestMethod("GET");
            conn.setDoOutput(true);
            conn.setRequestProperty("Authorization", "Bearer " + token); //전송할 header 작성, access_token 전송

            //결과 코드가 200이라면 성공
            int responseCode = conn.getResponseCode();

            if (responseCode != 200) {
                System.out.println("responseCode is not 200");
                return false;
            }
        } catch (Exception e) {
            log.info("interceptor exception");
            return false;
        }

        return true;
    }
} // 만약에 google 등 다른 소셜 로그인 같이 넣을거면 메서드 분리 필요함 (지금은 그냥 카카오 api로 때려박음)

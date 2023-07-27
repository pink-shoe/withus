package com.proj.withus.util;

import io.jsonwebtoken.Claims;
import io.jsonwebtoken.ExpiredJwtException;
import io.jsonwebtoken.Jwts;
import io.jsonwebtoken.SignatureAlgorithm;

import java.util.Date;
import java.util.HashMap;
import java.util.Map;

public class JwtUtil {

    private final String SECRET_KEY = "withussecretkeywithussecretkeywithussecretkeywithussecretkey";
    private final long EXPIRATION_TIME = 9000000; // 9,000,000ms == 150분

//    public String getMemberIdForJwt(String email) {} // 이건 MemberRepository에 담는 것이 의미상 맞을 듯

    public String generateJwtToken(Long memberId) { // String으로 변환해서 받아야하는지 확인 필요
        // 현재 시간 기준으로 토큰 만료 시간 설정
        Date expirationDate = new Date(System.currentTimeMillis() + EXPIRATION_TIME);
        Date now = new Date();

        // payload에 저장할 정보 설정
        Map<String, Object> claims = new HashMap<>();
        claims.put("memberId", memberId.toString());

        return Jwts.builder()
                .setClaims(claims)
                .setIssuedAt(now)
                .setExpiration(expirationDate)
                .signWith(SignatureAlgorithm.HS256, SECRET_KEY)
                .compact();
    }

    public boolean validateJwtToken(String jwtToken) {
        try {
            // JWT을 Claims로 변환
            Claims claims = Jwts.parser()
                    .setSigningKey(SECRET_KEY)
                    .parseClaimsJws(jwtToken)
                    .getBody();

            Date expirationDate = claims.getExpiration();
            if (expirationDate.before(new Date())) {
                System.out.println("JWT token 만료");
                return false;
            }

            return true;

        } catch (ExpiredJwtException e) {
            System.out.println("JWT token 만료"); // 위의 유효 시간 판단과 구별 필요
            return false;
        } catch (Exception e) {
            System.out.println("유효하지 않은 token");
            return false;
        }
    }

    public String extractMemberId(String jwtToken) {
        Claims claims = Jwts.parser()
                .setSigningKey(SECRET_KEY)
                .parseClaimsJws(jwtToken)
                .getBody();

        return claims.get("memberId", String.class);
    }
}

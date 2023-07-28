//package com.proj.withus.service;
//
//import com.proj.withus.domain.dto.GoogleUserInfo;
//import lombok.RequiredArgsConstructor;
//import lombok.extern.slf4j.Slf4j;
//import org.springframework.beans.factory.annotation.Autowired;
//import org.springframework.beans.factory.annotation.Value;
//import org.springframework.http.HttpEntity;
//import org.springframework.http.HttpHeaders;
//import org.springframework.http.HttpMethod;
//import org.springframework.http.ResponseEntity;
//import org.springframework.stereotype.Service;
//import org.springframework.util.LinkedMultiValueMap;
//import org.springframework.util.MultiValueMap;
//import org.springframework.web.client.RestTemplate;
//import org.springframework.web.util.UriComponentsBuilder;
//
//import java.util.Map;
//
//@Service
//@RequiredArgsConstructor
//@Slf4j
//public class OauthServiceImpl implements OauthService {
//
//    private final String GOOGLE_TOKEN_URL = "https://oauth2.googleapis.com/token";
//    private final String GOOGLE_USERINFO_URL = "https://www.googleapis.com/oauth2/v3/userinfo";
//
//    @Value("${spring.security.oauth2.client.registration.google.client-id}")
//    private String clientId;
//
//    @Value("${spring.security.oauth2.client.registration.google.client-secret}")
//    private String clientSecret;
//
//    @Value("${spring.security.oauth2.client.registration.google.redirect-uri}")
//    private String redirectUri;
//
//    @Autowired
//    private MemberServiceImpl memberService;
//
//    public String getGoogleAccessToken(String authorizationCode) {
//        RestTemplate restTemplate = new RestTemplate();
//
//        HttpHeaders headers = new HttpHeaders();
//        headers.setBasicAuth(clientId, clientSecret);
//
//        MultiValueMap<String, String> requestBody = new LinkedMultiValueMap<>();
//        requestBody.add("code", authorizationCode);
//        requestBody.add("grant_type", "authorization_code");
//        requestBody.add("redirect_uri", redirectUri); // OAuth2 리다이렉트 URL
//
//        HttpEntity<MultiValueMap<String, String>> request = new HttpEntity<>(requestBody, headers);
//
//        ResponseEntity<Map> response = restTemplate.exchange(
//                GOOGLE_TOKEN_URL,
//                HttpMethod.POST,
//                request,
//                Map.class
//        );
//        System.out.println(response.getBody().toString());
//        String accessToken = (String) response.getBody().get("access_token");
//        return accessToken;
//    }
//
//    public String getGoogleUserInfo(String accessToken) {
//        RestTemplate restTemplate = new RestTemplate();
//
//        HttpHeaders headers = new HttpHeaders();
//        headers.setBearerAuth(accessToken);
//
//        HttpEntity<String> request = new HttpEntity<>(headers);
//
//        ResponseEntity<Map> response = restTemplate.exchange(
//                UriComponentsBuilder.fromUriString(GOOGLE_USERINFO_URL).toUriString(),
//                HttpMethod.GET,
//                request,
//                Map.class
//        );
//
//        System.out.println(response.getBody().toString());
//        GoogleUserInfo userInfo = new GoogleUserInfo();
//
//        userInfo.setNickname(response.getBody().get("nickname").toString());
//        userInfo.setEmail(response.getBody().get("email").toString());
//        userInfo.setProfile(response.getBody().get("picture").toString());
//
//        memberService.saveGoogle(userInfo, accessToken);
//        return response.getBody().toString();
//    }
//}
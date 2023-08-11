package com.proj.withus.service;

import java.io.BufferedReader;
import java.io.BufferedWriter;
import java.io.IOException;
import java.io.InputStreamReader;
import java.io.OutputStreamWriter;
import java.net.HttpURLConnection;
import java.net.URL;
import java.util.Map;

import javax.transaction.Transactional;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.HttpEntity;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpMethod;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;
import org.springframework.util.LinkedMultiValueMap;
import org.springframework.util.MultiValueMap;
import org.springframework.web.client.RestTemplate;
import org.springframework.web.reactive.function.client.WebClient;
import org.springframework.web.util.UriComponentsBuilder;

import com.google.gson.JsonElement;
import com.google.gson.JsonParser;
import com.proj.withus.domain.Member;
import com.proj.withus.domain.dto.SocialMemberInfo;
import com.proj.withus.repository.MemberRepository;
import com.proj.withus.util.JwtUtil;

import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;

@Service
@RequiredArgsConstructor
@Slf4j
@Transactional
public class SocialServiceImpl implements SocialService {

    private final String KAKAO_TOKEN_URL = "https://kauth.kakao.com/oauth/token";

    private final String KAKAO_USERINFO_URL = "https://kapi.kakao.com/v2/user/me" ;
    private final String GOOGLE_TOKEN_URL = "https://oauth2.googleapis.com/token";
    private final String GOOGLE_USERINFO_URL = "https://www.googleapis.com/oauth2/v3/userinfo";

    @Value("${kakao.rest-api-key}")
    private String kakaoApiKey;

    @Value("${kakao.redirect-uri}")
    private String kakaoRedirectUri;

    @Value("${spring.security.oauth2.client.registration.google.client-id}")
    private String clientId;

    @Value("${spring.security.oauth2.client.registration.google.client-secret}")
    private String clientSecret;

    @Value("${spring.security.oauth2.client.registration.google.redirect-uri}")
    private String redirectUri;

    private final AlbumService albumService;
    private final MemberRepository memberRepository;
    private JwtUtil jwtUtil;

    @Override
    public String getKakaoAccessToken(String code) {
        RestTemplate restTemplate = new RestTemplate();
        HttpHeaders headers = new HttpHeaders();
        headers.add("Content-type", "application/x-www-form-urlencoded;charset=utf-8");

        MultiValueMap<String, String> params = new LinkedMultiValueMap<>();
        params.add("grant_type", "authorization_code");
        params.add("client_id", kakaoApiKey);
        params.add("redirect_uri", kakaoRedirectUri);
        params.add("code", code);

        HttpEntity<MultiValueMap<String, String>> kakaoTokenRequest = new HttpEntity<>(params, headers);

        ResponseEntity<Map> response = restTemplate.exchange(
                KAKAO_TOKEN_URL,
                HttpMethod.POST,
                kakaoTokenRequest,
                Map.class
        );

        String accessToken = (String) response.getBody().get("access_token");
        return accessToken;
    }

    @Override
    public Long getKakaoMemberInfo(String token) {

        WebClient webClient = WebClient.create(KAKAO_USERINFO_URL);
        String response = webClient.get()
                .uri(KAKAO_USERINFO_URL)
                .header("Authorization", "Bearer " + token)
                .header("Content-type", "application/x-www-form-urlencoded;charset=utf-8")
                .retrieve()
                .bodyToMono(String.class)
                .block();

        JsonParser parser = new JsonParser();
        JsonElement element = parser.parse(response);

        Long memberId = -1L;

        JsonElement kakaoAccount = element.getAsJsonObject().get("kakao_account");
        JsonElement profile = kakaoAccount.getAsJsonObject().get("profile");

        Member kakaoMember = new Member();
        kakaoMember.setEmail(kakaoAccount.getAsJsonObject().get("email").getAsString());
        kakaoMember.setNickname(profile.getAsJsonObject().get("nickname").getAsString());
        kakaoMember.setLoginType("kakao");
        
        Member existingMember = memberRepository.findByEmail(kakaoMember.getEmail());

        if (existingMember == null) {
            memberRepository.save(kakaoMember);
            albumService.createAlbum(kakaoMember);
        }
        memberId = memberRepository.findByEmail(kakaoMember.getEmail()).getId();

        return memberId;
    }

    @Override
    public String getGoogleAccessToken(String code) {
        RestTemplate restTemplate = new RestTemplate();

        HttpHeaders headers = new HttpHeaders();
        headers.setBasicAuth(clientId, clientSecret);

        MultiValueMap<String, String> requestBody = new LinkedMultiValueMap<>();
        requestBody.add("code", code);
        requestBody.add("grant_type", "authorization_code");
        requestBody.add("redirect_uri", redirectUri); // OAuth2 리다이렉트 URL

        HttpEntity<MultiValueMap<String, String>> request = new HttpEntity<>(requestBody, headers);

        ResponseEntity<Map> response = restTemplate.exchange(
                GOOGLE_TOKEN_URL,
                HttpMethod.POST,
                request,
                Map.class
        );
        System.out.println(response.getBody().toString());
        String accessToken = (String) response.getBody().get("access_token");
        return accessToken;
    }

    @Override
    public Long getGoogleMemberInfo(String token) {
        RestTemplate restTemplate = new RestTemplate();

        HttpHeaders headers = new HttpHeaders();
        headers.setBearerAuth(token);

        HttpEntity<String> request = new HttpEntity<>(headers);

        ResponseEntity<Map> response = restTemplate.exchange(
                UriComponentsBuilder.fromUriString(GOOGLE_USERINFO_URL).toUriString(),
                HttpMethod.GET,
                request,
                Map.class
        );

        System.out.println(response.getBody().toString());

        SocialMemberInfo googleUserInfo = new SocialMemberInfo();

        googleUserInfo.setNickname(response.getBody().get("name").toString());
        googleUserInfo.setEmail(response.getBody().get("email").toString());
        googleUserInfo.setLoginType("google");

        Member googleMember = new Member();
        googleMember.setNickname(googleUserInfo.getNickname());
        googleMember.setEmail(googleUserInfo.getEmail());
        googleMember.setLoginType(googleUserInfo.getLoginType());
        //        userInfo.setProfile(response.getBody().get("picture").toString());

//        memberService.saveGoogle(userInfo, token);

         Member existingMember = memberRepository.findByEmail(googleMember.getEmail());

            if (existingMember == null) {
                memberRepository.save(googleMember);
                albumService.createAlbum(googleMember);
            }

        Long memberId = memberRepository.findByEmail(googleUserInfo.getEmail()).getId();

        return memberId;
    }

    @Override
    public void joinMember(Member member) {
        memberRepository.save(member);
    }

    // email에 해당하는 memberId(pk)를 반환
    @Override
    public Long getMemberIdForJwt(String email) {
        return memberRepository.findByEmail(email).getId();
    }

}

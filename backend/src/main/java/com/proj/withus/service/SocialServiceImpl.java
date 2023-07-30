package com.proj.withus.service;


import com.google.gson.JsonElement;
import com.google.gson.JsonParser;
import com.proj.withus.domain.Member;
import com.proj.withus.domain.dto.SocialMemberInfo;
import com.proj.withus.repository.MemberRepository;
import com.proj.withus.util.JwtUtil;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.HttpEntity;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpMethod;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;
import org.springframework.util.LinkedMultiValueMap;
import org.springframework.util.MultiValueMap;
import org.springframework.web.client.RestTemplate;
import org.springframework.web.util.UriComponentsBuilder;

import javax.transaction.Transactional;
import java.io.*;
import java.net.HttpURLConnection;
import java.net.URL;
import java.util.Map;

@Service
@RequiredArgsConstructor
@Slf4j
@Transactional
public class SocialServiceImpl implements SocialService {

    private final String GOOGLE_TOKEN_URL = "https://oauth2.googleapis.com/token";
    private final String GOOGLE_USERINFO_URL = "https://www.googleapis.com/oauth2/v3/userinfo";

    @Value("${spring.security.oauth2.client.registration.google.client-id}")
    private String clientId;

    @Value("${spring.security.oauth2.client.registration.google.client-secret}")
    private String clientSecret;

    @Value("${spring.security.oauth2.client.registration.google.redirect-uri}")
    private String redirectUri;
gf
//    private final MemberServiceImpl memberService;
    private final MemberRepository memberRepository;
    private JwtUtil jwtUtil;

    @Override
    public String getKakaoAccessToken(String code) {
        String accessToken = "";
        String reqURL = "https://kauth.kakao.com/oauth/token";

        try {
            URL url = new URL(reqURL);
            HttpURLConnection conn = (HttpURLConnection) url.openConnection();

            // POST 요청을 위해 기본값이 false인 setDoOutput을 true로 설정
            conn.setRequestMethod("POST");
            conn.setDoOutput(true);

            // POST 요청에 필요로 요구하는 파라미터를 스트림을 통해 전송
            BufferedWriter bw = new BufferedWriter((new OutputStreamWriter(conn.getOutputStream())));
            StringBuilder sb = new StringBuilder();
            sb.append("grant_type=authorization_code");
            sb.append("&client_id=7ea82d8a610fe51bcf3eca267069b264");
            sb.append("&redirect_uri=http://localhost:8080/kakao/login");
            sb.append("&code=" + code);
            bw.write(sb.toString());
            bw.flush();

            // 결과 코드가 200이라면 성공
            int responseCode = conn.getResponseCode();
            log.info("responseCode : " + responseCode);

            // 요청을 통해 얻은 JSON타입의 Response 메세지 읽어오기
//            String result = getRequestResult(conn);
            BufferedReader br = new BufferedReader(new InputStreamReader(conn.getInputStream()));
            String line = "";
            String result = "";
            while ((line = br.readLine()) != null) {
                result += line;
            }

            // Gson 라이브러리에 포함된 클래스로 JSON파싱 객체 생성
            JsonParser parser = new JsonParser();
            JsonElement element = parser.parse(result);

            accessToken = element.getAsJsonObject().get("access_token").getAsString();
            bw.close();
        } catch (IOException e) {
            e.printStackTrace();
        }
        return accessToken;
    }

    @Override
    public Long getKakaoMemberInfo(String token) {
        String reqURL = "https://kapi.kakao.com/v2/user/me";
        SocialMemberInfo kakaoMemberInfo = new SocialMemberInfo();
        Long memberId = -1L;

        //access_token을 이용하여 사용자 정보 조회
        try {
            URL url = new URL(reqURL);
            HttpURLConnection conn = (HttpURLConnection) url.openConnection();

            conn.setRequestMethod("GET");
            conn.setDoOutput(true);
            conn.setRequestProperty("Authorization", "Bearer " + token); //전송할 header 작성, access_token 전송

            //결과 코드가 200이라면 성공
            int responseCode = conn.getResponseCode();
            log.info("responseCode : " + responseCode);

            //요청을 통해 얻은 JSON타입의 Response 메세지 읽어오기
            BufferedReader br = new BufferedReader(new InputStreamReader(conn.getInputStream()));

            String line = "";
            String result = "";

            while ((line = br.readLine()) != null) {
                result += line;
            }

            //Gson 라이브러리로 JSON파싱
            JsonParser parser = new JsonParser();
            JsonElement element = parser.parse(result);
            JsonElement kakaoAccount = element.getAsJsonObject().get("kakao_account");
            JsonElement profile = kakaoAccount.getAsJsonObject().get("profile");

            //dto에 저장하기
            Long kakaoId = element.getAsJsonObject().get("id").getAsLong(); // @Id 태그 때문에 직접 id값을 넣을 수 없음
//            kakaoMemberInfo.setId(element.getAsJsonObject().get("id").getAsLong());
            kakaoMemberInfo.setEmail(kakaoAccount.getAsJsonObject().get("email").getAsString());
            kakaoMemberInfo.setNickname(profile.getAsJsonObject().get("nickname").getAsString());
            kakaoMemberInfo.setLoginType("kakao");

            Member kakaoMember = new Member();
//            kakaoMember.setId(kakaoMemberInfo.getId());
            kakaoMember.setEmail(kakaoMemberInfo.getEmail());
            kakaoMember.setNickname(kakaoMemberInfo.getNickname());
            kakaoMember.setLoginType(kakaoMemberInfo.getLoginType());

            memberRepository.save(kakaoMember);
            memberId = memberRepository.findByEmail(kakaoMember.getEmail()).getId();

        } catch (IOException e) {
            e.printStackTrace();
        }

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
    public String getGoogleMemberInfo(String token) {
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
        memberRepository.save(googleMember);
        return response.getBody().toString(); // kakao return값과 다르긴 한데, 이 return값을 사용하진 않을 것 같음
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

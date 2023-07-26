package com.proj.withus.service;

import com.google.gson.JsonElement;
import com.google.gson.JsonParser;
import com.proj.withus.domain.Member;
import com.proj.withus.domain.dto.KakaoUserInfo;
import com.proj.withus.repository.OauthRepository;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;

import javax.transaction.Transactional;
import java.io.*;
import java.net.HttpURLConnection;
import java.net.URL;

@Service
@RequiredArgsConstructor
@Slf4j
@Transactional
public class KakaoService {

    private final OauthRepository oauthRepository;

    public String getKakaoAccessToken(String code) {
        String accessToken = "";
        String refreshToken = "";
        String idToken = "";
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
            refreshToken = element.getAsJsonObject().get("refresh_token").getAsString();

//            idToken = element.getAsJsonObject().get("id_token").getAsString();

            log.info("access_token : " + accessToken);
            System.out.println("-------------------------------");
            System.out.println("access_token : " + accessToken);
            System.out.println("refresh_token : " + refreshToken);
//            System.out.println("id_token: " + idToken);
            System.out.println("-------------------------------");


            bw.close();
        } catch (IOException e) {
            e.printStackTrace();
        }
        return accessToken;
    }

    public KakaoUserInfo getKakaoUserInfo(String token) {
        String reqURL = "https://kapi.kakao.com/v2/user/me";
        KakaoUserInfo kakaoUserInfo = new KakaoUserInfo();

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
//            kakaoUserInfo.setId(element.getAsJsonObject().get("id").getAsLong());
            kakaoUserInfo.setEmail(kakaoAccount.getAsJsonObject().get("email").getAsString());
            kakaoUserInfo.setNickname(profile.getAsJsonObject().get("nickname").getAsString());
            kakaoUserInfo.setLoginType("kakao");

            Member kakaoMember = new Member();
            kakaoMember.setId(kakaoUserInfo.getId());
            kakaoMember.setEmail(kakaoUserInfo.getEmail());
            kakaoMember.setNickname(kakaoUserInfo.getNickname());
            kakaoMember.setLoginType(kakaoUserInfo.getLoginType());

            oauthRepository.save(kakaoMember);
            log.info(kakaoUserInfo.toString());

        } catch (IOException e) {
            e.printStackTrace();
        }

        return kakaoUserInfo;
    }
}

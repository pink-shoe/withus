package com.proj.withus.controller;

import com.proj.withus.service.KakaoService;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.bind.annotation.RestController;

@RestController
@Slf4j
@RequiredArgsConstructor
public class OauthController {

    private final KakaoService oauthService;

    @ResponseBody
    @GetMapping("/kakao/login")
    public ResponseEntity<String> kakaoCallback(@RequestParam String code) {
        log.info("code : " + code);

        String token = oauthService.getKakaoAccessToken(code);
        log.info("user info : " + oauthService.getKakaoUserInfo(token));
        return new ResponseEntity<>(token, HttpStatus.OK);
    }

    @GetMapping("/")
    public String index() {
        return "(temp)index page";
    }

    @GetMapping("/temp")
    public String temp() {
        // 여기로 요청 보내면, 우선 interceptor에서 header를 확인함
        // kakao 서버에 접근해서 해당 header token에 문제가 없으면
        // "responseCode is 200"를 출력해줘야 함
        // 그렇지 않으면 "responseCode is 200 !!"를 출력하고, return false
        // interceptor에서 false를 return하면 어떻게 되는지 한 번 보고 exception을 추가하거나 하면 될 듯
        return "interceptor check";
    }

    @GetMapping("/check")
    public ResponseEntity<String> check() {
        String msg = "token valid check: success";
        return new ResponseEntity<String>(msg, HttpStatus.OK);
    }
}

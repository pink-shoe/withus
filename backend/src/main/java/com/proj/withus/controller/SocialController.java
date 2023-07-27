package com.proj.withus.controller;

import com.proj.withus.service.SocialService;
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
public class SocialController {

    private final SocialService socialService;

    @GetMapping("/")
    public String index() {
        return "<h1>index page</h1>";
    }

    @ResponseBody
    @GetMapping("/kakao/login")
    public ResponseEntity<String> kakaoCallback(@RequestParam String code) {
        log.info("code : " + code);

        String token = socialService.getKakaoAccessToken(code);
        log.info("user info : " + socialService.getKakaoMemberInfo(token));
        return new ResponseEntity<>(token, HttpStatus.OK);
    }

    @ResponseBody
    @GetMapping("/auth/google/callback")
    public ResponseEntity<?> googleLogin(@RequestParam(name = "code") String code) {
        String accessToken = socialService.getGoogleAccessToken(code);
        String userInfo = socialService.getGoogleMemberInfo(accessToken);

        return ResponseEntity.ok(userInfo);
    }

}

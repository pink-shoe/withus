package com.proj.withus.controller;

import com.proj.withus.service.OauthService;
import lombok.AllArgsConstructor;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.bind.annotation.RestController;

@RestController
@Slf4j
@RequiredArgsConstructor
public class OauthController {

    private final OauthService oauthService;

    @ResponseBody
    @GetMapping("/kakao/login")
    public void kakaoCalllback(@RequestParam String code) {
        log.info("code : " + code);
        log.info("user info : " + oauthService.getKakaoUserInfo(oauthService.getKakaoAccessToken(code)));
    }
}

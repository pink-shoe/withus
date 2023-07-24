package com.proj.withus.controller;

import com.proj.withus.service.OauthService;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.bind.annotation.RestController;

@RestController
@Slf4j
@RequiredArgsConstructor
public class MemberController {

    private final OauthService oauthService;

    @GetMapping("/login")
    public String login() {
        return "<a href=\"\">Google Login</a>";
    }

    @ResponseBody
    @GetMapping("/google/login")
    public ResponseEntity<?> googleLogin(@RequestParam String code) {
        log.info("code : " + code);
        log.info("user info: ");
        String accessToken = oauthService.getGoogleAccessToken(code);
        String userInfo = oauthService.getGoogleUserInfo(accessToken);
        System.out.println("-----------------------------");
        System.out.printf("accessToken: " + accessToken);
        System.out.printf("user info: " + userInfo);
        System.out.println("-----------------------------");
        return ResponseEntity.ok(userInfo);
    }
}

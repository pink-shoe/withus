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

    @ResponseBody
    @GetMapping("/auth/google/callback")
    public ResponseEntity<?> googleLogin(@RequestParam(name = "code") String code) {
        String accessToken = oauthService.getGoogleAccessToken(code);
        String userInfo = oauthService.getGoogleUserInfo(accessToken);

        return ResponseEntity.ok(userInfo);
    }


}

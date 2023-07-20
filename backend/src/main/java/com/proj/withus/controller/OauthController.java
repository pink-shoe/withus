package com.proj.withus.controller;

import lombok.AllArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.bind.annotation.RestController;

@RestController
@Slf4j
@AllArgsConstructor
public class OauthController {

    @ResponseBody
    @GetMapping("/kakao/login")
    public void kakaoCalllback(@RequestParam String code) {
        log.info("code : " + code);
        System.out.println(code);

    }
}

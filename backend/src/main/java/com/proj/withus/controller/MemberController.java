//package com.proj.withus.controller;
//
//import com.proj.withus.service.SocialService;
//import lombok.RequiredArgsConstructor;
//import lombok.extern.slf4j.Slf4j;
//import org.springframework.http.ResponseEntity;
//import org.springframework.web.bind.annotation.GetMapping;
//import org.springframework.web.bind.annotation.RequestParam;
//import org.springframework.web.bind.annotation.ResponseBody;
//import org.springframework.web.bind.annotation.RestController;
//
//@RestController
//@Slf4j
//@RequiredArgsConstructor
//public class MemberController {
//
//    private final SocialService socialService;
//
//    @ResponseBody
//    @GetMapping("/auth/google/callback")
//    public ResponseEntity<?> googleLogin(@RequestParam(name = "code") String code) {
//        String accessToken = socialService.getGoogleAccessToken(code);
//        String userInfo = socialService.getGoogleMemberInfo(accessToken);
//
//        return ResponseEntity.ok(userInfo);
//    }
//
//
//}

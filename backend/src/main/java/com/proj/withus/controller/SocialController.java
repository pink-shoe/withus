package com.proj.withus.controller;

import com.proj.withus.domain.Member;
import com.proj.withus.domain.dto.SocialMemberInfo;
import com.proj.withus.repository.MemberRepository;
import com.proj.withus.service.SocialService;
import com.proj.withus.util.JwtUtil;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.Optional;

@RestController
@Slf4j
@RequiredArgsConstructor
public class SocialController {

    private final SocialService socialService;
    private final MemberRepository memberRepository;

    private final JwtUtil jwtUtil;

    @GetMapping("/")
    public String index() {
        return "<h1>index page</h1>";
    }

    // test
    @GetMapping("/temp/member")
    public ResponseEntity<Long> getMemberInfo(@RequestHeader("Authorization") String jwtToken) {
        Long testId = jwtUtil.extractMemberId(jwtToken);
        return new ResponseEntity<>(testId, HttpStatus.OK);
    }

    @ResponseBody
    @GetMapping("/kakao/login") // url 수정 필요함
    public ResponseEntity<String> kakaoCallback(@RequestParam String code) {
        log.info("code: ", code);
        String accessToken = socialService.getKakaoAccessToken(code);
        System.out.println("access token: " + accessToken);
        Long kakaoMemberInfo = socialService.getKakaoMemberInfo(accessToken);
        System.out.println("kakaoMemberInfo: " + kakaoMemberInfo);

//        String jwtToken = jwtUtil.generateJwtToken(12345678L);
//        JwtUtil jwtUtil = new JwtUtil();
        String jwtToken = jwtUtil.generateJwtToken((Long) kakaoMemberInfo);
        System.out.println("jwtToken: " + jwtToken);
        return new ResponseEntity<>(jwtToken, HttpStatus.OK);
    }

    // authorization code 확인용
    @ResponseBody
    @GetMapping("/kakao/code")
    public ResponseEntity<String> kakaoCode(@RequestParam String code) {
        System.out.println("code: " + code);
        return new ResponseEntity<>(code, HttpStatus.OK);
    }

    // 프론트가 구현 성공하면 다시 살릴 것
//    @ResponseBody
//    @GetMapping("/auth/google/callback")
//    public ResponseEntity<?> googleLogin(@RequestParam(name = "code") String code) {
//        String accessToken = socialService.getGoogleAccessToken(code);
//        String userInfo = socialService.getGoogleMemberInfo(accessToken);
//
//        return ResponseEntity.ok(userInfo);
//    }

    // 프론트가 가진 정보로 withus DB에 회원 등록
    @PostMapping("/auth/googlemember")
    public ResponseEntity<String> saveGoogleMember(@RequestBody SocialMemberInfo socialMemberInfo) {
        Member member = new Member();
        member.setNickname(socialMemberInfo.getNickname());
        member.setEmail(socialMemberInfo.getEmail());
        memberRepository.save(member);
        return ResponseEntity.ok("Success");
    }

//    // google api에서 받은 google 계정 전용 고유 id를 withus DB의 id로 변환
//    @GetMapping("/auth/googlememberid")
//    public ResponseEntity<Long> getMemberId(@RequestParam Long googleId) {
//        jwtUtil.
//    }
//
//    // withus DB의 id로 jwt 생성
//    @GetMapping("/auth/jwt")
//    public ResponseEntity<?> getJwt() {
//
//    }
}

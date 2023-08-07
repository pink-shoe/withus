package com.proj.withus.controller;

import io.swagger.annotations.*;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import com.proj.withus.repository.MemberRepository;
import com.proj.withus.service.SocialService;
import com.proj.withus.util.JwtUtil;

import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.web.client.RestTemplate;

@Api(tags = "소셜 로그인 API", description = "소셜 로그인 기능을 처리하는 API (SocialController)")
@RestController
@Slf4j
@RequiredArgsConstructor
@RequestMapping(produces = MediaType.APPLICATION_JSON_VALUE)
@ApiResponses({
        @ApiResponse(code = 200, message = "로그인 성공"),
        @ApiResponse(code = 400, message = "Bad Request"),
        @ApiResponse(code = 401, message = "토큰 만료"),
})
public class SocialController {

    private final SocialService socialService;
    private final MemberRepository memberRepository;

    private final JwtUtil jwtUtil;

//    @GetMapping("/")
//    public String index() {
//        return "<h1>index page</h1>";
//    }

    @ApiOperation(value = "소셜 로그인", notes = "인가 코드, 로그인 타입으로 소셜 로그인을 진행한다.")
    @ResponseBody
    @GetMapping("/api/oauth/{login_type}") // pathvariable로 애초에 loginType 받고, 이걸로 jwt 만들기
    public ResponseEntity<?> callback(
            @ApiParam(value = "소셜 서버에서 전달 받은 인가 코드 (Authorization code)", required = true) @RequestParam String code,
            @ApiParam(value = "소셜 이름 (kakao 혹은 google)", required = true) @PathVariable(name = "login_type") String loginType) {

        // 소셜 서버에서 전달 받은 인가 코드 (Authorization code)
        // 소셜 이름 (kakao 혹은 google)
        String accessToken = "";
        Long memberId = -1L;
        String jwtToken = "";

        if (loginType.equals("kakao")) {
            log.info("code: ", code);
            // 코드 to 액세스 토큰
            accessToken = socialService.getKakaoAccessToken(code);
            System.out.println("access token: " + accessToken);

            // 액세스 토큰 to 회원 정보
            memberId = socialService.getKakaoMemberInfo(accessToken);
            if (memberId == -1L) {
                return new ResponseEntity<String>("로그인에 실패했습니다.", HttpStatus.BAD_REQUEST);
            }
            System.out.println("kakaoMemberInfo: " + memberId);

            // 회원 정보 to JWT
            jwtToken = jwtUtil.generateJwtToken(memberId, loginType);
            System.out.println("jwtToken: " + jwtToken);

        } else if (loginType.equals("google")) {
            accessToken = socialService.getGoogleAccessToken(code);
            memberId = socialService.getGoogleMemberInfo(accessToken);
            if (memberId == -1L) {
                return new ResponseEntity<String>("로그인에 실패했습니다.", HttpStatus.BAD_REQUEST);
            }
            jwtToken = jwtUtil.generateJwtToken(memberId, loginType);
        }
        System.out.println("memberId:" + memberId);
        return new ResponseEntity<>(jwtToken, HttpStatus.OK);
    }

//    @ApiOperation(value = "소셜 로그아웃", notes = "소셜 로그아웃을 진행한다.")
//    @ResponseBody
//    @GetMapping("/api/oauth/logout/{login_type}")
//    public ResponseEntity<?> logout(@ApiParam(value = "소셜 이름 (kakao 혹은 google)", required = true) @PathVariable(name = "login_type") String loginType) {
//
//        if (loginType.equals("kakao")) {
//            RestTemplate restTemplate = new RestTemplate();
////            HttpHeaders headers = new HttpHeaders();
//
//            String kakaoLogoutEndpoint = "https://kauth.kakao.com/oauth/logout" +
//                    "?client_id=" + "7ea82d8a610fe51bcf3eca267069b264" +
//                    "&logout_redirect_uri=" + "http://localhost:9001/api/oauth/kakao";
//
//            String response = restTemplate.getForObject(kakaoLogoutEndpoint, String.class);
//            return new ResponseEntity<String>(response, HttpStatus.OK);
//        }
//        return new ResponseEntity<String>("임시 response", HttpStatus.OK);
//    }

    @ApiOperation(value = "소셜 로그아웃", notes = "소셜 로그아웃을 진행한다.")
    @ResponseBody
    @GetMapping("/api/oauth/logout/{login_type}")
    public ResponseEntity<?> logout(@ApiParam(value = "소셜 이름 (kakao 혹은 google)", required = true) @PathVariable(name = "login_type") String loginType) {
        return ResponseEntity.ok("hi");
    }

//    // authorization code 확인용
//    @ResponseBody
//    @GetMapping("/kakao/code")
//    public ResponseEntity<String> kakaoCode(@RequestParam String code) {
//        System.out.println("code: " + code);
//        return new ResponseEntity<>(code, HttpStatus.OK);
//    }

//    // 프론트가 구현 성공하면 다시 살릴 것 -> pathvariable로 통합
//    @ResponseBody
//    @GetMapping("/auth/google/callback")
//    public ResponseEntity<?> googleLogin(@RequestParam(name = "code") String code) {
//        String accessToken = socialService.getGoogleAccessToken(code);
//        Long memberId = socialService.getGoogleMemberInfo(accessToken);
//
//        return ResponseEntity.ok(memberId);
//    }

    // 프론트가 가진 정보로 withus DB에 회원 등록
//    @PostMapping("/auth/googlemember")
//    public ResponseEntity<String> saveGoogleMember(@RequestBody SocialMemberInfo socialMemberInfo) {
//        Member member = new Member();
//        member.setNickname(socialMemberInfo.getNickname());
//        member.setEmail(socialMemberInfo.getEmail());
//        memberRepository.save(member);
//
//        return ResponseEntity.ok("Success");
//    }

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

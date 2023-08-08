package com.proj.withus.controller;

import com.proj.withus.domain.dto.SocialMemberInfo;
import io.swagger.annotations.*;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.*;
import org.springframework.web.bind.annotation.*;

import com.proj.withus.repository.MemberRepository;
import com.proj.withus.service.SocialService;
import com.proj.withus.util.JwtUtil;

import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.web.client.RestTemplate;

import javax.servlet.http.HttpServletRequest;
import java.util.HashMap;
import java.util.Map;

@Api(tags = "소셜 로그인/로그아웃 API", description = "소셜 로그인 기능을 처리하는 API (SocialController)")
@RestController
@Slf4j
@RequiredArgsConstructor
@RequestMapping(produces = MediaType.APPLICATION_JSON_VALUE)
@ApiResponses({
        @ApiResponse(code = 200, message = "로그인 성공", response = String.class, examples = @Example(value = @ExampleProperty(mediaType = "application/json", value = "jwtToken"))),
        @ApiResponse(code = 400, message = "Bad Request", examples = @Example(value = @ExampleProperty(mediaType = "application/json", value = "{ \n errorCode: 400, \n message: bad request \n}"))),
        @ApiResponse(code = 401, message = "토큰 만료", examples = @Example(value = @ExampleProperty(mediaType = "application/json", value = "{ \n errorCode: 401, \n message: token expired \n}"))),
})
public class SocialController {

    private final SocialService socialService;
    private final MemberRepository memberRepository;

    private final JwtUtil jwtUtil;

    @Autowired
    private RestTemplate restTemplate;

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

        Map<String, String> response = new HashMap<>();

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
        response.put("accessToken", accessToken);
        response.put("jwtToken", jwtToken);
        return new ResponseEntity<>(response, HttpStatus.OK);
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
    @PostMapping("/api/logout") // 로그인한 상태에서는 loginType을 받아야 함. => jwt token으로 확인하기
    public ResponseEntity<?> logout(HttpServletRequest request,
                                    @RequestBody String accessToken) {

        String token = (String) request.getAttribute("token");
        System.out.println("token in logout: " +  token);
        String endPoint = "";
        try {
            SocialMemberInfo memberInfo = jwtUtil.extractMemberId(token); // guest 포함 후에는 naming social 붙지 않는 게 맞지만, 일단 기존 코드와 동일하게 처리
            Long id = memberInfo.getId();
            String loginType = memberInfo.getLoginType();
            System.out.println("loginType in logout logic: " + loginType);

            if (loginType.equals("kakao")) {
                System.out.println("kakao로 조건 들어왔냐 !");
                /*
                카카오 로그이웃일 경우,
                1. 카카오 서버에 로그아웃 api 요청
                2. 우리 jwt 만료 or 기간 끝내기 ?
                 */
                HttpHeaders headers = new HttpHeaders();
                headers.setContentType(MediaType.APPLICATION_FORM_URLENCODED);
                headers.set("Authorization", "Bearer " + accessToken);
                System.out.println("accessToken in logout: " + accessToken);
                HttpEntity<String> entity = new HttpEntity<>(headers);
                return restTemplate.exchange("https://kapi.kakao.com/v1/user/logout", HttpMethod.POST, entity, String.class);
            } else if (loginType.equals("google")) {
                // 일단 처리 안함
            } else if (loginType.equals("guest")) {

            }
        } catch (Exception e) {
            e.printStackTrace();
            return new ResponseEntity<String>("오류 메시지 미정", HttpStatus.UNAUTHORIZED);
        }
        return new ResponseEntity<String>("오류 메시지 미정", HttpStatus.UNAUTHORIZED);
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

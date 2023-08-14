package com.proj.withus.controller;

import io.swagger.annotations.*;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import com.proj.withus.domain.Album;
import com.proj.withus.domain.Member;
import com.proj.withus.domain.dto.SocialMemberInfo;
import com.proj.withus.service.AlbumService;
import com.proj.withus.service.MemberService;
import com.proj.withus.util.JwtUtil;

import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;

import javax.servlet.http.HttpServletRequest;

@Api(tags = "회원 API", description = "회원 관리 기능을 처리하는 API (MemberController)")
@RestController
@Slf4j
@RequiredArgsConstructor
@RequestMapping(value = "/api/members", produces = MediaType.APPLICATION_JSON_VALUE)
@ApiResponses({
        @ApiResponse(code = 401, message = "토큰 만료", examples = @Example(value = @ExampleProperty(mediaType = "application/json", value = "{ \n errorCode: 401, \n message: token expired \n}"))),
        @ApiResponse(code = 403, message = "권한 부족", examples = @Example(value = @ExampleProperty(mediaType = "application/json", value = "{ \n errorCode: 403, \n message: auth \n}")))
})
public class MemberController {

    private final MemberService memberService;
    private final AlbumService albumService;
    private final JwtUtil jwtUtil;


    @ApiOperation(value = "회원 정보 조회", notes = "마이페이지에서 회원 정보를 조회한다.")
    @ApiResponses(value = {
            @ApiResponse(code = 200, message = "조회 성공", response = Member.class),
            @ApiResponse(code = 400, message = "회원이 존재하지 않음", examples = @Example(value = @ExampleProperty(mediaType = "application/json", value = "{ \n errorCode: 400, \n message: fail \n}")))
    })
    @GetMapping
    private ResponseEntity<?> getMemberInfo(HttpServletRequest request) {
        Long memberId = (Long) request.getAttribute("memberId");
        Member memberInfo = memberService.getMemberInfo(memberId);

        if (memberInfo == null) {
            return new ResponseEntity<>("회원 정보 찾지 못함", HttpStatus.BAD_REQUEST);
        }
        return ResponseEntity.ok().body(memberInfo);
    }

    @ApiOperation(value = "회원 정보 수정", notes = "회원의 닉네임을 입력받고 수정한다. (json이 아닌 문자열 입력)")
    @ApiResponses(value = {
            @ApiResponse(code = 200, message = "수정 성공", response = Member.class),
            @ApiResponse(code = 400, message = "회원이 존재하지 않음", examples = @Example(value = @ExampleProperty(mediaType = "application/json", value = "{ \n errorCode: 400, \n message: fail \n}")))
    })
//    @ApiImplicitParams(
//            value = {
//                    @ApiImplicitParam(name = "nickname", value = "수정할 닉네임", required = true, dataTypeClass = String.class, paramType = "body")
//            }
//    )
    @PutMapping
    private ResponseEntity<?> updateMemberInfo(
            HttpServletRequest request,
            @ApiParam(value = "변경할 닉네임", required = true)
            @RequestParam String nickname) {

        Long memberId = (Long) request.getAttribute("memberId");
        Member updatedInfo = memberService.updateMember(memberId, nickname);

        if (updatedInfo == null) {
            return new ResponseEntity<>("회원 정보 찾을 수 없음", HttpStatus.BAD_REQUEST);
        }
        if (!updatedInfo.getNickname().equals(nickname)) {
            return new ResponseEntity<>("닉네임을 수정하지 못함", HttpStatus.BAD_REQUEST);
        }
        return ResponseEntity.ok().body(updatedInfo);
    }

    @ApiOperation(value = "회원 탈퇴", notes = "회원 정보를 삭제한다.")
    @ApiResponses(value = {
            @ApiResponse(code = 200, message = "탈퇴 성공", examples = @Example(value = @ExampleProperty(mediaType = "application/json", value = "ok"))),
            @ApiResponse(code = 400, message = "탈퇴 실패", examples = @Example(value = @ExampleProperty(mediaType = "application/json", value = "{ \n errorCode: 400, \n message: fail \n}")))
    })
    @DeleteMapping
    private ResponseEntity deleteMemberInfo(HttpServletRequest request) {
        Long memberId = (Long) request.getAttribute("memberId");

        albumService.deleteAlbum(memberId);

        Member deleted = memberService.deleteMember(memberId);
        if (deleted != null) {
            return new ResponseEntity<>("회원 탈퇴 안됨", HttpStatus.BAD_REQUEST);
        }

        return new ResponseEntity(HttpStatus.OK);
    }
}

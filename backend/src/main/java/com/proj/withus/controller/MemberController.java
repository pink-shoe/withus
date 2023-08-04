package com.proj.withus.controller;

import io.swagger.annotations.*;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PatchMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestHeader;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.proj.withus.domain.Album;
import com.proj.withus.domain.Member;
import com.proj.withus.domain.dto.SocialMemberInfo;
import com.proj.withus.service.AlbumService;
import com.proj.withus.service.MemberService;
import com.proj.withus.util.JwtUtil;

import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;

import javax.servlet.http.HttpServletRequest;

@Api(tags = "마이페이지 api")
@RestController
@Slf4j
@RequiredArgsConstructor
@RequestMapping(value = "/api/members", produces = MediaType.APPLICATION_JSON_VALUE)
@ApiResponses({
        @ApiResponse(code = 401, message = "토큰 만료"),
        @ApiResponse(code = 403, message = "권한 부족")
})
public class MemberController {

    private final MemberService memberService;
    private final AlbumService albumService;
    private final JwtUtil jwtUtil;


    @ApiOperation(value = "유저 정보 조회", notes = "마이페이지에서 유저 정보를 조회한다.")
    @ApiResponses(value = {
            @ApiResponse(code = 200, message = "조회 성공"),
            @ApiResponse(code = 400, message = "유저가 존재하지 않음")
    })
    @GetMapping
    private ResponseEntity<?> getMemberInfo(HttpServletRequest request) {
        Long memberId = (Long) request.getAttribute("memberId");
        Member memberInfo = memberService.getMemberInfo(memberId);

        if (memberInfo == null) {
            return new ResponseEntity<>("유저 정보 찾지 못함", HttpStatus.BAD_REQUEST);
        }
        return ResponseEntity.ok().body(memberInfo);
    }

    @ApiOperation(value = "유저 정보 수정", notes = "유저의 닉네임을 수정한다.")
    @ApiResponses(value = {
            @ApiResponse(code = 200, message = "수정 성공"),
            @ApiResponse(code = 400, message = "유저가 존재하지 않음")
    })
    @PatchMapping
    private ResponseEntity<?> updateMemberInfo(
            HttpServletRequest request,
            @RequestBody String nickname) {

        Long memberId = (Long) request.getAttribute("memberId");
        Member updatedInfo = memberService.updateMember(memberId, nickname);

        if (updatedInfo == null) {
            return new ResponseEntity<>("유저 정보 찾을 수 없음", HttpStatus.BAD_REQUEST);
        }
        if (!updatedInfo.getNickname().equals(nickname)) {
            return new ResponseEntity<>("닉네임을 수정하지 못함", HttpStatus.BAD_REQUEST);
        }
        return ResponseEntity.ok().body(updatedInfo);
    }

    @ApiOperation(value = "유저 탈퇴", notes = "유저 정보를 삭제한다.")
    @ApiResponses(value = {
            @ApiResponse(code = 200, message = "탈퇴 성공"),
            @ApiResponse(code = 400, message = "탈퇴 실패")
    })
    @DeleteMapping
    private ResponseEntity deleteMemberInfo(HttpServletRequest request) {
        Long memberId = (Long) request.getAttribute("memberId");

        Album deletedAlbum = albumService.deleteAlbum(memberId);
        if (deletedAlbum != null) {
            return new ResponseEntity("앨범 삭제 안됨", HttpStatus.BAD_REQUEST);
        }

        Member deleted = memberService.deleteMember(memberId);
        if (deleted != null) {
            return new ResponseEntity<>("유저 탈퇴 안됨", HttpStatus.BAD_REQUEST);
        }

        return new ResponseEntity(HttpStatus.OK);
    }
}

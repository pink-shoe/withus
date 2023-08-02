package com.proj.withus.controller;

import org.springframework.http.HttpStatus;
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

import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.responses.ApiResponse;
import io.swagger.v3.oas.annotations.responses.ApiResponses;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;

@RestController
@Slf4j
@RequiredArgsConstructor
@RequestMapping("/api/members")
public class MemberController {

    private final MemberService memberService;
    private final AlbumService albumService;
    private final JwtUtil jwtUtil;

    @Operation(summary = "test hello", description = "hello api example")
    @ApiResponses({
        @ApiResponse(responseCode = "200", description = "OK !!"),
        @ApiResponse(responseCode = "400", description = "BAD REQUEST !!"),
        @ApiResponse(responseCode = "404", description = "NOT FOUND !!"),
        @ApiResponse(responseCode = "500", description = "INTERNAL SERVER ERROR !!")
    })
    @GetMapping
    private ResponseEntity<?> getMemberInfo(@RequestHeader("Authorization") String jwtToken) {
        SocialMemberInfo socialMemberInfo = jwtUtil.extractMemberId(jwtToken);
        Long memberId = socialMemberInfo.getId();
        Member memberInfo = memberService.getMemberInfo(memberId);

        if (memberInfo == null) {
            return new ResponseEntity<>("유저 정보 찾지 못함", HttpStatus.BAD_REQUEST);
        }
        return ResponseEntity.ok().body(memberInfo);
    }

    @PatchMapping
    private ResponseEntity<?> updateMemberInfo(
            @RequestHeader("Authorization") String jwtToken,
            @RequestBody String nickname) {

        SocialMemberInfo socialMemberInfo = jwtUtil.extractMemberId(jwtToken);
        Long memberId = socialMemberInfo.getId();
        Member updatedInfo = memberService.updateMember(memberId, nickname);

        if (updatedInfo == null) {
            return new ResponseEntity<>("유저 정보 찾을 수 없음", HttpStatus.BAD_REQUEST);
        }
        if (!updatedInfo.getNickname().equals(nickname)) {
            return new ResponseEntity<>("닉네임을 수정하지 못함", HttpStatus.BAD_REQUEST);
        }
        return ResponseEntity.ok().body(updatedInfo);
    }

    @DeleteMapping
    private ResponseEntity deleteMemberInfo(@RequestHeader("Authorization") String jwtToken) {
        SocialMemberInfo socialMemberInfo = jwtUtil.extractMemberId(jwtToken);
        Long memberId = socialMemberInfo.getId();

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

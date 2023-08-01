package com.proj.withus.controller;

import com.proj.withus.domain.Album;
import com.proj.withus.service.AlbumServiceImpl;
import com.proj.withus.util.JwtUtil;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PatchMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestHeader;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.proj.withus.domain.Member;
import com.proj.withus.service.MemberServiceImpl;

import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;

@RestController
@Slf4j
@RequiredArgsConstructor
@RequestMapping("/api/members")
public class MemberController {

    @Autowired
    private MemberServiceImpl memberServiceImpl;

    @Autowired
    private AlbumServiceImpl albumServiceImpl;

    private JwtUtil jwtUtil = new JwtUtil();

    @GetMapping
    private ResponseEntity<?> getMemberInfo(@RequestHeader("Authorization") String jwtToken) {
        Long memberId = jwtUtil.extractMemberId(jwtToken);
        Member memberInfo = memberServiceImpl.getMemberInfo(memberId);

        if (memberInfo == null) {
            return new ResponseEntity<>("유저 정보 찾지 못함", HttpStatus.BAD_REQUEST);
        }
        return ResponseEntity.ok().body(memberInfo);
    }

    @PatchMapping
    private ResponseEntity<?> updateMemberInfo(@RequestHeader("Authorization") String jwtToken, @RequestBody String nickname) {
        Long memberId = jwtUtil.extractMemberId(jwtToken);
        Member updatedInfo = memberServiceImpl.updateMember(memberId, nickname);

        if (updatedInfo == null) {
            return new ResponseEntity<>("유저 정보 찾을 수 없음", HttpStatus.BAD_REQUEST);
        }
        return ResponseEntity.ok().body(updatedInfo);
    }

    @DeleteMapping
    private ResponseEntity deleteMemberInfo(@RequestHeader("Authorization") String jwtToken) {
        Long memberId = jwtUtil.extractMemberId(jwtToken);

        Album deletedAlbum = albumServiceImpl.deleteAlbum(memberId);
        if (deletedAlbum != null) {
            return new ResponseEntity("앨범 삭제 안됨", HttpStatus.BAD_REQUEST);
        }

        Member deleted = memberServiceImpl.deleteMember(memberId);
        if (deleted != null) {
            return new ResponseEntity<>("유저 탈퇴 안됨", HttpStatus.BAD_REQUEST);
        }

        return new ResponseEntity(HttpStatus.OK);
    }
}

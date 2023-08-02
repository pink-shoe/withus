package com.proj.withus.controller;

import com.proj.withus.domain.Album;
import com.proj.withus.domain.Member;
import com.proj.withus.service.AlbumService;
import com.proj.withus.service.MemberService;
import com.proj.withus.util.JwtUtil;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@Slf4j
@RequiredArgsConstructor
@RequestMapping("/api/members")
public class MemberController {

    private final MemberService memberService;
    private final AlbumService albumService;
    private final JwtUtil jwtUtil;

    @GetMapping
    private ResponseEntity<?> getMemberInfo(@RequestHeader("Authorization") String jwtToken) {
        Long memberId = jwtUtil.extractMemberId(jwtToken);
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

        Long memberId = jwtUtil.extractMemberId(jwtToken);
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
        Long memberId = jwtUtil.extractMemberId(jwtToken);

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

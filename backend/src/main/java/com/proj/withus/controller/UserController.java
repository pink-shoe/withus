package com.proj.withus.controller;

import com.proj.withus.domain.Member;
import com.proj.withus.service.UserService;
import io.jsonwebtoken.Jwts;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.HashMap;
import java.util.Map;

@RestController
@Slf4j
@RequiredArgsConstructor
@RequestMapping("/api/members")
public class UserController {

    @Autowired
    private UserService userService;

    @GetMapping
    private ResponseEntity<Member> getMemberInfo(@RequestHeader(name = "token") String token) {
        // token으로 사용자 정보 얻기
        Long id = 1L;
        Member memberInfo = userService.getMemberInfo(id);
        return ResponseEntity.ok().body(memberInfo);
    }

    @PatchMapping
    private ResponseEntity<Member> updateMemberInfo(@RequestHeader String token, @RequestBody String nickname) {
        // token으로 사용자 정보 얻기..?
        Long id = 1L;
        Member updatedInfo = userService.updateMember(id, nickname);
        return ResponseEntity.ok().body(updatedInfo);
    }

    @DeleteMapping
    private ResponseEntity deleteMemberInfo(@RequestHeader String token) {
        // token으로 ~
        Long id = 1L;
        userService.deleteMember(id);
        return new ResponseEntity(HttpStatus.OK);
    }
}

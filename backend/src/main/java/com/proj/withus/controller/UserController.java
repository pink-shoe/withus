package com.proj.withus.controller;

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
import com.proj.withus.service.UserService;

import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;

@RestController
@Slf4j
@RequiredArgsConstructor
@RequestMapping("/api/members")
public class UserController {

    @Autowired
    private UserService userService;

    @GetMapping
    private ResponseEntity<Member> getMemberInfo(@RequestHeader("Authorization") String token) {
        // jwt token -> access token, id
        Long id = 2L;
        Member memberInfo = userService.getMemberInfo(id);

        if (memberInfo == null) {
            return ResponseEntity.badRequest().body(null);
        }
        return ResponseEntity.ok().body(memberInfo);
    }

    @PatchMapping
    private ResponseEntity<Member> updateMemberInfo(@RequestHeader("Authorization") String token, @RequestBody() String nickname) {
        // jwt token -> access token, id
        Long id = 2L;

        Member updatedInfo = userService.updateMember(id, nickname);

        if (updatedInfo == null) {
            return ResponseEntity.badRequest().build();
        }
        return ResponseEntity.ok().body(updatedInfo);
    }

    @DeleteMapping
    private ResponseEntity deleteMemberInfo(@RequestHeader("Authorization") String token) {
        // jwt token -> access token, id
        Long id = 2L;
        Member deleted = userService.deleteMember(id);

        if (deleted != null) {
            return ResponseEntity.badRequest().build();
        }
        return new ResponseEntity(HttpStatus.OK);
    }
}

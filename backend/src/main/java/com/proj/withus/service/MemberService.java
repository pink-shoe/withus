package com.proj.withus.service;

import com.proj.withus.domain.Member;
import com.proj.withus.domain.dto.GoogleUserInfo;
import com.proj.withus.repository.MemberRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;

@Service
public class MemberService {

    @Autowired
    private MemberRepository memberRepository;

    public void saveGoogle(GoogleUserInfo userInfo, String accessToken) {
        Member exist = memberRepository.findByEmail(userInfo.getEmail());

        if (exist == null) {
            Member member = new Member();
            member.setId(1L);
            member.setEmail(userInfo.getEmail());
            member.setNickname(userInfo.getName());
            member.setPassword(null);
            member.setLoginType("google");
            member.setCreatedAt(LocalDateTime.now().toString());
            member.setDeletedAt(null);
            memberRepository.save(member);
        }

    }
}

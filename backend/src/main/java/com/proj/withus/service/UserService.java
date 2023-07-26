package com.proj.withus.service;

import com.proj.withus.domain.Member;
import com.proj.withus.repository.MemberRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.Optional;

@Service
public class UserService {

    @Autowired
    private MemberRepository memberRepository;

    public Member getMemberInfo(Long id) {
        return memberRepository.findById(id).get();
    }

    public Member updateMember(Long id, String nickname) {
        // nickname 유효성 검사
        Member find = getMemberInfo(id);
        // 찾은 유저가 없으면 예외처리

        find.setNickname(nickname);

        memberRepository.save(find);

        return find;
    }

    public void deleteMember(Long id) {
        memberRepository.deleteById(id);
    }
}

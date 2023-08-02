package com.proj.withus.service;

import com.proj.withus.domain.Member;
import com.proj.withus.repository.MemberRepository;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import javax.transaction.Transactional;

@Service
@RequiredArgsConstructor
@Slf4j
@Transactional
public class MemberServiceImpl implements MemberService {

    private final MemberRepository memberRepository;

    public Member getMemberInfo(Long id) {
        return memberRepository.findById(id).orElse(null);
    }

    public Member updateMember(Long id, String nickname) {
        // nickname 유효성 검사

        Member find = getMemberInfo(id);
        if (find == null) {
            return null;
        }

        find.setNickname(nickname);
        return memberRepository.save(find);
    }

    public Member deleteMember(Long id) {
        memberRepository.deleteById(id);
        return memberRepository.findById(id).orElse(null);
    }
}

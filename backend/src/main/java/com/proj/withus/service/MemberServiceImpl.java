package com.proj.withus.service;

import com.proj.withus.domain.Member;
import com.proj.withus.exception.CustomException;
import com.proj.withus.exception.ErrorCode;
import com.proj.withus.repository.MemberRepository;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;

import javax.persistence.EntityManager;
import javax.transaction.Transactional;
import java.util.Optional;

@Service
@RequiredArgsConstructor
@Slf4j
@Transactional
public class MemberServiceImpl implements MemberService {

    private final MemberRepository memberRepository;
    private final EntityManager entityManager;

    public Member getMemberInfo(Long id) {
        return memberRepository.findById(id)
                .orElseThrow(() -> new CustomException(ErrorCode.MEMBER_NOT_FOUND));
    }

    public Member createMember(Member member) {
        if (member.getLoginType().equals("guest")) {
            return memberRepository.save(member);
        }
        
        memberRepository.findByEmail(member.getEmail())
                .ifPresent(m -> {
                    throw new CustomException(ErrorCode.DUPLICATE_MEMBER);
                });
        return memberRepository.save(member);
    }

    public Optional<Member> updateMember(Long id, String nickname) {
        memberRepository.findById(id)
                .orElseThrow(() -> new CustomException(ErrorCode.MEMBER_NOT_FOUND));
        entityManager.clear(); // 1차 캐시 지우기
        memberRepository.updateNickname(id, nickname);

        return memberRepository.findById(id);
    }

    public void deleteMember(Long id) {
        memberRepository.findById(id)
                        .orElseThrow(() -> new CustomException(ErrorCode.MEMBER_NOT_FOUND));
        memberRepository.deleteById(id);
    }
}

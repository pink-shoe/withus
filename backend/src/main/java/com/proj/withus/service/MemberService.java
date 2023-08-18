package com.proj.withus.service;

import com.proj.withus.domain.Member;

import java.util.Optional;

public interface MemberService {

    public Member getMemberInfo(Long id);
    public Member createMember(Member member);
    public Optional<Member> updateMember(Long id, String nickname);
    public void deleteMember(Long id);

}

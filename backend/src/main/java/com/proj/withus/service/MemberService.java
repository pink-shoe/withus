package com.proj.withus.service;

import com.proj.withus.domain.Member;

public interface MemberService {

    public Member getMemberInfo(Long id);
    public Member updateMember(Long id, String nickname);
    public Member deleteMember(Long id);

}

package com.proj.withus.service;

import com.proj.withus.domain.Member;
import com.proj.withus.domain.dto.SocialMemberInfo;

public interface SocialService {

    // kakao
    public String getKakaoAccessToken(String code);
    public Long getKakaoMemberInfo(String token);

    // google
    public String getGoogleAccessToken(String code);
    public String getGoogleMemberInfo(String token);

    // 공통
    public void joinMember(Member member);
    public Long getMemberIdForJwt(String email);
}

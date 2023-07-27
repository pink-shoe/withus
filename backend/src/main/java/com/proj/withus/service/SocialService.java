package com.proj.withus.service;

import com.proj.withus.domain.dto.SocialMemberInfo;

public interface SocialService {

    // kakao
    public String getKakaoAccessToken(String code);
    public SocialMemberInfo getKakaoMemberInfo(String token);

    // google
    public String getGoogleAccessToken(String code);
    public String getGoogleMemberInfo(String token);

    // 공통
    public Long getMemberIdForJwt(String email);

}

package com.proj.withus.domain.dto;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
// kakao와 google 통합한 ver.
public class SocialMemberInfo {

    // 어떤 annotation 사용하면 private 선언 안해도 자동으로 등록해줬는데 뭐였지
    private Long id;
    private String email;
    private String nickname;
    private String loginType;
//    private String profile;
}

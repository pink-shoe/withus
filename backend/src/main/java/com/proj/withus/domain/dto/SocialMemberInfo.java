package com.proj.withus.domain.dto;

import io.swagger.annotations.ApiModel;
import io.swagger.annotations.ApiModelProperty;
import lombok.Builder;
import lombok.Data;

@Data
@Builder
@ApiModel(description = "소셜 유저 정보")
// kakao와 google 통합한 ver.
public class SocialMemberInfo {

    // 어떤 annotation 사용하면 private 선언 안해도 자동으로 등록해줬는데 뭐였지
    @ApiModelProperty(value = "유저 id", required = true, example = "1")
    private Long id;

    @ApiModelProperty(value = "이메일", required = true, example = "user1@google.com")
    private String email;

    @ApiModelProperty(value = "닉네임", required = true, example = "user1")
    private String nickname;

    @ApiModelProperty(value = "로그인 타입", required = true, example = "google")
    private String loginType;
//    private String profile;
}

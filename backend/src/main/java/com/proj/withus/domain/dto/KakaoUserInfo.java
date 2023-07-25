package com.proj.withus.domain.dto;

import lombok.*;

@Data
@NoArgsConstructor
@AllArgsConstructor
@ToString
@Builder
@Getter
public class KakaoUserInfo {

    private Long id;
    private String email;
    private String nickname;
    private String loginType;
//    private String profileImgUrl;
//    private String thumnailImgUrl;

//    private String birthday;
//    private boolean hasBirthDay;
//    private String gender;
//    private boolean hasGender;


}
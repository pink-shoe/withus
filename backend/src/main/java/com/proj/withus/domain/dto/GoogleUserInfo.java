package com.proj.withus.domain.dto;

import lombok.*;

@Data
@NoArgsConstructor
@AllArgsConstructor
@ToString
@Builder
@Getter
public class GoogleUserInfo {

    private Long id;
    private String name;
    private String email;
    private String profile;
}

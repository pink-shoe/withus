package com.proj.withus.domain;

import lombok.Getter;
import lombok.Setter;

import javax.persistence.*;
import java.util.ArrayList;
import java.util.List;

@Entity
@Getter
@Setter
public class Member {

    @Id
    @GeneratedValue
    @Column(name = "member_id")
    private Long id;

    private String email;

    private String nickname;

    private String password;

    private String loginType;

    private String token;

    private String accessToken;

    private String createdAt;

    private String deletedAt;

    @OneToMany(mappedBy = "member")
    private List<Album> albums = new ArrayList<>();

    @OneToMany(mappedBy = "member")
    private List<Room> rooms = new ArrayList<>();
}

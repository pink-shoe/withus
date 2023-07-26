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

    private String createdAt;

    private String deletedAt;

    @OneToOne(mappedBy = "member")
    private Album album;

    @OneToMany(mappedBy = "member")
    private List<Room> rooms = new ArrayList<>();

    @OneToOne(mappedBy = "member")
    private Player player;
}

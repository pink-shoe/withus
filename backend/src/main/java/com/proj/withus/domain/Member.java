package com.proj.withus.domain;

import com.fasterxml.jackson.annotation.JsonIgnore;
import lombok.Getter;
import lombok.Setter;
import lombok.ToString;

import javax.persistence.*;
import java.util.ArrayList;
import java.util.List;

@Entity
@Getter
@Setter
@ToString
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

    @JsonIgnore
    @OneToOne(mappedBy = "member")
    private Album album;

    @JsonIgnore
    @OneToMany(mappedBy = "member")
    private List<Room> rooms = new ArrayList<>();

    @JsonIgnore
    @OneToOne(mappedBy = "member")
    private Player player;
}

package com.proj.withus.domain;

import com.fasterxml.jackson.annotation.JsonIgnore;
import com.fasterxml.jackson.annotation.JsonProperty;
import lombok.*;

import javax.persistence.*;
import java.util.ArrayList;
import java.util.List;

@Entity
@Getter
@Builder
@NoArgsConstructor
@AllArgsConstructor
@ToString
public class Member {

    @Id
    @GeneratedValue
    @Column(name = "member_id")
    @JsonProperty("memberId")
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

package com.proj.withus.domain;

import lombok.Getter;
import lombok.Setter;

import javax.persistence.*;

@Entity
@Getter @Setter
public class Album {

    @Id @GeneratedValue
    @Column(name = "album_id")
    private Long id;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "member_id")
    private Member member;

    private String imgUrl;

    private String saveAt;

}

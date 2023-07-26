package com.proj.withus.domain;

import lombok.Getter;
import lombok.Setter;

import javax.persistence.*;
import java.util.ArrayList;
import java.util.List;

@Entity
@Getter @Setter
public class Room {

    @Id @GeneratedValue
    @Column(name = "room_id")
    private Long id;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "member_id")
    private Member member;

    private int type;

    private int code;

    private int round;

    @OneToMany(mappedBy = "room")
    private List<GameResult> gameResults = new ArrayList<>();

    @OneToOne(mappedBy = "room")
    private Player player;

    @OneToOne(mappedBy = "room", fetch = FetchType.LAZY)
    @JoinColumn(name = "gamelog_id")
    private GameLog gameLog;

}

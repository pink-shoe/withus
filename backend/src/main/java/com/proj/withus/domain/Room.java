package com.proj.withus.domain;

import com.fasterxml.jackson.annotation.JsonIgnore;
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

    @JsonIgnore
    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "member_id")
    private Member member;

    private int type;

    private int code;

    private int round;

    @OneToMany(mappedBy = "room")
    private List<GameResult> gameResults = new ArrayList<>();

    @JsonIgnore
    @OneToMany(mappedBy = "room")
    private List<Player> players = new ArrayList<>();

    @OneToOne(mappedBy = "room", fetch = FetchType.LAZY)
    @JoinColumn(name = "gamelog_id")
    private GameLog gameLog;

}

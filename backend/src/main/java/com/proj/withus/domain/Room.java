package com.proj.withus.domain;

import lombok.Builder;
import lombok.Getter;
import lombok.Setter;
import org.hibernate.annotations.ColumnDefault;

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

    @ColumnDefault("5")
    private int round;

    @ColumnDefault("5")
    private int time;

    @OneToMany(mappedBy = "room")
    private List<GameResult> gameResults = new ArrayList<>();

    @OneToMany(mappedBy = "room")
    private List<Player> players = new ArrayList<>();

    @OneToOne(mappedBy = "room", fetch = FetchType.LAZY)
    @JoinColumn(name = "gamelog_id")
    private GameLog gameLog;

}

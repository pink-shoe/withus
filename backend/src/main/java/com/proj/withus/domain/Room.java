package com.proj.withus.domain;

import com.fasterxml.jackson.annotation.JsonIgnore;
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
    @JsonIgnore
    private Member member;

    private String type;

    private int code;

    @ColumnDefault("5")
    private int round;

    @ColumnDefault("5")
    private int time;

    @ColumnDefault("false")
    private boolean start;

    @OneToMany(mappedBy = "room")
    @JsonIgnore
    private List<GameResult> gameResults = new ArrayList<>();

    @OneToMany(mappedBy = "room")
    @JsonIgnore
    private List<Player> players = new ArrayList<>();

    @OneToOne(mappedBy = "room", fetch = FetchType.LAZY)
    @JoinColumn(name = "gamelog_id")
    @JsonIgnore
    private GameLog gameLog;

}

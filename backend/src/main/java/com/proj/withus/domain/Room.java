package com.proj.withus.domain;

import com.fasterxml.jackson.annotation.JsonIgnore;
import com.fasterxml.jackson.annotation.JsonProperty;
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
    @JsonProperty("roomId")
    private Long id;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "member_id")
    @JsonIgnore
    private Member member;

    @JsonProperty("roomType")
    private String type;

    @JsonProperty("roomCode")
    private int code;

    @JsonProperty("roomLink")
    private String link;

    @JsonProperty("roomRound")
    @ColumnDefault("5")
    private int round;

    @JsonProperty("roomTime")
    @ColumnDefault("5")
    private int time;

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

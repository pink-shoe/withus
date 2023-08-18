package com.proj.withus.domain;

import com.fasterxml.jackson.annotation.JsonIgnore;
import com.fasterxml.jackson.annotation.JsonProperty;
import lombok.Builder;
import lombok.Getter;
import lombok.Setter;
import org.hibernate.annotations.ColumnDefault;
import org.hibernate.annotations.OnDelete;
import org.hibernate.annotations.OnDeleteAction;

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
    @OnDelete(action = OnDeleteAction.NO_ACTION)
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

    @JsonProperty("currentRound")
    @Builder.Default
    private int currentRound = 1;

    @JsonProperty("roomTime")
//    @ColumnDefault("5")
    @Builder.Default
    private int time = 5;

//    @ColumnDefault("no")
    @Builder.Default
    private String start = "no";

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

    @OneToMany(mappedBy = "room")
    @JsonIgnore
    private List<Capture> urls = new ArrayList<>();

}

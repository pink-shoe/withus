package com.proj.withus.domain;

import com.fasterxml.jackson.annotation.JsonIgnore;
import com.fasterxml.jackson.annotation.JsonProperty;
import lombok.Getter;
import lombok.Setter;

import javax.persistence.*;

@Entity
@Getter @Setter
public class GameResult {

    @Id @GeneratedValue
    @Column(name = "game_result_id")
    @JsonProperty("gameResultId")
    private Long id;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "room_id")
    @JsonIgnore
    private Room room;

    private int round;

    private boolean isCorrect;

    private int prediction;

    private int answer;
}

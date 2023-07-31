package com.proj.withus.domain;

import lombok.Getter;
import lombok.Setter;

import javax.persistence.*;

import com.fasterxml.jackson.annotation.JsonIgnore;

@Entity
@Getter @Setter
public class GameResult {

    @Id @GeneratedValue
    @Column(name = "gameresult_id")
    private Long id;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "room_id")
    @JsonIgnore
    private Room room;

    private int round;

    private String captureUrl;

    private boolean isCorrect;

    private int correctRate;
}

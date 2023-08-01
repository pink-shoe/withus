package com.proj.withus.domain;

import com.fasterxml.jackson.annotation.JsonIgnore;
import lombok.Getter;
import lombok.Setter;

import javax.persistence.*;

@Entity
@Getter @Setter
public class GameResult {

    @Id @GeneratedValue
    @Column(name = "gameResult_id")
    private Long id;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "room_id")
    @JsonIgnore
    private Room room;

    private int round;

    private String captureUrl;

    private boolean isCorrect;

    private int correctRate;

    @ManyToOne(fetch = FetchType.EAGER)
    @JoinColumn(name = "shape_id")
    @JsonIgnore
    private Shape shape;

}

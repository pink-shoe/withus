package com.proj.withus.domain;

import lombok.Getter;
import lombok.Setter;

import javax.persistence.*;
import java.util.ArrayList;
import java.util.List;

@Entity
@Getter @Setter
public class GameLog {

    @Id @GeneratedValue
    @Column(name = "gamelog_id")
    private Long gameLogId;

    private String startDate;

    private String endDate;

    @OneToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "room_id")
    private Room room;

}

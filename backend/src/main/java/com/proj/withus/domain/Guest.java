package com.proj.withus.domain;

import lombok.Getter;
import lombok.Setter;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.Id;

@Entity
@Getter @Setter
public class Guest {

    @Id @GeneratedValue
    @Column(name = "guest_id")
    private String id;

    private String nickname;

}

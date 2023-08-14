package com.proj.withus.domain;

import lombok.*;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.Id;

@Entity
@Getter @Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class Guest {

    @Id @GeneratedValue
    @Column(name = "guest_id")
    private String id;

    private String nickname;

}

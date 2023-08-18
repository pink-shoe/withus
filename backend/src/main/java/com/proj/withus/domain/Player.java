package com.proj.withus.domain;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.FetchType;
import javax.persistence.GeneratedValue;
import javax.persistence.Id;
import javax.persistence.JoinColumn;
import javax.persistence.ManyToOne;
import javax.persistence.OneToOne;

import org.hibernate.annotations.ColumnDefault;
import org.hibernate.annotations.OnDelete;
import org.hibernate.annotations.OnDeleteAction;

import com.fasterxml.jackson.annotation.JsonIgnore;
import com.fasterxml.jackson.annotation.JsonProperty;

import lombok.Getter;
import lombok.Setter;

@Entity
@Getter @Setter
public class Player {

	@Id
	@Column(name = "player_id")
	@JsonProperty("playerId")
	private Long id;

	@OneToOne(fetch = FetchType.LAZY)
	@JoinColumn(name = "member_id")
	@JsonIgnore
	private Member member;

	@ManyToOne(fetch = FetchType.LAZY)
	@JoinColumn(name = "room_id")
	@OnDelete(action = OnDeleteAction.CASCADE)
	@JsonIgnore
	private Room room;

	@ColumnDefault("0")
	private int teamType;

	@ColumnDefault("false")
	private boolean ready;

	@ColumnDefault("0")
	private int vote;
}

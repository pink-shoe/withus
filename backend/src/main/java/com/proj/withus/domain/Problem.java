package com.proj.withus.domain;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.FetchType;
import javax.persistence.GeneratedValue;
import javax.persistence.Id;
import javax.persistence.JoinColumn;
import javax.persistence.ManyToOne;

import org.hibernate.annotations.OnDelete;
import org.hibernate.annotations.OnDeleteAction;

import com.fasterxml.jackson.annotation.JsonIgnore;
import com.fasterxml.jackson.annotation.JsonProperty;

import lombok.Getter;
import lombok.Setter;

@Entity
@Getter @Setter
public class Problem {

	@Id @GeneratedValue
	@Column(name = "problem_id")
	@JsonProperty("problemId")
	private Long id;

	private int round;

	private Long shapeId;

	@ManyToOne(fetch = FetchType.LAZY)
	@JoinColumn(name = "room_id")
	@OnDelete(action = OnDeleteAction.CASCADE)
	@JsonIgnore
	private Room room;
}

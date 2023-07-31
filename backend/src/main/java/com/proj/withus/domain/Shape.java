package com.proj.withus.domain;

import java.util.ArrayList;
import java.util.List;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.FetchType;
import javax.persistence.GeneratedValue;
import javax.persistence.Id;
import javax.persistence.JoinColumn;
import javax.persistence.ManyToOne;
import javax.persistence.OneToMany;

import com.fasterxml.jackson.annotation.JsonIgnore;

import lombok.Getter;
import lombok.Setter;

@Entity
@Getter @Setter
public class Shape {

	@Id @GeneratedValue
	@Column(name = "shape_id")
	private Long id;

	private String shapeUrl;

	private String shapeLabel;

	@OneToMany(mappedBy = "shape")
	private List<GameResult> gameResults = new ArrayList<>();
}

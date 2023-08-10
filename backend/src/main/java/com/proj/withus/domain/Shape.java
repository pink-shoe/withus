package com.proj.withus.domain;

import com.fasterxml.jackson.annotation.JsonIgnore;
import com.fasterxml.jackson.annotation.JsonProperty;

import lombok.Getter;
import lombok.Setter;

import javax.persistence.*;
import java.util.ArrayList;
import java.util.List;

@Entity
@Getter @Setter
public class Shape {

	@Id @GeneratedValue
	@Column(name = "shape_id")
	@JsonProperty("shapeId")
	private Long id;

	private String shapeUrl;

	private String shapeLabel;

	@OneToMany(mappedBy = "shape")
	@JsonIgnore
	private List<GameResult> gameResults = new ArrayList<>();

}

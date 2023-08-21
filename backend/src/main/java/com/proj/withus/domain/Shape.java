package com.proj.withus.domain;

import com.fasterxml.jackson.annotation.JsonProperty;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.Id;

@Entity
@Getter
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class Shape {

	@Id
	@Column(name = "shape_id")
	@JsonProperty("shapeId")
	private Long id;

	private String shapeUrl;

	private String shapeLabel;
}

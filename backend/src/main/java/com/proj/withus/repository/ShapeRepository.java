package com.proj.withus.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import com.proj.withus.domain.Shape;

public interface ShapeRepository extends JpaRepository<Shape, Long> {

	@Query(value = "select * from shape order by rand() limit :round", nativeQuery = true)
	List<Shape> findRandomShapes(@Param("round") int round);
}

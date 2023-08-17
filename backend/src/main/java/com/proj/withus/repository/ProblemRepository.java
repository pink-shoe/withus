package com.proj.withus.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;

import com.proj.withus.domain.Problem;

public interface ProblemRepository extends JpaRepository<Problem, Long> {

	List<Problem> findProblemsByRoomIdOrderByRoundAsc(Long roomId);
}

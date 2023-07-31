package com.proj.withus.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;

import com.proj.withus.domain.GameResult;

public interface GameResultRepository extends JpaRepository<GameResult, Long> {
	List<GameResult> findGameResultsByRoomId(Long roomId);
}

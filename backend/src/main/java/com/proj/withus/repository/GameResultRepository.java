package com.proj.withus.repository;

import org.springframework.data.jpa.repository.JpaRepository;

import com.proj.withus.domain.GameResult;

public interface GameResultRepository extends JpaRepository<GameResult, Long> {

}

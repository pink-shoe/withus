package com.proj.withus.repository;

import com.proj.withus.domain.Player;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface PlayerRepopsitory extends JpaRepository<Player, Long> {
}

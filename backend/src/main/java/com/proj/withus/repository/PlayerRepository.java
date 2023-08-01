package com.proj.withus.repository;

import com.proj.withus.domain.Player;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface PlayerRepository extends JpaRepository<Player, Long> {

    List<Player> findPlayersByRoomId(Long roomId);
}

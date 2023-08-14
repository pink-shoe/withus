package com.proj.withus.repository;

import com.proj.withus.domain.Capture;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.Optional;

@Repository
public interface CaptureRepository extends JpaRepository<Capture, Long> {

    Optional<Capture> findCaptureByRoomIdAndRound(Long roomId, int round);
}

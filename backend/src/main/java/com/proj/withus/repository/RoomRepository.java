package com.proj.withus.repository;

import com.proj.withus.domain.Room;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface RoomRepository extends JpaRepository<Room, Long> {
    Room findByMemberId(Long memberId);

    Room findRoomById(Long roomId);
}

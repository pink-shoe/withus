package com.proj.withus.repository;

import com.proj.withus.domain.Player;
import com.proj.withus.domain.Room;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface RoomRepository extends JpaRepository<Room, Long> {

    @Query("select r.member.id from Room r where r.id = :roomId")
    Long findHostIdByRoomId(@Param("roomId") Long roomId);


}

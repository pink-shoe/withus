package com.proj.withus.repository;

import com.proj.withus.domain.Player;
import com.proj.withus.domain.Room;
import com.proj.withus.domain.dto.ModifyRoomReq;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

@Repository
public interface RoomRepository extends JpaRepository<Room, Long> {
    Optional<Room> findByMemberId(Long memberId);

    Optional<Room> findRoomById(Long roomId);
  
    @Query("select r.member.id from Room r where r.id = :roomId")
    Long findHostIdByRoomId(@Param("roomId") Long roomId);

    @Query("update Room r set r.type = :#{#req.roomType}, r.round = :#{#req.roomRound} WHERE r.id = :roomId")
    int updateRoom(@Param("req") ModifyRoomReq req, @Param("roomId") Long roomId);

    @Modifying
    @Query("update Player p set p.ready = :readyStatus where p.id = :playerId")
    int updateReady(@Param("playerId") Long playerId, @Param("readyStatus") boolean readyStatus);
}

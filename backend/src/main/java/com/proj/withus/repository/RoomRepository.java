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

    Optional<Room> findRoomByCode(int roomCode);

    @Query("select r.member.id from Room r where r.id = :roomId")
    Long findHostIdByRoomId(@Param("roomId") Long roomId);

    @Modifying
    @Query("update Room r set r.type = :#{#req.roomType}, r.round = :#{#req.roomRound} WHERE r.id = :roomId")
    int updateRoom(@Param("req") ModifyRoomReq req, @Param("roomId") Long roomId);

    @Modifying
    @Query("update Room r set r.start = :startStatus where r.id = :roomId")
    int updateStart(@Param("roomId") Long roomId, @Param("startStatus") String startStatus);

    @Query("select r.start from Room r where r.id = :roomId")
    String findStartStatusByRoomId(@Param("roomId") Long roomId);

    @Query("update Player p set p.ready = false where p.room.id = :roomId")
    void resetReadyState(@Param("roomId") Long roomId);

    @Modifying
    @Query("update Room r set r.currentRound = :currentRound where r.id = :roomId")
    int updateCurrentRound(@Param("roomId") Long roomId, @Param("currentRound") int currentRound);
}

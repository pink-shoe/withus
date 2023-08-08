package com.proj.withus.repository;

import com.proj.withus.domain.Member;
import com.proj.withus.domain.Player;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.util.List;

public interface PlayerRepository extends JpaRepository<Player, Long> {

    List<Player> findPlayersByRoomId(Long roomId);

    @Query("select p from Player p where p.member.id = :memberId and p.room.id = :roomId")
    Player findPlayerByMemberIdAndRoomId(@Param("memberId") Long memberId, @Param("roomId") Long roomId);

    @Query("select p from Player p where p.room.id = :roomId")
    List<Player> findAllByRoomId(@Param("roomId") Long roomId);

    @Modifying
    @Query("delete from Player p where p.room.id = :roomId")
    int deleteByRoomId(@Param("roomId") Long roomId); // 명명 규칙 있나? deletePlayersByRoomId()을 추천 받음.

    @Modifying
    @Query("delete from Player p where p.member.id = :memberId ")
    int deletePlayerByMemberId(@Param("memberId") Long memberId);

    @Query("select p.member.id from Player p where p.room.id = :roomId and p.ready = true")
    List<Long> findReadyPlayersByRoomId(@Param("roomId") Long roomId);

    @Modifying
    // @Query("update Player p set p.ready = :readyStatus where p.id = :playerId")
    @Query(value = "update player set ready = not ready where player_id = 1", nativeQuery = true)
    int updateReady(@Param("playerId") Long playerId);

    @Query("select p.ready from Player p where p.id = :playerId")
    boolean findPlayerById(@Param("playerId") Long playerId);

}

package com.proj.withus.repository;

import com.proj.withus.domain.Member;
import com.proj.withus.domain.Player;
import com.proj.withus.domain.Room;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.util.List;
import java.util.Optional;

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

    @Modifying
    // @Query("update Player p set p.ready = :readyStatus where p.id = :playerId")
    @Query(value = "update player set ready = 1 where player_id = :playerId", nativeQuery = true)
    int setReady(@Param("playerId") Long playerId);

    @Modifying
    @Query(value = "update player set ready = 0 where player_id = :playerId", nativeQuery = true)
    int cancelReady(@Param("playerId") Long playerId);

    @Modifying
    @Query("update Player p set p.vote = p.vote + 1 where p.room.id = :roomId and p.id = :votedId")
    int updateVote(@Param("roomId") Long roomId, @Param("votedId") Long votedPlayerId);

    @Query("select p.ready from Player p where p.id = :playerId")
    boolean findPlayerById(@Param("playerId") Long playerId);

    @Query("select p.id from Player p where p.room.id = :roomId and p.ready = true and p.id != :hostId")
    List<Long> findReadyPlayersByRoomIdWithoutHost(@Param("roomId") Long roomId, @Param("hostId") Long hostId);

    @Query("select p.room from Player p where p.id = :playerId")
    Room findRoomIdByPlayerId(Long playerId);
}

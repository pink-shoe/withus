package com.proj.withus.repository;

import com.proj.withus.domain.Player;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface PlayerRepopsitory extends JpaRepository<Player, Long> {

    @Query("select p from Player p where p.room.id = :roomId")
    List<Player> findAllByRoomId(@Param("roomId") Long roomId);

    @Query("delete from Player p where p.room.id = :roomId")
    int deleteByRoomId(@Param("roomId") Long roomId); // 명명 규칙 있나? deletePlayersByRoomId()을 추천 받음.

    // @param 변수 이름 같으면 왠지 생략 가능할 듯 ?
}

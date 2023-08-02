package com.proj.withus.repository;

import java.util.Optional;

import com.proj.withus.domain.Album;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

@Repository
public interface AlbumRepository extends JpaRepository<Album, Long> {

    @Query("select a from Album a join fetch a.member m where m.id = :memberId")
    Optional<Album> findAlbumByMemberId(@Param("memberId") Long memberId);

    void deleteByMemberId(Long memberId);
}

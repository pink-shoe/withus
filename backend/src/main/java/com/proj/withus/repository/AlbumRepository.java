package com.proj.withus.repository;

import com.proj.withus.domain.Album;
import com.proj.withus.domain.Member;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.Optional;

@Repository
public interface AlbumRepository extends JpaRepository<Album, Long> {

    Optional<Album> findAlbumByMemberId(Long memberId);
    Optional<Album> findAlbumByMember(Member member);
    void deleteAlbumByMemberId(Long memberId);
}

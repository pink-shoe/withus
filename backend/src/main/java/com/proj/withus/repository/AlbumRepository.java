package com.proj.withus.repository;

import com.proj.withus.domain.Album;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface AlbumRepository extends JpaRepository<Album, Long> {

    public Album findAlbumByMemberId(Long memberId);
}

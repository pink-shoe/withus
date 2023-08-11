package com.proj.withus.repository;

import com.proj.withus.domain.Image;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

@Repository
public interface ImageRepository extends JpaRepository<Image, Long> {

    List<Image> findImagesByAlbumId(Long albumId);
    Optional<Image> findImageById(Long id);
    void deleteImageById(Long id);
}

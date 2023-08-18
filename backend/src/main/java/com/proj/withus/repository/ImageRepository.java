package com.proj.withus.repository;

import com.proj.withus.domain.Image;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.Optional;

@Repository
public interface ImageRepository extends JpaRepository<Image, Long> {

    Page<Image> findImagesByAlbumIdOrderBySavedAtDesc(Long albumId, Pageable pageable);
    Optional<Image> findImageById(Long id);
    void deleteImageById(Long id);
}

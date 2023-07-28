package com.proj.withus.repository;

import com.proj.withus.domain.Image;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface ImageRepository extends JpaRepository<Image, Long> {

    List<Image> findImagesByAlbumId(Long albumId);
    Image findImageById(Long id);
    void deleteImageById(Long id);
}

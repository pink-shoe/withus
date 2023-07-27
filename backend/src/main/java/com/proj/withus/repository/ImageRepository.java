package com.proj.withus.repository;

import com.proj.withus.domain.Image;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface ImageRepository extends JpaRepository<Image, Long> {

    public List<Image> findImagesByAlbumId(Long albumId);
    public Image findImageById(Long id);
    public void deleteImageById(Long id);
}

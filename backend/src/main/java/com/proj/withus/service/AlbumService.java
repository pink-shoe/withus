package com.proj.withus.service;

import java.time.LocalDateTime;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.proj.withus.domain.Album;
import com.proj.withus.domain.Image;
import com.proj.withus.repository.AlbumRepository;
import com.proj.withus.repository.ImageRepository;

@Service
public class AlbumService {

    @Autowired
    private AlbumRepository albumRepository;

    @Autowired
    private ImageRepository imageRepository;

    public Long getAlbum(Long memberId) {
        Album find = albumRepository.findAlbumByMemberId(memberId);
        if (find != null) {
            return find.getId();
        }
        return null;
    }

    public List<Image> getImages(Long albumId) {
        return imageRepository.findImagesByAlbumId(albumId);
    }

    @Transactional
    public Image deleteImage(Long imgId) {
        imageRepository.deleteImageById(imgId);

        return imageRepository.findImageById(imgId);
    }

    public Image saveImage(Long memberId, String captureUrl) {
        Album album = albumRepository.findAlbumByMemberId(memberId);
        Image image = new Image();
        image.setImgUrl(captureUrl);
        image.setAlbum(album);
        image.setSavedAt(LocalDateTime.now().toString());
        return imageRepository.save(image);
    }
}

package com.proj.withus.service;

import com.proj.withus.domain.Album;
import com.proj.withus.domain.Image;
import com.proj.withus.repository.AlbumRepository;
import com.proj.withus.repository.ImageRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

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

    public List<Image> getImages(Long memberId) {
        return imageRepository.findImagesByAlbumId(memberId);
    }

    public Image deleteImage(Long imgId) {
        imageRepository.deleteImageById(imgId);

        return imageRepository.findImageById(imgId);
    }
}

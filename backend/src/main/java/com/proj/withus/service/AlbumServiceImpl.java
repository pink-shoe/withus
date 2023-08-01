package com.proj.withus.service;

import java.time.LocalDateTime;
import java.util.List;

import com.proj.withus.domain.Album;
import com.proj.withus.domain.Image;
import com.proj.withus.domain.Member;
import com.proj.withus.repository.AlbumRepository;
import com.proj.withus.repository.ImageRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

@Service
public class AlbumServiceImpl implements  AlbumService {

    @Autowired
    private AlbumRepository albumRepository;

    @Autowired
    private ImageRepository imageRepository;

    public void createAlbum(Member member) {
        if (albumRepository.findAlbumByMemberId(member.getId()) == null) {
            Album album = new Album();
            album.setMember(member);
            albumRepository.save(album);
        }
//        return albumRepository.save(album).getId();
    }

    public Long getAlbum(Long memberId) {
        Album find = albumRepository.findAlbumByMemberId(memberId);
        if (find != null) {
            return find.getId();
        }
        return null;
    }

    @Transactional
    public Album deleteAlbum(Long memberId) {
        albumRepository.deleteByMemberId(memberId);

        return albumRepository.findAlbumByMemberId(memberId);
    }

    public List<Image> getImages(Long albumId) {
        return imageRepository.findImagesByAlbumId(albumId);
    }

    public Image saveImage(Long memberId, String imgUrl) {
        Long albumId = getAlbum(memberId);
        if (albumId == null) {
            return null;
        }
        Image image = new Image();
        image.setImgUrl(imgUrl);
        image.setAlbum(albumRepository.findAlbumByMemberId(memberId));
        image.setSavedAt(LocalDateTime.now().toString());
        Long imgId = imageRepository.save(image).getId();
        return imageRepository.findImageById(imgId);
    }

    @Transactional
    public Image deleteImage(Long imgId) {
        imageRepository.deleteImageById(imgId);

        return imageRepository.findImageById(imgId);
    }
}

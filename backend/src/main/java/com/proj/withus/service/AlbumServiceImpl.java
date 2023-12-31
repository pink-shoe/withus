package com.proj.withus.service;

import com.proj.withus.domain.Album;
import com.proj.withus.domain.Image;
import com.proj.withus.domain.Member;
import com.proj.withus.exception.CustomException;
import com.proj.withus.exception.ErrorCode;
import com.proj.withus.repository.AlbumRepository;
import com.proj.withus.repository.ImageRepository;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.time.LocalDateTime;
import java.util.List;
import java.util.Optional;

@Service
@RequiredArgsConstructor
@Slf4j
@Transactional
public class AlbumServiceImpl implements AlbumService {

    private final AlbumRepository albumRepository;
    private final ImageRepository imageRepository;

    public void createAlbum(Member member) {
        albumRepository.findAlbumByMember(member)
                .ifPresent(album -> {
                   throw new CustomException(ErrorCode.DUPLICATE_ALBUM);
                });
        Album album = new Album();
        album.setMember(member);
        albumRepository.save(album);

    }

    public Long getAlbum(Long memberId) {
        return albumRepository.findAlbumByMemberId(memberId)
            .map(Album::getId)
            .orElseThrow(() -> new CustomException(ErrorCode.ALBUM_IS_NOT_EXIST));
    }

    @Transactional
    public void deleteAlbum(Long memberId) {
        albumRepository.findAlbumByMemberId(memberId)
                        .orElseThrow(() -> new CustomException(ErrorCode.ALBUM_NOT_FOUND));
        try {
            albumRepository.deleteAlbumByMemberId(memberId);
        } catch (Exception e) {
            throw new CustomException(ErrorCode.ALBUM_NOT_DELETED);
        }
    }

    public Page<Image> getImages(Long albumId, Pageable pageable) {
        return imageRepository.findImagesByAlbumIdOrderBySavedAtDesc(albumId, pageable);
    }

    public Image saveImage(Long memberId, String imgUrl) {
        Image image = new Image();
        image.setImgUrl(imgUrl);
        image.setAlbum(albumRepository.findAlbumByMemberId(memberId)
                .orElseThrow(() -> new CustomException(ErrorCode.ALBUM_IS_NOT_EXIST)));
        image.setSavedAt(LocalDateTime.now().toString());
        Long imgId = imageRepository.save(image).getId();
        return imageRepository.findImageById(imgId)
                .orElseThrow(() -> new CustomException(ErrorCode.IMAGE_NOT_SAVED));
    }

    @Transactional
    public void deleteImage(Long imgId) {
        try {
            imageRepository.deleteImageById(imgId);
        } catch (Exception e) {
            throw new CustomException(ErrorCode.IMAGE_NOT_DELETED);
        }
    }
}

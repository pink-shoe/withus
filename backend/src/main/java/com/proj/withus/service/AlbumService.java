package com.proj.withus.service;

import com.proj.withus.domain.Album;
import com.proj.withus.domain.Image;
import com.proj.withus.domain.Member;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;

import java.util.List;
import java.util.Optional;

public interface AlbumService {

    public void createAlbum(Member member);
    public Long getAlbum(Long memberId);
    public void deleteAlbum(Long memberId);
    public Page<Image> getImages(Long albumId, Pageable pageable);
    public Image saveImage(Long memberId, String imgUrl);
    public Image deleteImage(Long imgId);

}

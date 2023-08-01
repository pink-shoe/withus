package com.proj.withus.service;

import com.proj.withus.domain.Album;
import com.proj.withus.domain.Image;
import com.proj.withus.domain.Member;

import java.util.List;

public interface AlbumService {

    public void createAlbum(Member member);
    public Long getAlbum(Long memberId);
    public Album deleteAlbum(Long memberId);
    public List<Image> getImages(Long albumId);
    public Image saveImage(Long memberId, String imgUrl);
    public Image deleteImage(Long imgId);

}

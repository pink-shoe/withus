package com.proj.withus.controller;

import java.util.List;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestHeader;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.proj.withus.domain.Image;
import com.proj.withus.service.AlbumServiceImpl;
import com.proj.withus.util.JwtUtil;

import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;

@RestController
@Slf4j
@RequiredArgsConstructor
@RequestMapping("/albums")
public class AlbumController {

    private final AlbumServiceImpl albumServiceImpl;
    private final JwtUtil jwtUtil;

    @GetMapping
    public ResponseEntity<?> showAlbums(@RequestHeader("Authorization") String jwtToken) {
        Long memberId = jwtUtil.extractMemberId(jwtToken);

        Long albumId = albumServiceImpl.getAlbum(memberId);
        if (albumId != null) {
            List<Image> albums = albumServiceImpl.getImages(albumId);
            return ResponseEntity.ok(albums);
        }
        return new ResponseEntity<>("앨범이 존재하지 않음", HttpStatus.BAD_REQUEST);
    }

    @PostMapping("/image/save")
    public ResponseEntity<?> saveImages(@RequestHeader("Authorization") String jwtToken, @RequestBody() List<String> imageUrls) {
        Long memberId = jwtUtil.extractMemberId(jwtToken);

       Long albumId = albumServiceImpl.getAlbum(memberId);
       if (albumId == null) {
           return new ResponseEntity<>("앨범이 존재하지 않음", HttpStatus.BAD_REQUEST);
       }

        for (String imgUrl : imageUrls) {
            Image saved = albumServiceImpl.saveImage(memberId, imgUrl);
            if (saved == null) {
                return new ResponseEntity<>("사진이 정상적으로 저장되지 않음", HttpStatus.BAD_REQUEST);
            }
        }
        return new ResponseEntity<>(HttpStatus.OK);
    }

    @DeleteMapping("/{img_id}")
    public ResponseEntity<?> deleteImage(@PathVariable("img_id") Long imgId, @RequestHeader("Authorization") String jwtToken) {
//        Long memberId = jwtUtil.extractMemberId(jwtToken);

        Image deleted = albumServiceImpl.deleteImage((Long) imgId);

        if (deleted == null) {
            return new ResponseEntity(HttpStatus.OK);
        }
        return new ResponseEntity<>("이미지 삭제 안됨", HttpStatus.NO_CONTENT);
    }
}

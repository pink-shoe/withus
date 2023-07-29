package com.proj.withus.controller;

import com.proj.withus.domain.Image;
import com.proj.withus.service.AlbumService;
import com.proj.withus.util.JwtUtil;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@Slf4j
@RequiredArgsConstructor
@RequestMapping("/albums")
public class AlbumController {

    @Autowired
    private AlbumService albumService;

    private final JwtUtil jwtUtil = new JwtUtil();

    @GetMapping
    public ResponseEntity<?> showAlbums(@RequestHeader("Authorization") String jwtToken) {
        Long memberId = jwtUtil.extractMemberId(jwtToken);

        Long albumId = albumService.getAlbum(memberId);
        if (albumId != null) {
            List<Image> albums = albumService.getImages(albumId);
            return ResponseEntity.ok(albums);
        }
        return new ResponseEntity<>("앨범이 존재하지 않음", HttpStatus.BAD_REQUEST);
    }

    @DeleteMapping("/{img_id}")
    public ResponseEntity<?> deleteImage(@PathVariable("img_id") Long imgId, @RequestHeader("Authorization") String jwtToken) {
//        Long memberId = jwtUtil.extractMemberId(jwtToken);

        Image deleted = albumService.deleteImage((Long) imgId);

        if (deleted == null) {
            return new ResponseEntity(HttpStatus.OK);
        }
        return new ResponseEntity<>("이미지 삭제 안됨", HttpStatus.NO_CONTENT);
    }
}

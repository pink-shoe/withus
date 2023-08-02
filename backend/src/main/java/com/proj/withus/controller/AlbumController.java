package com.proj.withus.controller;

import com.proj.withus.domain.Image;
import com.proj.withus.domain.dto.SocialMemberInfo;
import com.proj.withus.service.AlbumServiceImpl;
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
    private AlbumServiceImpl albumServiceImpl;

    private final JwtUtil jwtUtil = new JwtUtil();

    @GetMapping
    public ResponseEntity<?> showAlbums(@RequestHeader("Authorization") String jwtToken) {
        SocialMemberInfo socialMemberInfo = jwtUtil.extractMemberId(jwtToken);
        Long memberId = socialMemberInfo.getId();

        Long albumId = albumServiceImpl.getAlbum(memberId);
        if (albumId != null) {
            List<Image> albums = albumServiceImpl.getImages(albumId);
            return ResponseEntity.ok(albums);
        }
        return new ResponseEntity<>("앨범이 존재하지 않음", HttpStatus.BAD_REQUEST);
    }

    @PostMapping("/image/save")
    public ResponseEntity<?> saveImages(@RequestHeader("Authorization") String jwtToken, @RequestBody() List<String> imageUrls) {
        SocialMemberInfo socialMemberInfo = jwtUtil.extractMemberId(jwtToken);
        Long memberId = socialMemberInfo.getId();

//        Long albumId = albumService.getAlbum(memberId);
//        if (albumId == null) {
//            return new ResponseEntity<>("앨범이 존재하지 않음", HttpStatus.BAD_REQUEST);
//        }

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

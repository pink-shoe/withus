package com.proj.withus.controller;

import com.proj.withus.domain.Image;
import com.proj.withus.service.AlbumService;
import com.proj.withus.util.JwtUtil;
import io.swagger.annotations.*;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Sort;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import javax.servlet.http.HttpServletRequest;

@Api(tags = "사진첩 API", description = "사진첩 관련 기능을 처리하는 API (AlbumController)")
@RestController
@Slf4j
@RequiredArgsConstructor
@RequestMapping(value = "/api/albums", produces = MediaType.APPLICATION_JSON_VALUE)
@ApiResponses({
        @ApiResponse(code = 403, message = "권한 부족", examples = @Example(value = @ExampleProperty(mediaType = "application/json", value = "{ \n errorCode: 403, \n message: auth problem \n}"))),
        @ApiResponse(code = 401, message = "토큰 만료", examples = @Example(value = @ExampleProperty(mediaType = "application/json", value = "{ \n errorCode: 401, \n message: token expired \n}"))),
})
public class AlbumController {

    private final AlbumService albumService;
    private final JwtUtil jwtUtil;

    @ApiOperation(value = "앨범 사진 조회", notes = "앨범에 있는 사진들을 조회한다.")
    @ApiResponses(value = {
            @ApiResponse(code = 200, message = "조회 성공", response = Page.class),
            @ApiResponse(code = 400, message = "앨범 정보가 존재하지 않음", examples = @Example(value = @ExampleProperty(mediaType = "application/json", value = "{ \n errorCode: 400, \n message: fail \n}")))
    })
    @ApiImplicitParams(value = {
            @ApiImplicitParam(name = "page", value = "페이지 번호(ex: 0)", required = true, dataType = "int", paramType = "query"),
            @ApiImplicitParam(name = "size", value = "게시물 개수", required = true, dataType = "int", paramType = "query")
    })
    @GetMapping
    public ResponseEntity<?> showAlbums(
            HttpServletRequest request,
            @RequestParam(name = "page") int page,
            @RequestParam(name = "size") int size) {

        Long memberId = (Long) request.getAttribute("memberId");
        Long albumId = albumService.getAlbum(memberId);
        if (albumId != null) {
            Page<Image> albums = albumService.getImages(albumId,
                    PageRequest.of(page, size, Sort.by(Sort.Direction.DESC, "savedAt"))
            );
            for (Image image: albums) {
                System.out.println(image.getImgUrl());
            }
            return ResponseEntity.ok(albums);
        }
        return new ResponseEntity<>("앨범이 존재하지 않음", HttpStatus.BAD_REQUEST);
    }

    // @PostMapping("/image/save")
    // public ResponseEntity<?> saveImages(@RequestHeader("Authorization") String jwtToken, @RequestBody() List<String> imageUrls) {
    //     SocialMemberInfo socialMemberInfo = jwtUtil.extractMemberId(jwtToken);
    //     Long memberId = socialMemberInfo.getId();
    //
    //    Long albumId = albumService.getAlbum(memberId);
    //    if (albumId == null) {
    //        return new ResponseEntity<>("앨범이 존재하지 않음", HttpStatus.BAD_REQUEST);
    //    }
    //
    //     for (String imgUrl : imageUrls) {
    //         Image saved = albumService.saveImage(memberId, imgUrl);
    //         if (saved == null) {
    //             return new ResponseEntity<>("사진이 정상적으로 저장되지 않음", HttpStatus.BAD_REQUEST);
    //         }
    //     }
    //     return new ResponseEntity<>(HttpStatus.OK);
    // }

    @ApiOperation(value = "앨범 사진 삭제", notes = "앨범에 저장된 사진을 삭제한다.")
    @ApiResponses(value = {
            @ApiResponse(code = 200, message = "삭제 성공", response = String.class, examples = @Example(value = @ExampleProperty(mediaType = "application/json", value = "ok"))),
            @ApiResponse(code = 400, message = "사진이 삭제되지 않음", examples = @Example(value = @ExampleProperty(mediaType = "application/json", value = "{ \n errorCode: 400, \n message: fail \n}")))
    })
    @ApiImplicitParam(name = "img_id", value = "이미지 id", required = true, dataType = "Long", paramType = "path")
    @DeleteMapping("/{img_id}")
    public ResponseEntity<?> deleteImage(
            @PathVariable("img_id") Long imgId,
            HttpServletRequest request) {
//        Long memberId = jwtUtil.extractMemberId(jwtToken);

        Image deleted = albumService.deleteImage(imgId);

        if (deleted == null) {
            return new ResponseEntity(HttpStatus.OK);
        }
        return new ResponseEntity<>("이미지 삭제 안됨", HttpStatus.NO_CONTENT);
    }
}

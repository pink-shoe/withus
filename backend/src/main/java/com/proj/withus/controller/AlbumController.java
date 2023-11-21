package com.proj.withus.controller;

import javax.servlet.http.HttpServletRequest;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Sort;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.proj.withus.controller.swagger.AlbumSwagger;
import com.proj.withus.domain.Image;
import com.proj.withus.service.AlbumService;
import com.proj.withus.util.JwtUtil;

import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;

@RestController
@Slf4j
@RequiredArgsConstructor
@RequestMapping(value = "/api/albums", produces = MediaType.APPLICATION_JSON_VALUE)
public class AlbumController implements AlbumSwagger {

	private final AlbumService albumService;
	private final JwtUtil jwtUtil;

	@GetMapping
	public ResponseEntity<?> showAlbums(
		HttpServletRequest request,
		@RequestParam(name = "page", defaultValue = "0") int page,
		@RequestParam(name = "size", defaultValue = "4") int size) {

		Long memberId = (Long)request.getAttribute("memberId");
		Long albumId = albumService.getAlbum(memberId);
		Page<Image> albums = albumService.getImages(albumId,
			PageRequest.of(page, size, Sort.by(Sort.Direction.DESC, "savedAt"))
		);
		return ResponseEntity.ok(albums);
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

	@DeleteMapping("/{img_id}")
	public ResponseEntity<?> deleteImage(
		@PathVariable("img_id") Long imgId,
		HttpServletRequest request) {

		albumService.deleteImage(imgId);

		return new ResponseEntity(HttpStatus.OK);
	}
}

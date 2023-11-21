package com.proj.withus.controller.swagger;

import javax.servlet.http.HttpServletRequest;

import org.springframework.data.domain.Page;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestParam;

import io.swagger.annotations.Api;
import io.swagger.annotations.ApiImplicitParam;
import io.swagger.annotations.ApiImplicitParams;
import io.swagger.annotations.ApiOperation;
import io.swagger.annotations.ApiResponse;
import io.swagger.annotations.ApiResponses;
import io.swagger.annotations.Example;
import io.swagger.annotations.ExampleProperty;

@Api(tags = "사진첩 API", description = "사진첩 관련 기능을 처리하는 API (AlbumController)")
@ApiResponses({
	@ApiResponse(code = 403, message = "권한 부족", examples = @Example(value = @ExampleProperty(mediaType = "application/json", value = "{ \n errorCode: 403, \n message: auth problem \n}"))),
	@ApiResponse(code = 401, message = "토큰 만료", examples = @Example(value = @ExampleProperty(mediaType = "application/json", value = "{ \n errorCode: 401, \n message: token expired \n}"))),
})
public interface AlbumSwagger {

	@ApiOperation(value = "앨범 사진 조회", notes = "앨범에 있는 사진들을 조회한다.")
	@ApiResponses(value = {
		@ApiResponse(code = 200, message = "조회 성공", response = Page.class),
		@ApiResponse(code = 400, message = "앨범 정보가 존재하지 않음", examples = @Example(value = @ExampleProperty(mediaType = "application/json", value = "{ \n errorCode: 400, \n message: fail \n}")))
	})
	@ApiImplicitParams(value = {
		@ApiImplicitParam(name = "page", value = "페이지 번호(ex: 0)", dataType = "int", paramType = "query"),
		@ApiImplicitParam(name = "size", value = "게시물 개수", dataType = "int", paramType = "query")
	})
	public ResponseEntity<?> showAlbums(
		HttpServletRequest request,
		@RequestParam(name = "page", defaultValue = "0") int page,
		@RequestParam(name = "size", defaultValue = "4") int size);

	/*

	 */
	@ApiOperation(value = "앨범 사진 삭제", notes = "앨범에 저장된 사진을 삭제한다.")
	@ApiResponses(value = {
		@ApiResponse(code = 200, message = "삭제 성공", response = String.class, examples = @Example(value = @ExampleProperty(mediaType = "application/json", value = "ok"))),
		@ApiResponse(code = 400, message = "사진이 삭제되지 않음", examples = @Example(value = @ExampleProperty(mediaType = "application/json", value = "{ \n errorCode: 400, \n message: fail \n}")))
	})
	@ApiImplicitParam(name = "img_id", value = "이미지 id", required = true, dataType = "Long", paramType = "path")
	public ResponseEntity<?> deleteImage(
		@PathVariable("img_id") Long imgId,
		HttpServletRequest request);
}

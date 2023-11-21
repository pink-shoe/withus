package com.proj.withus.controller.swagger;

import javax.servlet.http.HttpServletRequest;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestPart;
import org.springframework.web.multipart.MultipartFile;

import com.proj.withus.domain.Player;
import com.proj.withus.domain.dto.ChooseMvpPlayerReq;
import com.proj.withus.domain.dto.GetGameInfoRes;
import com.proj.withus.domain.dto.GetSelectedImagesReq;
import com.proj.withus.domain.dto.GetTotalGameResultRes;

import io.swagger.annotations.Api;
import io.swagger.annotations.ApiImplicitParam;
import io.swagger.annotations.ApiImplicitParams;
import io.swagger.annotations.ApiOperation;
import io.swagger.annotations.ApiResponse;
import io.swagger.annotations.ApiResponses;
import io.swagger.annotations.Example;
import io.swagger.annotations.ExampleProperty;

@Api(tags = "게임 진행 API", description = "게임 진행 관련 기능을 처리하는 API (GameController)")
@ApiResponses({
	@ApiResponse(code = 401, message = "토큰 만료", examples = @Example(value = @ExampleProperty(mediaType = "application/json", value = "{ \n errorCode: 401, \n message: token expired \n}")))
})
public interface GameSwagger {

	@ApiOperation(value = "게임 정보 조회", notes = "게임 시작 후 게임 기본 정보를 불러온다.")
	@ApiResponses(value = {
		@ApiResponse(code = 200, message = "조회 성공", response = GetGameInfoRes.class),
		@ApiResponse(code = 400, message = "게임 정보가 존재하지 않음", examples = @Example(value = @ExampleProperty(mediaType = "application/json", value = "{ \n errorCode: 400, \n message: fail \n}")))
	})
	@ApiImplicitParams(value = {
		@ApiImplicitParam(name = "room_id", value = "방 id", required = true, dataType = "Long", paramType = "path")
	})
	public ResponseEntity<?> getGameInfo(
		@PathVariable(value = "room_id", required = true) Long roomId,
		HttpServletRequest request);

	/*

	 */
	@ApiOperation(value = "사진 캡처 요청", notes = "라운드 종료 후 캡처한 사진을 불러와 S3 서버, DB에 전송한다.")
	@ApiResponses(value = {
		@ApiResponse(code = 200, message = "캡처 사진 저장 성공(다음 라운드 반환)", response = String.class),
		@ApiResponse(code = 400, message = "캡처 사진 저장 실패", examples = @Example(value = @ExampleProperty(mediaType = "application/json", value = "{ \n errorCode: 400, \n message: fail \n}")))
	})
	@ApiImplicitParams(value = {
		@ApiImplicitParam(name = "room_id", value = "방 id", required = true, paramType = "path"),
		@ApiImplicitParam(name = "round", value = "라운드 수", required = true, paramType = "path"),
		@ApiImplicitParam(name = "captureImage", value = "form data capture image", dataTypeClass = MultipartFile.class, paramType = "body")
	})
	public ResponseEntity<?> getCaptureImage(
		HttpServletRequest request,
		@PathVariable("room_id") Long roomId,
		@PathVariable("round") int round,
		@RequestPart MultipartFile captureImage);

	/*

	 */
	@ApiOperation(value = "총 게임 결과 요청", notes = "모든 라운드 종료 후 전체 게임 결과를 전달한다.")
	@ApiResponses(value = {
		@ApiResponse(code = 200, message = "모든 게임 결과 전송 성공", response = GetTotalGameResultRes.class, responseContainer = "List"),
		@ApiResponse(code = 400, message = "모든 게임 결과 전송 실패", examples = @Example(value = @ExampleProperty(mediaType = "application/json", value = "{ \n errorCode: 400, \n message: fail \n}"))),
		@ApiResponse(code = 403, message = "권한 없음", examples = @Example(value = @ExampleProperty(mediaType = "application/json", value = "{ \n errorCode: 403, \n message: auth \n}")))
	})
	@ApiImplicitParam(name = "room_id", value = "방 id", required = true, dataType = "Long", paramType = "path")
	public ResponseEntity<?> getGameTotalResult(
		@PathVariable(value = "room_id", required = true) Long roomId,
		HttpServletRequest request);

	/*

	 */
	@ApiOperation(value = "선택된 사진 저장", notes = "모든 라운드 종료 후 유저는 저장하고 싶은 사진을 선택해 앨범에 저장한다.")
	@ApiResponses(value = {
		@ApiResponse(code = 200, message = "선택한 사진 저장 성공", examples = @Example(value = @ExampleProperty(mediaType = "application/json", value = "ok"))),
		@ApiResponse(code = 400, message = "선택한 사진 저장 실패", examples = @Example(value = @ExampleProperty(mediaType = "application/json", value = "{ \n errorCode: 400, \n message: fail \n}")))
	})
	@ApiImplicitParam(name = "getSelectedImagesReq", value = "GetSelectedImages object", dataTypeClass = GetSelectedImagesReq.class, paramType = "body")
	public ResponseEntity<?> saveImageToAlbum(
		HttpServletRequest request,
		@RequestBody GetSelectedImagesReq getSelectedImagesReq);

	/*

	 */
	@ApiOperation(value = "shape 정보 등록(테스트용)", notes = "shape 정보 DB에 등록")
	@ApiResponses(value = {
		@ApiResponse(code = 200, message = "사진 전송 성공", response = String.class),
		@ApiResponse(code = 400, message = "사진 전송 실패", examples = @Example(value = @ExampleProperty(mediaType = "application/json", value = "{ \n errorCode: 400, \n message: fail \n}")))
	})
	@ApiImplicitParams(value = {
		@ApiImplicitParam(name = "image", value = "form data image", dataTypeClass = MultipartFile.class, paramType = "body"),
		@ApiImplicitParam(name = "shape_id", value = "shapeId", paramType = "path"),
		@ApiImplicitParam(name = "shape_label", value = "shapeLabel", paramType = "path")
	})
	public ResponseEntity<?> saveShapeInfo(
		HttpServletRequest request,
		@PathVariable(value = "shape_id") Long shapeId,
		@PathVariable(value = "shape_label") String shapeLabel,
		@RequestPart MultipartFile image);

	/*

	 */
	@ApiOperation(value = "MVP 선정", notes = "플레이어는 MVP를 투표해 선정한다.")
	@ApiResponses(value = {
		@ApiResponse(code = 200, message = "MVP 선정 성공", response = String.class, examples = @Example(value = @ExampleProperty(mediaType = "application/json", value = "mvp 선정 성공"))),
		@ApiResponse(code = 400, message = "MVP 선정 실패", examples = @Example(value = @ExampleProperty(mediaType = "application/json", value = "{ \n errorCode: 400, \n message: fail \n}"))),
		@ApiResponse(code = 403, message = "권한 없음", examples = @Example(value = @ExampleProperty(mediaType = "application/json", value = "{ \n errorCode: 403, \n message: auth \n}")))
	})
	@ApiImplicitParams(value = {
		@ApiImplicitParam(name = "room_id", value = "방 id", required = true, dataType = "Long", paramType = "path"),
		@ApiImplicitParam(name = "ChooseMvpPlayerReq", value = "ChooseMvpPlayerReq object", dataTypeClass = GetSelectedImagesReq.class, paramType = "body"),
	})
	public ResponseEntity<?> chooseMvpPlayer(
		@PathVariable(value = "room_id", required = true) Long roomId,
		@RequestBody ChooseMvpPlayerReq chooseMvpPlayerReq,
		HttpServletRequest request);

	/*

	 */
	@ApiOperation(value = "MVP 결과 요청", notes = "MVP로 선정된 플레이어 정보를 조회한다.")
	@ApiResponses(value = {
		@ApiResponse(code = 200, message = "MVP 결과 요청 성공", response = Player.class, responseContainer = "List"),
		@ApiResponse(code = 400, message = "MVP 결과 요청 실패", examples = @Example(value = @ExampleProperty(mediaType = "application/json", value = "{ \n errorCode: 400, \n message: fail \n}"))),
		@ApiResponse(code = 403, message = "권한 없음", examples = @Example(value = @ExampleProperty(mediaType = "application/json", value = "{ \n errorCode: 403, \n message: auth \n}")))
	})
	@ApiImplicitParams(value = {
		@ApiImplicitParam(name = "room_id", value = "방 id", required = true, dataType = "Long", paramType = "path"),
	})
	public ResponseEntity<?> getMvpPlayer(
		@PathVariable(value = "room_id", required = true) Long roomId,
		HttpServletRequest request);

}

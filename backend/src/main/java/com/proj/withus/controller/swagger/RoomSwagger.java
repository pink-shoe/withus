package com.proj.withus.controller.swagger;

import javax.servlet.http.HttpServletRequest;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestBody;

import com.proj.withus.domain.dto.CreateRoomReq;
import com.proj.withus.domain.dto.GetRoomInfoRes;
import com.proj.withus.domain.dto.ModifyRoomReq;

import io.swagger.annotations.Api;
import io.swagger.annotations.ApiImplicitParam;
import io.swagger.annotations.ApiImplicitParams;
import io.swagger.annotations.ApiOperation;
import io.swagger.annotations.ApiResponse;
import io.swagger.annotations.ApiResponses;
import io.swagger.annotations.Example;
import io.swagger.annotations.ExampleProperty;

@Api(tags = "방 API", description = "게임 방 관련 기능을 처리하는 API (RoomController)")
@ApiResponses({
	@ApiResponse(code = 401, message = "토큰 만료", examples = @Example(value = @ExampleProperty(mediaType = "application/json", value = "{ \n errorCode: 401, \n message: token expired \n}")))
})
public interface RoomSwagger {

	@ApiOperation(value = "방 정보 조회", notes = "방 정보와 플레이어 정보를 조회한다.")
	@ApiResponses(value = {
		@ApiResponse(code = 200, message = "정보 조회 성공", response = GetRoomInfoRes.class),
		@ApiResponse(code = 400, message = "정보 조회 실패", examples = @Example(value = @ExampleProperty(mediaType = "application/json", value = "{ \n errorCode: 400, \n message: fail \n}"))),
		@ApiResponse(code = 403, message = "권한 부족", examples = @Example(value = @ExampleProperty(mediaType = "application/json", value = "{ \n errorCode: 403, \n message: auth problem \n}")))
	})
	@ApiImplicitParams(value = {
		@ApiImplicitParam(name = "room_code", value = "방 입장 코드", required = true, dataType = "int", paramType = "path")
	})
	public ResponseEntity<?> getRoomInfo(HttpServletRequest request, @PathVariable("room_code") int roomCode);

	/*

	 */
	@ApiOperation(value = "방 생성", notes = "방장은 방을 생성한다.")
	@ApiResponses(value = {
		@ApiResponse(code = 201, message = "방 만들기 성공", response = Integer.class, examples = @Example(value = @ExampleProperty(mediaType = "application/json", value = "479053"))),
		@ApiResponse(code = 400, message = "방 만들기 실패", examples = @Example(value = @ExampleProperty(mediaType = "application/json", value = "{ \n errorCode: 400, \n message: fail \n}")))
	})
	@ApiImplicitParam(name = "createRoomReq", value = "CreateRoomReq object", dataTypeClass = CreateRoomReq.class, paramType = "body")
	public ResponseEntity<?> createRoom(HttpServletRequest request, @RequestBody CreateRoomReq createRoomReq);

	/*

	 */
	@ApiOperation(value = "방 입장", notes = "참가자는 방에 참여한다.")
	@ApiResponses(value = {
		@ApiResponse(code = 200, message = "방 입장 성공", response = String.class, examples = @Example(value = @ExampleProperty(mediaType = "application/json", value = "ok"))),
		@ApiResponse(code = 400, message = "방 입장 실패", examples = @Example(value = @ExampleProperty(mediaType = "application/json", value = "{ \n errorCode: 400, \n message: fail \n}"))),
		@ApiResponse(code = 403, message = "권한 부족", examples = @Example(value = @ExampleProperty(mediaType = "application/json", value = "{ \n errorCode: 403, \n message: auth problem \n}")))
	})
	@ApiImplicitParams(
		value = {
			@ApiImplicitParam(name = "room_code", value = "방 코드", required = true, dataType = "int", paramType = "path"),
		}
	)
	public ResponseEntity<?> enterRoom(
		HttpServletRequest request,
		@PathVariable("room_code") int roomCode);

	/*

	 */
	@ApiOperation(value = "방 나가기", notes = "참가자는 방에서 나간다.")
	@ApiResponses(value = {
		@ApiResponse(code = 200, message = "방 나가기 성공", response = String.class, examples = @Example(value = @ExampleProperty(mediaType = "application/json", value = "방 나가기 성공"))),
		@ApiResponse(code = 400, message = "방 나가기 실패", examples = @Example(value = @ExampleProperty(mediaType = "application/json", value = "{ \n errorCode: 400, \n message: fail \n}")))
	})
	@ApiImplicitParams(
		value = {
			@ApiImplicitParam(name = "room_id", value = "참여한 방 번호", required = true, dataType = "Long", paramType = "path"),
			// @ApiImplicitParam(name = "member_id", value = "회원 id", required = true, dataType = "Long", paramType = "path")
		}
	)
	public ResponseEntity<?> leaveRoom(
		HttpServletRequest request,
		@PathVariable("room_id") Long roomId);

	/*

	 */
	@ApiOperation(value = "방 옵션 수정", notes = "방장은 방 옵션을 수정한다.")
	@ApiResponses(value = {
		@ApiResponse(code = 200, message = "방 옵션 수정 성공", response = Integer.class, examples = @Example(value = @ExampleProperty(mediaType = "application/json", value = "479053"))),
		@ApiResponse(code = 400, message = "방 옵션 수정 실패", examples = @Example(value = @ExampleProperty(mediaType = "application/json", value = "{ \n errorCode: 400, \n message: fail \n}"))),
		@ApiResponse(code = 403, message = "권한 부족", examples = @Example(value = @ExampleProperty(mediaType = "application/json", value = "{ \n errorCode: 403, \n message: auth problem \n}")))
	})
	@ApiImplicitParams(
		value = {
			@ApiImplicitParam(name = "room_id", value = "참여한 방 번호", required = true, dataType = "Long", paramType = "path"),
			@ApiImplicitParam(name = "modifyRoomReq", value = "ModifyRoomReq object", dataTypeClass = ModifyRoomReq.class, paramType = "body")
		}
	)
	public ResponseEntity<?> modifyRoom(
		HttpServletRequest request,
		@PathVariable("room_id") Long roomId,
		@RequestBody ModifyRoomReq modifyRoomReq);

	/*

	 */
	@ApiOperation(value = "유저 닉네임 수정", notes = "방에서 유저는 닉네임을 변경한다.")
	@ApiResponses(value = {
		@ApiResponse(code = 200, message = "닉네임 수정 성공", response = String.class, examples = @Example(value = @ExampleProperty(mediaType = "application/json", value = "닉네임이 수정되었습니다."))),
		@ApiResponse(code = 400, message = "닉네임 수정 실패", examples = @Example(value = @ExampleProperty(mediaType = "application/json", value = "{ \n errorCode: 400, \n message: fail \n}"))),
		@ApiResponse(code = 403, message = "권한 부족", examples = @Example(value = @ExampleProperty(mediaType = "application/json", value = "{ \n errorCode: 403, \n message: auth problem \n}")))
	})
	@ApiImplicitParams(
		value = {
			@ApiImplicitParam(name = "nickname", value = "수정할 닉네임", required = true, dataType = "String", paramType = "body")
		}
	)
	public ResponseEntity<?> modifyNickname(
		HttpServletRequest request,
		@RequestBody String nickname);

	/*

	 */
	@ApiOperation(value = "게임 준비", notes = "사용자는 게임 준비를 할 수 있다.")
	@ApiResponses(value = {
		@ApiResponse(code = 200, message = "준비 성공", response = Integer.class, examples = @Example(value = @ExampleProperty(mediaType = "application/json", value = "OK"))),
		@ApiResponse(code = 400, message = "준비 실패", examples = @Example(value = @ExampleProperty(mediaType = "application/json", value = "{ \n errorCode: 400, \n message: fail \n}")))
	})
	@ApiImplicitParams(
		value = {
			@ApiImplicitParam(name = "room_id", value = "참여한 방 번호", required = true, dataType = "Long", paramType = "path", example = "1")
		}
	)
	public ResponseEntity<?> setReady(
		HttpServletRequest request,
		@PathVariable("room_id") Long roomId);

	/*

	 */
	@ApiOperation(value = "게임 준비 취소", notes = "사용자는 게임 준비 취소를 할 수 있다.")
	@ApiResponses(value = {
		@ApiResponse(code = 200, message = "준비 취소 성공", response = Integer.class, examples = @Example(value = @ExampleProperty(mediaType = "application/json", value = "OK"))),
		@ApiResponse(code = 400, message = "준비 취소 실패", examples = @Example(value = @ExampleProperty(mediaType = "application/json", value = "{ \n errorCode: 400, \n message: fail \n}")))
	})
	@ApiImplicitParams(
		value = {
			@ApiImplicitParam(name = "room_id", value = "참여한 방 번호", required = true, dataType = "Long", paramType = "path", example = "1")
		}
	)
	public ResponseEntity<?> cancelReady(
		HttpServletRequest request,
		@PathVariable("room_id") Long roomId);

	@ApiOperation(value = "게임 시작 가능 여부", notes = "게임 시작 여부를 알려준다.")
	@ApiResponses(value = {
		@ApiResponse(code = 200, message = "게임 시작 성공", response = Boolean.class, examples = @Example(value = @ExampleProperty(mediaType = "application/json", value = "true"))),
		@ApiResponse(code = 400, message = "게임 시작 실패", examples = @Example(value = @ExampleProperty(mediaType = "application/json", value = "{ \n errorCode: 400, \n message: fail \n}")))
	})
	@ApiImplicitParams(
		value = {
			@ApiImplicitParam(name = "room_id", value = "참여한 방 번호", required = true, dataType = "Long", paramType = "path")
		}
	)
	public ResponseEntity<?> isStart(
		HttpServletRequest request,
		@PathVariable("room_id") Long roomId);

	/*

	 */
	@ApiOperation(value = "게임 시작", notes = "방장이 게임을 시작한다.(성공 시 true(boolean) 반환)")
	@ApiResponses(value = {
		@ApiResponse(code = 200, message = "게임 시작 성공", response = Boolean.class, examples = @Example(value = @ExampleProperty(mediaType = "application/json", value = "true"))),
		@ApiResponse(code = 400, message = "게임 시작 실패", examples = @Example(value = @ExampleProperty(mediaType = "application/json", value = "{ \n errorCode: 400, \n message: fail \n}")))
	})
	@ApiImplicitParams(
		value = {
			@ApiImplicitParam(name = "room_id", value = "참여한 방 번호", required = true, dataType = "Long", paramType = "path")
		}
	)
	public ResponseEntity<?> getStart(
		HttpServletRequest request,
		@PathVariable("room_id") Long roomId);
}

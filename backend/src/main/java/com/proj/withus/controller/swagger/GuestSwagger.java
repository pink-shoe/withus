package com.proj.withus.controller.swagger;

import javax.servlet.http.HttpServletRequest;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestParam;

import com.proj.withus.domain.Member;
import com.proj.withus.domain.dto.GuestLoginRes;

import io.swagger.annotations.Api;
import io.swagger.annotations.ApiImplicitParam;
import io.swagger.annotations.ApiImplicitParams;
import io.swagger.annotations.ApiOperation;
import io.swagger.annotations.ApiParam;
import io.swagger.annotations.ApiResponse;
import io.swagger.annotations.ApiResponses;
import io.swagger.annotations.Example;
import io.swagger.annotations.ExampleProperty;

@Api(tags = "게스트 API", description = "게스트와 관련된 기능을 처리하는 API (GuestController)")
@ApiResponses({
	@ApiResponse(code = 400, message = "Bad Request", examples = @Example(value = @ExampleProperty(mediaType = "application/json", value = "{ \n errorCode: 400, \n message: bad request \n}"))),
})
public interface GuestSwagger {

	@ApiOperation(value = "게스트 회원가입", notes = "게스트는 회원가입을 한다. ")
	@ApiResponses(value = {
		@ApiResponse(code = 200, message = "게스트 가입 성공", response = GuestLoginRes.class),
		@ApiResponse(code = 400, message = "게스트 가입 실패", examples = @Example(value = @ExampleProperty(mediaType = "application/json", value = "{ \n errorCode: 400, \n message: fail \n}"))),
	})
	@ApiImplicitParams(
		value = {
			@ApiImplicitParam(name = "room_code", value = "방 입장 코드", required = true, dataType = "int", paramType = "path"),
			@ApiImplicitParam(name = "nickname", value = "닉네임", required = true, dataType = "String", paramType = "body"),
		}
	)
	public ResponseEntity<?> guestLogin(
		@PathVariable("room_code") int roomCode,
		//            @ApiParam(value = "사용할 닉네임", required = true)
		@RequestBody String nickname);

	/*

	 */
	@ApiOperation(value = "게스트 닉네임 수정", notes = "게스트는 닉네임을 수정한다. ")
	@ApiResponses(value = {
		@ApiResponse(code = 200, message = "게스트 닉네임 수정 성공", response = Member.class),
		@ApiResponse(code = 400, message = "게스트 닉네임 수정 실패", examples = @Example(value = @ExampleProperty(mediaType = "application/json", value = "{ \n errorCode: 400, \n message: fail \n}"))),
	})
	//    @ApiImplicitParam(name = "nickname", value = "닉네임", required = true, dataType = "String", paramType = "body")
	public ResponseEntity<?> modifyGuestNickname(
		HttpServletRequest request,
		@ApiParam(value = "변경할 닉네임", required = true)
		@RequestParam String nickname);
}

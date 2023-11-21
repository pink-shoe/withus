package com.proj.withus.controller.swagger;

import javax.servlet.http.HttpServletRequest;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.RequestParam;

import com.proj.withus.domain.Member;

import io.swagger.annotations.Api;
import io.swagger.annotations.ApiOperation;
import io.swagger.annotations.ApiParam;
import io.swagger.annotations.ApiResponse;
import io.swagger.annotations.ApiResponses;
import io.swagger.annotations.Example;
import io.swagger.annotations.ExampleProperty;

@Api(tags = "회원 API", description = "회원 관리 기능을 처리하는 API (MemberController)")
@ApiResponses({
	@ApiResponse(code = 401, message = "토큰 만료", examples = @Example(value = @ExampleProperty(mediaType = "application/json", value = "{ \n errorCode: 401, \n message: token expired \n}"))),
	@ApiResponse(code = 403, message = "권한 부족", examples = @Example(value = @ExampleProperty(mediaType = "application/json", value = "{ \n errorCode: 403, \n message: auth \n}")))
})
public interface MemberSwagger {

	@ApiOperation(value = "회원 정보 조회", notes = "마이페이지에서 회원 정보를 조회한다.")
	@ApiResponses(value = {
		@ApiResponse(code = 200, message = "조회 성공", response = Member.class),
		@ApiResponse(code = 400, message = "회원이 존재하지 않음", examples = @Example(value = @ExampleProperty(mediaType = "application/json", value = "{ \n errorCode: 400, \n message: fail \n}")))
	})
	public ResponseEntity<?> getMemberInfo(HttpServletRequest request);

	/*

	 */
	@ApiOperation(value = "회원 정보 수정", notes = "회원의 닉네임을 입력받고 수정한다. (json이 아닌 문자열 입력)")
	@ApiResponses(value = {
		@ApiResponse(code = 200, message = "수정 성공", response = Member.class),
		@ApiResponse(code = 400, message = "회원이 존재하지 않음", examples = @Example(value = @ExampleProperty(mediaType = "application/json", value = "{ \n errorCode: 400, \n message: fail \n}")))
	})
	//    @ApiImplicitParams(
	//            value = {
	//                    @ApiImplicitParam(name = "nickname", value = "수정할 닉네임", required = true, dataTypeClass = String.class, paramType = "body")
	//            }
	//    )
	public ResponseEntity<?> updateMemberInfo(
		HttpServletRequest request,
		@ApiParam(value = "변경할 닉네임", required = true)
		@RequestParam String nickname);

	/*

	 */
	@ApiOperation(value = "회원 탈퇴", notes = "회원 정보를 삭제한다.")
	@ApiResponses(value = {
		@ApiResponse(code = 200, message = "탈퇴 성공", examples = @Example(value = @ExampleProperty(mediaType = "application/json", value = "ok"))),
		@ApiResponse(code = 400, message = "탈퇴 실패", examples = @Example(value = @ExampleProperty(mediaType = "application/json", value = "{ \n errorCode: 400, \n message: fail \n}")))
	})
	public ResponseEntity deleteMemberInfo(HttpServletRequest request);
}

package com.proj.withus.controller;

import java.util.Optional;

import javax.servlet.http.HttpServletRequest;

import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.proj.withus.controller.swagger.MemberSwagger;
import com.proj.withus.domain.Member;
import com.proj.withus.service.AlbumService;
import com.proj.withus.service.MemberService;
import com.proj.withus.util.JwtUtil;

import io.swagger.annotations.ApiParam;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;

@RestController
@Slf4j
@RequiredArgsConstructor
@RequestMapping(value = "/api/members", produces = MediaType.APPLICATION_JSON_VALUE)
public class MemberController implements MemberSwagger {

	private final MemberService memberService;
	private final AlbumService albumService;
	private final JwtUtil jwtUtil;

	@GetMapping
	public ResponseEntity<?> getMemberInfo(HttpServletRequest request) {
		Long memberId = (Long)request.getAttribute("memberId");
		Member memberInfo = memberService.getMemberInfo(memberId);
		return ResponseEntity.ok().body(memberInfo);
	}

	@PutMapping
	public ResponseEntity<?> updateMemberInfo(
		HttpServletRequest request,
		@ApiParam(value = "변경할 닉네임", required = true)
		@RequestParam String nickname) {

		Long memberId = (Long)request.getAttribute("memberId");
		Optional<Member> updatedInfo = memberService.updateMember(memberId, nickname);

		//        if (!updatedInfo.getNickname().equals(nickname)) {
		//            return new ResponseEntity<>("닉네임을 수정하지 못함", HttpStatus.BAD_REQUEST);
		//        }
		return ResponseEntity.ok().body(updatedInfo);
	}

	@DeleteMapping
	public ResponseEntity deleteMemberInfo(HttpServletRequest request) {
		Long memberId = (Long)request.getAttribute("memberId");
		albumService.deleteAlbum(memberId); // 앨범이 정상 삭제 되었는지 여부까지는 체크하지 않았음
		memberService.deleteMember(memberId);
		return new ResponseEntity(HttpStatus.OK);
	}
}

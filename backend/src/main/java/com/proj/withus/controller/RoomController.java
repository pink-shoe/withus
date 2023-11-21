package com.proj.withus.controller;

import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.Optional;

import javax.servlet.http.HttpServletRequest;

import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.proj.withus.controller.swagger.RoomSwagger;
import com.proj.withus.domain.Player;
import com.proj.withus.domain.Room;
import com.proj.withus.domain.dto.CreateRoomReq;
import com.proj.withus.domain.dto.GetRoomInfoRes;
import com.proj.withus.domain.dto.ModifyRoomReq;
import com.proj.withus.domain.dto.PlayerInfo;
import com.proj.withus.domain.dto.SocialMemberInfo;
import com.proj.withus.repository.RoomRepository;
import com.proj.withus.service.MemberService;
import com.proj.withus.service.RoomService;
import com.proj.withus.util.JwtUtil;

import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;

@RestController
@Slf4j
@RequiredArgsConstructor
@RequestMapping(value = "/api/rooms", produces = MediaType.APPLICATION_JSON_VALUE)
public class RoomController implements RoomSwagger {

	private final RoomService roomService;
	private final JwtUtil jwtUtil;
	private final RoomRepository roomRepository;

	private final MemberService memberService;

	@GetMapping("/info/{room_code}")
	public ResponseEntity<?> getRoomInfo(
		HttpServletRequest request,
		@PathVariable("room_code") int roomCode) {

		Long memberId;
		String token = (String)request.getAttribute("token");
		try {
			SocialMemberInfo socialMemberInfo = jwtUtil.extractMemberId(token);
			memberId = socialMemberInfo.getId();
		} catch (Exception e) {
			return new ResponseEntity<String>("권한이 없는 유저입니다.", HttpStatus.UNAUTHORIZED);
		}

		Room room = roomService.getRoomByCode(roomCode);
		Long roomId = room.getId();

		List<Player> players = roomService.getPlayerList(roomId);
		List<PlayerInfo> playerInfos = new ArrayList<>();
		for (Player player : players) {
			PlayerInfo playerInfo = PlayerInfo.builder()
				.playerId(player.getId())
				.nickname(memberService.getMemberInfo(player.getId()).getNickname())
				.teamType(player.getTeamType())
				.ready(player.isReady())
				.build();
			playerInfos.add(playerInfo);
		}

		GetRoomInfoRes getRoomInfoRes = GetRoomInfoRes.builder()
			.room(Optional.of(room))
			.playerInfos(playerInfos)
			.hostId(getHostId(roomId))
			.build();
		return new ResponseEntity<GetRoomInfoRes>(getRoomInfoRes, HttpStatus.OK);
	}

	@PostMapping
	public ResponseEntity<?> createRoom(
		HttpServletRequest request,
		@RequestBody CreateRoomReq createRoomReq) { // dto 새로 만들어야 함

		Room newRoom = roomService.createRoom(createRoomReq);
		return new ResponseEntity<Integer>(newRoom.getCode(), HttpStatus.CREATED);
	}

	@GetMapping("/{room_code}")
	public ResponseEntity<?> enterRoom(
		HttpServletRequest request,
		@PathVariable("room_code") int roomCode) {
		Long memberId = -1L;
		String loginType = "";
		String token = (String)request.getAttribute("token");
		try {
			SocialMemberInfo socialMemberInfo = jwtUtil.extractMemberId(token);
			memberId = socialMemberInfo.getId();
			loginType = socialMemberInfo.getLoginType();
		} catch (Exception e) {
			return new ResponseEntity<String>("권한이 없는 유저입니다.", HttpStatus.UNAUTHORIZED);
		}

		Optional<Room> room = roomService.enterRoom(roomCode, memberId);
		return new ResponseEntity<String>("방 입장이 완료되었습니다.", HttpStatus.OK);
	}

	@DeleteMapping("/{room_id}")
	public ResponseEntity<?> leaveRoom(
		HttpServletRequest request,
		@PathVariable("room_id") Long roomId) {

		String token = (String)request.getAttribute("token");
		SocialMemberInfo socialMemberInfo = jwtUtil.extractMemberId(token);
		Long memberId = socialMemberInfo.getId();

		roomService.leaveRoom(roomId, memberId);
		return new ResponseEntity<String>("방 나가기 성공",
			HttpStatus.OK); // 웹소켓에서 처리 가능한지에 따라 변경할 예정 (일단 String으로 성공 결과만 처리)
	}

	/*
	방장인거 확인하고, 방장 맞으면 처리.
	 */
	@PutMapping("/{room_id}")
	public ResponseEntity<?> modifyRoom(
		HttpServletRequest request,
		@PathVariable("room_id") Long roomId,
		@RequestBody ModifyRoomReq modifyRoomReq) {

		String token = ((String)request.getAttribute("token"));
		try {
			SocialMemberInfo socialMemberInfo = jwtUtil.extractMemberId(token);
			Long id = socialMemberInfo.getId();
			Long hostId = getHostId(roomId);
			if (hostId != id) {
				return new ResponseEntity<String>("방장이 아닙니다.", HttpStatus.FORBIDDEN);
			}
		} catch (Exception e) {
			return new ResponseEntity<String>("권한이 없는 유저입니다.", HttpStatus.FORBIDDEN);
		}

		boolean isValid = jwtUtil.validateJwtToken(token);

		if (!isValid) {
			return new ResponseEntity<String>("토큰이 만료되었습니다.", HttpStatus.UNAUTHORIZED);
		}
		roomService.modifyRoom(modifyRoomReq, roomId); // 반환 받아도 됨
		return new ResponseEntity<Integer>(roomService.getRoomInfo(roomId).get().getCode(), HttpStatus.OK);
	}

	@PutMapping("/members/social")
	public ResponseEntity<?> modifyNickname(
		HttpServletRequest request,
		@RequestBody String nickname) {
		log.info("nickname", nickname);
		Long id = -1L;
		String token = (String)request.getAttribute("token");

		try {
			SocialMemberInfo socialMemberInfo = jwtUtil.extractMemberId(token);
			id = socialMemberInfo.getId();
		} catch (Exception e) {
			return new ResponseEntity<String>("권한이 없는 유저입니다.", HttpStatus.UNAUTHORIZED);
		}
		log.info("modify nickname - id: ", id);

		try {
			int isSuccess = roomService.modifyNickname(id, nickname);
			if (isSuccess != 1) {
				return new ResponseEntity<String>("권한이 없습니다.", HttpStatus.UNAUTHORIZED);
			}
			return new ResponseEntity<String>("닉네임이 수정되었습니다.", HttpStatus.OK);
		} catch (Exception e) {
			return new ResponseEntity<String>("닉네임 수정에 실패했습니다.", HttpStatus.FORBIDDEN);
		}
	}

	@PostMapping("/ready/{room_id}")
	public ResponseEntity<?> setReady(
		HttpServletRequest request,
		@PathVariable("room_id") Long roomId) {

		String token = (String)request.getAttribute("token");
		SocialMemberInfo socialMemberInfo = jwtUtil.extractMemberId(token);
		Long memberId = socialMemberInfo.getId();

		Player player = roomService.getPlayerInRoom(memberId, roomId);
		if (player == null) {
			return new ResponseEntity<String>("참가자가 아닙니다.", HttpStatus.UNAUTHORIZED);
		}

		try {
			roomService.setReady(player.getId());
		} catch (Exception e) {
			return new ResponseEntity<String>("게임 준비에 실패했습니다.", HttpStatus.BAD_REQUEST);
		}

		List<Player> readyPlayer = roomService.getReadyPlayers(roomId);
		// return new ResponseEntity<List<Player>>(readyPlayer, HttpStatus.OK);
		//        return new ResponseEntity<Integer>(roomService.getRoomInfo(roomId).get().getCode(), HttpStatus.OK);
		return new ResponseEntity<String>("게임 준비 완료", HttpStatus.OK);
	}

	@PostMapping("/cancel/{room_id}")
	public ResponseEntity<?> cancelReady(
		HttpServletRequest request,
		@PathVariable("room_id") Long roomId) {

		String token = (String)request.getAttribute("token");
		SocialMemberInfo socialMemberInfo = jwtUtil.extractMemberId(token);
		Long memberId = socialMemberInfo.getId();

		Player player = roomService.getPlayerInRoom(memberId, roomId);
		if (player == null) {
			return new ResponseEntity<String>("참가자가 아닙니다.", HttpStatus.UNAUTHORIZED);
		}

		try {
			roomService.cancelReady(player.getId());
		} catch (Exception e) {
			return new ResponseEntity<String>("게임 준비 취소에 실패했습니다.", HttpStatus.BAD_REQUEST);
		}

		List<Player> readyPlayer = roomService.getReadyPlayers(roomId);
		// return new ResponseEntity<List<Player>>(readyPlayer, HttpStatus.OK);
		//        return new ResponseEntity<Integer>(roomService.getRoomInfo(roomId).get().getCode(), HttpStatus.OK);
		return new ResponseEntity<String>("게임 준비 취소 완료", HttpStatus.OK);
	}

	@GetMapping("/start/{room_id}")
	public ResponseEntity<?> isStart(
		HttpServletRequest request,
		@PathVariable("room_id") Long roomId) {

		SocialMemberInfo socialMemberInfo = jwtUtil.extractMemberId((String)request.getAttribute("token"));
		Long memberId = socialMemberInfo.getId();

		// Long host = roomService.getHostId(roomId);
		// if (host == null) {
		//     return new ResponseEntity<String>("방이 존재하지 않습니다.", HttpStatus.BAD_REQUEST);
		// }

		String startState = roomService.getStartStatus(roomId);
		if (startState.equals("no")) {
			return new ResponseEntity<String>("준비되지 않은 플레이어가 있습니다.", HttpStatus.BAD_REQUEST);
		} else if (startState.equals("playing")) {
			return new ResponseEntity<String>("이미 진행 중인 게임입니다.", HttpStatus.BAD_REQUEST);
		}

		// List<Player> players = roomService.getPlayerList(roomId);
		// return new ResponseEntity<List<Player>>(players, HttpStatus.OK);
		return new ResponseEntity<Boolean>(true, HttpStatus.OK);
	}

	// 트랜잭션 전파 문제 생겨서 일단 Service -> Controller에서 처리
	private Long getHostId(Long roomId) {
		Long hostId = roomRepository.findHostIdByRoomId(roomId);
		return hostId;
	}

	@PostMapping("/start/{room_id}")
	public ResponseEntity<?> getStart(
		HttpServletRequest request,
		@PathVariable("room_id") Long roomId) {

		SocialMemberInfo socialMemberInfo = jwtUtil.extractMemberId((String)request.getAttribute("token"));
		Long memberId = socialMemberInfo.getId();

		// member로 방 찾아서, start playing으로 바꾸기
		Room room = roomService.setStart(memberId, roomId);

		// 랜덤 문제 선정 -> problem 저장
		roomService.makeProblem(room.getId(), room.getRound());

		Map<String, Boolean> answer = new HashMap<>();
		answer.put("data", true);

		// ok
		return new ResponseEntity<Map<String, Boolean>>(answer, HttpStatus.OK);
	}
}

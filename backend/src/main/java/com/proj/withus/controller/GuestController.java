package com.proj.withus.controller;


import com.proj.withus.domain.Member;
import com.proj.withus.domain.Player;
import com.proj.withus.domain.Room;
import com.proj.withus.domain.dto.EnterRoomRes;
import com.proj.withus.domain.dto.GuestLoginRes;
import com.proj.withus.domain.dto.ModifyRoomReq;
import com.proj.withus.domain.dto.PlayerInfoDto;
import com.proj.withus.repository.RoomRepository;
import com.proj.withus.service.MemberService;
import com.proj.withus.service.RoomService;
import com.proj.withus.util.JwtUtil;
import io.swagger.annotations.*;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import javax.servlet.http.HttpServletRequest;
import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

@Api(tags = "게스트 API", description = "게스트와 관련된 기능을 처리하는 API (GuestController)")
@RestController
@Slf4j
@RequiredArgsConstructor
@RequestMapping(value = "/api/members/guest", produces = MediaType.APPLICATION_JSON_VALUE)
@ApiResponses({
        @ApiResponse(code = 400, message = "Bad Request", examples = @Example(value = @ExampleProperty(mediaType = "application/json", value = "{ \n errorCode: 400, \n message: bad request \n}"))),
})
public class GuestController {

    private final MemberService memberService;
    private final JwtUtil jwtUtil;
    private final RoomService roomService;
    private final RoomRepository roomRepository;

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
    @PostMapping("/temp/{room_code}") // 게스트 회원가입 (api 설계서와 다르게 room_code를 추가함)
    public ResponseEntity<?> guestLogin(
            @PathVariable("room_code") int roomCode,
//            @ApiParam(value = "사용할 닉네임", required = true)
            @RequestBody String nickname) {
        // 일단 회원 등록 먼저
        Member guest = new Member();
        guest.setNickname(nickname);
        guest.setLoginType("guest");
        Member savedGuest = memberService.createMember(guest);
        Long guestId = savedGuest.getId();

        // jwt 생성
        String jwtToken = "";
        jwtToken = jwtUtil.generateJwtToken(guestId, guest.getLoginType());

        //
        GuestLoginRes guestLoginRes = new GuestLoginRes();
        Optional<Room> room = roomService.enterRoom(roomCode, guestId);
        if (!room.isPresent()) {
            return new ResponseEntity<String>("존재하지 않는 방입니다.", HttpStatus.BAD_REQUEST);
        } else {
            EnterRoomRes enterRoomRes = new EnterRoomRes();
            enterRoomRes.setRoomId(room.get().getId());
            enterRoomRes.setRoomType(room.get().getType());
            enterRoomRes.setCode(String.valueOf(room.get().getCode()));
            enterRoomRes.setHostId(getHostId(room.get().getId()));

            List<Player> playerList = roomService.getPlayerList(room.get().getId());
            List<PlayerInfoDto> playerInfos = new ArrayList<>();
            for (Player player : playerList) {
                PlayerInfoDto playerInfo = new PlayerInfoDto();
                playerInfo.setMemberId(player.getId());
                playerInfo.setNickname(memberService.getMemberInfo(player.getId()).getNickname());
                playerInfo.setReady(roomService.getReadyStatus(player.getId()));
                // PlayerInfoDto.builder()
                // .memberId(player.getId())
                // .nickname(memberService.getMemberInfo(player.getId()).getNickname())
                // .ready(roomService.getReadyStatus(player.getId()))
                // .build();

                playerInfos.add(playerInfo);
            }
            // PlayerInfoDto playerInfo = PlayerInfoDto.builder()
            //     .memberId().build();
            enterRoomRes.setPlayers(playerInfos);

            guestLoginRes.setEnterRoomRes(enterRoomRes);
            guestLoginRes.setJwtToken(jwtToken);
            return new ResponseEntity<GuestLoginRes>(guestLoginRes, HttpStatus.OK);
        }
    }

    @ApiOperation(value = "게스트 닉네임 수정", notes = "게스트는 닉네임을 수정한다. ")
    @ApiResponses(value = {
            @ApiResponse(code = 200, message = "게스트 닉네임 수정 성공", response = Member.class),
            @ApiResponse(code = 400, message = "게스트 닉네임 수정 실패", examples = @Example(value = @ExampleProperty(mediaType = "application/json", value = "{ \n errorCode: 400, \n message: fail \n}"))),
    })
    @ApiImplicitParam(name = "nickname", value = "닉네임", required = true, dataType = "String", paramType = "body")
    @PutMapping
    public ResponseEntity<?> modifyGuestNickname(
            HttpServletRequest request,
//            @ApiParam(value = "변경할 닉네임", required = true)
            @RequestBody String nickname) {

        Long memberId = (Long) request.getAttribute("memberId");
        Member updatedInfo = memberService.updateMember(memberId, nickname);

        if (updatedInfo == null) {
            return new ResponseEntity<>("회원 정보 찾을 수 없음", HttpStatus.BAD_REQUEST);
        }
        if (!updatedInfo.getNickname().equals(nickname)) {
            return new ResponseEntity<>("닉네임을 수정하지 못함", HttpStatus.BAD_REQUEST);
        }
        return ResponseEntity.ok().body(updatedInfo);

    }

    // 트랜잭션 전파 문제 생겨서 일단 Service -> Controller에서 처리
    private Long getHostId(Long roomId) {
        Long hostId = roomRepository.findHostIdByRoomId(roomId);
        System.out.println("hostId~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~");
        System.out.println(hostId);
        return hostId;
    }
}

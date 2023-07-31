package com.proj.withus.service;

import com.proj.withus.domain.Member;
import com.proj.withus.domain.Player;
import com.proj.withus.domain.Room;
import com.proj.withus.domain.dto.CreateRoomReq;
import com.proj.withus.repository.MemberRepository;
import com.proj.withus.repository.PlayerRepopsitory;
import com.proj.withus.repository.RoomRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import javax.transaction.Transactional;
import java.util.Optional;
import java.util.concurrent.ThreadLocalRandom;

@Service
@Transactional
@RequiredArgsConstructor
public class RoomService {

    private final RoomRepository roomRepository;
    private final MemberRepository memberRepository;
    private final PlayerRepopsitory playerRepopsitory;

    public Room createRoom(CreateRoomReq createRoomReq) {
        Member member = memberRepository.findById(createRoomReq.getId())
                        .orElseThrow(() -> new IllegalArgumentException("invalid" + createRoomReq.getId()));

        Room room = new Room();
        room.setMember(member);
        room.setCode(createCode());
        room.setType(createRoomReq.getRoomType());
        room.setRound(createRoomReq.getRoomRound());
        return roomRepository.save(room);
    }

    public Optional<Room> enterRoom(Long roomId, Long memberId) {
        // 해당 방에 참가자 등록하기 (Player 테이블) // team type 일단 패스
        Player player = new Player();
        player.setRoom(roomRepository.findById(roomId).orElseThrow(() -> new IllegalArgumentException("Room not found")));
        player.setMember(memberRepository.findById(memberId).orElseThrow(() -> new IllegalArgumentException("Member not found")));
        Player savedPlayer = playerRepopsitory.save(player); // 반환을 지정해줘도, 주지 않아도 됨 // 예외 처리를 위해서는 받는게 좋지 않을까

        return roomRepository.findById(roomId);
    }

    public boolean leaveRoom(Long roomId, Long memberId) {

        return true;
    }


    // 어떻게 하는거임?
    public Long getHostId(Long roomId) {
        roomRepository.findHostIdByRoomId(roomId);

        /*
        select member_id
        from room
        where room_id = roomId
         */
    }

    private int createCode() {
        int randomCode = ThreadLocalRandom.current().nextInt(100000, 1000000); // 일단 십진수로 처리 (추후에 16진수로 변경 예정)

        /*
         code 중복 검사 필요
         */

        return randomCode;
    }
}

package com.proj.withus.service;

import com.proj.withus.domain.Member;
import com.proj.withus.domain.Player;
import com.proj.withus.domain.Room;
import com.proj.withus.domain.dto.CreateRoomReq;
import com.proj.withus.domain.dto.ModifyRoomReq;
import com.proj.withus.repository.MemberRepository;
import com.proj.withus.repository.PlayerRepository;
import com.proj.withus.repository.RoomRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import javax.transaction.Transactional;
import java.util.List;
import java.util.Optional;
import java.util.concurrent.ThreadLocalRandom;

@Service
@Transactional
@RequiredArgsConstructor
public class RoomServiceImpl implements RoomService {

    private final RoomRepository roomRepository;
    private final MemberRepository memberRepository;
    private final PlayerRepository playerRepository;

    public Room createRoom(CreateRoomReq createRoomReq) {
        System.out.println(createRoomReq.getId());

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
        Player savedPlayer = playerRepository.save(player); // 반환을 지정해줘도, 주지 않아도 됨 // 예외 처리를 위해서는 받는게 좋지 않을까

        return roomRepository.findById(roomId);
    }

    /*
    [player 삭제하기]
    delete from player
    where room_id = roomId
    => 근데 이건 맞아도, player를 삽입할 때 member의 정보를 끌고 와야겠네
     */

    /*
   "member: {
    memberId: Long
    nickname: String
    hostId: Long
    }[]: Object[]"
    해당 방에 대한 정보?
     */
    public void leaveRoom(Long roomId, Long memberId) {
        playerRepository.deleteByRoomId(roomId);

        /*
        [방장일 경우 방 삭제하는 로직]
         Room을 검색해서, memberId(방장)에 해당하는 Room이 있으면 삭제
        delete from room
        where id = memberId
         */
        roomRepository.deleteById(memberId);
    }

    /*
    update room
    set type = roomType, code = roomCode, round = roomRound // roomCode는 없음
    where room_id = roomId
     */
    public int modifyRoom(ModifyRoomReq req, Long roomId) {
        int resultVal = roomRepository.updateRoom(req, roomId);
        return resultVal;
    }

    public int modifyNickname(Long id, String nickname) {
        return memberRepository.updateNickname(id, nickname);
    }

    /*
    select member_id
    from room
    where room_id = roomId
    */
    public Long getHostId(Long roomId) {
        Long hostId = roomRepository.findHostIdByRoomId(roomId);
        return hostId;
    }

    /*
    select *
    from player
    where room_id = roomId
     */
    public List<Player> getPlayerList(Long roomId) {
        return playerRepository.findAllByRoomId(roomId);
    }

    public int createCode() {
        int randomCode = ThreadLocalRandom.current().nextInt(100000, 1000000); // 일단 십진수로 처리 (추후에 16진수로 변경할 듯)
        /*
         code 중복 검사 필요
         */
        return randomCode;
    }


}

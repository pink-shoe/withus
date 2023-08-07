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
import org.springframework.transaction.annotation.Propagation;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
import java.util.Optional;
import java.util.concurrent.ThreadLocalRandom;

@Service
@RequiredArgsConstructor
@Transactional
public class RoomServiceImpl implements RoomService {

    private final RoomRepository roomRepository;
    private final MemberRepository memberRepository;
    private final PlayerRepository playerRepository;

    public Optional<Room> getRoomByCode(int roomCode) {
        return roomRepository.findRoomByCode(roomCode);
    }

    public Room createRoom(CreateRoomReq createRoomReq) {
        System.out.println(createRoomReq.getId());

        Member member = memberRepository.findById(createRoomReq.getId())
            .orElseThrow(() -> new IllegalArgumentException("invalid" + createRoomReq.getId()));

        // Room에 접근
        Room room = new Room();
        room.setMember(member);
        room.setCode(createCode());
        room.setType(createRoomReq.getRoomType());
        room.setRound(createRoomReq.getRoomRound());
        Room savedRoom = roomRepository.save(room); // 영속성 전이 문제로, 일단 저장 후 Player에서 set Room

        // Player에 접근
        Player player = new Player();
        player.setId(createRoomReq.getId());
        player.setMember(memberRepository.findById(createRoomReq.getId()).orElseThrow(() -> new IllegalArgumentException("Member not found")));
        player.setRoom(savedRoom);
        playerRepository.save(player);

        return savedRoom;
    }

    public Optional<Room> enterRoom(int roomCode, Long memberId) {
        // 해당 방에 참가자 등록하기 (Player 테이블) // team type 일단 패스
        Player player = new Player();
        player.setId(memberId);
        player.setRoom(roomRepository.findRoomByCode(roomCode).orElseThrow(() -> new IllegalArgumentException("Room not found")));
        player.setMember(memberRepository.findById(memberId).orElseThrow(() -> new IllegalArgumentException("Member not found")));
        Player savedPlayer = playerRepository.save(player); // 반환을 지정해줘도, 주지 않아도 됨 // 예외 처리를 위해서는 받는게 좋지 않을까

        return roomRepository.findRoomByCode(roomCode);
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
        Long hostId = roomRepository.findHostIdByRoomId(roomId);

        if (hostId == memberId) {
            System.out.println("방장임!!!!!!!!!!!!!!!!!");
            playerRepository.deleteByRoomId(roomId);
            roomRepository.deleteById(roomId);
            return;
        }

        System.out.println("방장 아님!!!!!!!!!!!!!!");
        playerRepository.deletePlayerByMemberId(memberId);
    }

    /*
    update room
    set type = roomType, code = roomCode, round = roomRound // roomCode는 없음
    where room_id = roomId
     */
    @Transactional(propagation = Propagation.REQUIRED)
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
    //    public Long getHostId(Long roomId) {
    //        Long hostId = roomRepository.findHostIdByRoomId(roomId);
    //        System.out.println("hostId~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~");
    //        System.out.println(hostId);
    //        return hostId;
    //    }

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

    /*
    select *
    from player
    where room_id = roomId
    and member_id = memberId
     */
    public Player getPlayerInRoom(Long memberId, Long roomId) {
        return playerRepository.findPlayerByMemberIdAndRoomId(memberId, roomId);
    }

    /*
    update player
    set ready = readyStatus
    where player_id = playerId
     */
    public int modifyReady(Long playerId, boolean readyStatus) {
        return playerRepository.updateReady(playerId, readyStatus);
    }

    /*
    select *
    from player
    where room_id = roomId
    and ready = true

    update room
    set start = startStatus
    where room_id = roomId
     */
    public List<Player> getReadyPlayers(Long roomId) {
        List<Long> readyMember = playerRepository.findReadyPlayersByRoomId(roomId);
        List<Player> totalMember = playerRepository.findAllByRoomId(roomId);
        if (readyMember.size() == totalMember.size()) {
            roomRepository.updateStart(roomId, true);
        } else {
            roomRepository.updateStart(roomId, false);
        }
        // return readyMember;
        return totalMember;
    }

    public boolean getReadyStatus(Long playerId) {
        return playerRepository.findPlayerById(playerId);
    }

    public boolean getStartStatus(Long roomId) {
        return roomRepository.findStartStatusByRoomId(roomId);
    }
}

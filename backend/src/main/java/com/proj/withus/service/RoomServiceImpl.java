package com.proj.withus.service;

import com.proj.withus.domain.Member;
import com.proj.withus.domain.Player;
import com.proj.withus.domain.Room;
import com.proj.withus.domain.dto.CreateRoomReq;
import com.proj.withus.domain.dto.ModifyRoomReq;
import com.proj.withus.exception.CustomException;
import com.proj.withus.exception.ErrorCode;
import com.proj.withus.repository.MemberRepository;
import com.proj.withus.repository.PlayerRepository;
import com.proj.withus.repository.RoomRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Propagation;
import org.springframework.transaction.annotation.Transactional;

import javax.persistence.EntityManager;
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
    private final EntityManager entityManager;

    public Room getRoomByCode(int roomCode) {
        return roomRepository.findRoomByCode(roomCode)
                .orElseThrow(() -> new CustomException(ErrorCode.ROOM_NOT_FOUND));
    }

    public Room createRoom(CreateRoomReq createRoomReq) {

        Member member = memberRepository.findById(createRoomReq.getId())
            .orElseThrow(() -> new CustomException(ErrorCode.MEMBER_NOT_FOUND));

        if (createRoomReq.getRoomRound() != 3 && createRoomReq.getRoomRound() != 5) {
            throw new CustomException(ErrorCode.ROOM_DISABLE_ROUND);
        }
        if (!createRoomReq.getRoomType().trim().equals("coop") && !createRoomReq.getRoomType().trim().equals("team")) {
            throw new CustomException(ErrorCode.ROOM_DISABLE_TYPE);
        }

        createRoomReq.setRoomRound(5);
        createRoomReq.setRoomType("coop");

        int roomCode = -1;
        while (true) {
            roomCode = createCode();
            if (!roomRepository.findRoomByCode(roomCode).isPresent()) {
                break;
            }
        }

//        roomRepository.findByMemberId(createRoomReq.getId())
//                .ifPresent(room -> {
//                    throw new CustomException(ErrorCode.DUPLICATE_HOST);
//                });

        // Room에 접근
        Room room = new Room();
        room.setMember(member);
        room.setCode(roomCode);
        room.setType(createRoomReq.getRoomType());
        room.setRound(createRoomReq.getRoomRound());
        Room savedRoom = roomRepository.save(room); // 영속성 전이 문제로, 일단 저장 후 Player에서 set Room

        // Player에 접근
        Player player = new Player();
        player.setId(createRoomReq.getId());
        player.setMember(memberRepository.findById(createRoomReq.getId())
                .orElseThrow(() -> new CustomException(ErrorCode.MEMBER_NOT_FOUND)));
        player.setRoom(savedRoom);
        playerRepository.save(player);

        return savedRoom;
    }

    public Optional<Room> enterRoom(int roomCode, Long memberId) {
        // 해당 멤버가 들어간 방이 있는 경우(튕긴 멤버일 경우 허용)
        Optional<Room> room = playerRepository.findRoomIdByPlayerId(memberId);
        if (room.isPresent()) {
            if (room.get().getCode() == roomCode) {
                return room;
            }
//            throw new CustomException(ErrorCode.DUPLICATE_MEMBER_IN_ROOM);
        }
//        roomRepository.findByMemberId(memberId)
//                        .ifPresent(room -> {
//                            throw new CustomException(ErrorCode.DUPLICATE_MEMBER_IN_ROOM);
//                        });

        int count = playerRepository.countPlayersByRoomCode(roomCode);
        if (count == 4) {
            throw new CustomException(ErrorCode.ROOM_FULL);
        }

        String startStatus = roomRepository.findStartStatusByRoomId(roomRepository.findRoomByCode(roomCode).get().getId());
        if (startStatus.equals("playing")) {
            throw new CustomException(ErrorCode.ALREADY_PLAYING);
        }

        Player player = new Player();
        player.setId(memberId);
        player.setRoom(roomRepository.findRoomByCode(roomCode)
                .orElseThrow(() -> new CustomException(ErrorCode.ROOM_NOT_FOUND)));
        player.setMember(memberRepository.findById(memberId)
                .orElseThrow(() -> new CustomException(ErrorCode.MEMBER_NOT_FOUND)));
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
        /*
        1. room에서 해당 멤버 빼고,
        2. player에서 해당 멤버 빼고,
        3. 방장이면 아예 room도 빼고
         */

        // member id 없는 경우, room id 없는 경우
        memberRepository.findById(memberId)
                        .orElseThrow(() -> new CustomException(ErrorCode.MEMBER_NOT_FOUND));
        playerRepository.findById(memberId)
                        .orElseThrow(() -> new CustomException(ErrorCode.PLAYER_NOT_FOUND));

        Long hostId = roomRepository.findHostIdByRoomId(roomId);
        if (hostId == memberId) {
            // playerRepository.deleteAllByRoom_Id(roomId);
            roomRepository.deleteById(roomId);
            // throw new CustomException(ErrorCode.HOST_LEAVE);
        } else {
            playerRepository.deletePlayerByMemberId(memberId);
        }

        // guest인 경우 탈퇴 처리
        Member member = memberRepository.findById(memberId).get();
        if (member.getLoginType().equals("guest")) {
            memberRepository.delete(member);
        }
    }
    /*
    update room
    set type = roomType, code = roomCode, round = roomRound // roomCode는 없음
    where room_id = roomId
     */
    @Transactional(propagation = Propagation.REQUIRED)
    public int modifyRoom(ModifyRoomReq req, Long roomId) {

        if (req.getRoomRound() == 0) {
            throw new CustomException(ErrorCode.ROOM_NOT_ROUND);
        }
        if (req.getRoomType().equals("none")) {
            throw new CustomException(ErrorCode.ROOM_NOT_TYPE);
        }
        if (req.getRoomRound() != 3 && req.getRoomRound() != 5) {
            throw new CustomException(ErrorCode.ROOM_DISABLE_ROUND);
        }
        if (!req.getRoomType().trim().equals("coop") && !req.getRoomType().trim().equals("team")) {
            throw new CustomException(ErrorCode.ROOM_DISABLE_TYPE);
        }


        int resultVal = roomRepository.updateRoom(req, roomId);
        return resultVal;
    }

    public Optional<Room> getRoomInfo(Long roomId) {
        return roomRepository.findRoomById(roomId);
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
        return playerRepository.findAllByRoom_Id(roomId);
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
        return playerRepository.findPlayerByMember_IdAndRoom_Id(memberId, roomId).orElse(null);
    }

    /*
    update player
    set ready = readyStatus
    where player_id = playerId
     */
    public int setReady(Long playerId) {
        return playerRepository.setReady(playerId);
    }

    public int cancelReady(Long playerId) {
        return playerRepository.cancelReady(playerId);
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
        List<Long> readyMember = playerRepository.findReadyPlayersByRoomIdWithoutHost(roomId, roomRepository.findHostIdByRoomId(roomId));
        List<Player> totalMember = playerRepository.findAllByRoom_Id(roomId);

        if (readyMember.size() == totalMember.size() - 1 && totalMember.size() != 1) { // host 제외
            roomRepository.updateStart(roomId, "yes");
        } else {
            roomRepository.updateStart(roomId, "no");
        }
        // return readyMember;
        return totalMember;
    }

    public boolean getReadyStatus(Long playerId) {
        return playerRepository.findPlayerById(playerId);
    }

    public String getStartStatus(Long roomId) {
        if (playerRepository.findAllByRoom_Id(roomId).size() < 4) {
            throw new CustomException(ErrorCode.LACK_OF_PLAYERS);
        }
        return roomRepository.findStartStatusByRoomId(roomId);
    }

    public int updateCurrentRound(Long roomId, int currentRound) {
        roomRepository.updateCurrentRound(roomId, currentRound);
        entityManager.clear();
        return roomRepository.findRoomById(roomId).map(Room::getCurrentRound)
                .orElseThrow(() -> new CustomException(ErrorCode.ROOM_NOT_FOUND));
    }
}

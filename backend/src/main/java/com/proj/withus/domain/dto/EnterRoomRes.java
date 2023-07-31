package com.proj.withus.domain.dto;

import com.proj.withus.domain.Member;
import lombok.Getter;
import lombok.RequiredArgsConstructor;
import lombok.Setter;

import java.util.ArrayList;
import java.util.List;

@Getter @Setter
@RequiredArgsConstructor
public class EnterRoomRes {

    /*
    roomId: Long
    roomtype: int
    hostId: Long
    code: String
    member: {
    memberId: Long
    nickname: String
    }[]: Object[]
     */
    private Long roomId;
    private int roomType;
    private Long hostId;
    private String code; // 일단 10진수여도 String으로 하는걸로?
    private List<Member> member = new ArrayList<>();



}

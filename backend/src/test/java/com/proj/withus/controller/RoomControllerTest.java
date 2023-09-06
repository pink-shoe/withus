package com.proj.withus.controller;

import com.fasterxml.jackson.databind.ObjectMapper;
import com.proj.withus.domain.Member;
import com.proj.withus.domain.Room;
import com.proj.withus.domain.dto.CreateRoomReq;
import com.proj.withus.repository.RoomRepository;
import com.proj.withus.service.MemberService;
import com.proj.withus.service.RoomService;
import com.proj.withus.util.JwtUtil;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.DisplayName;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.web.servlet.AutoConfigureMockMvc;
import org.springframework.boot.test.autoconfigure.web.servlet.WebMvcTest;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.boot.test.mock.mockito.MockBean;
import org.springframework.context.annotation.Import;
import org.springframework.http.MediaType;
import org.springframework.test.web.servlet.MockMvc;
import org.springframework.test.web.servlet.setup.MockMvcBuilders;
import org.springframework.web.context.WebApplicationContext;
import org.springframework.web.filter.CharacterEncodingFilter;

import static org.junit.jupiter.api.Assertions.*;
import static org.mockito.ArgumentMatchers.any;
import static org.mockito.Mockito.when;
//import static org.springframework.test.web.client.match.MockRestRequestMatchers.content;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.*;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.*;

@Import(JwtUtil.class)
@WebMvcTest(RoomController.class) // 전체 context가 아닌, 특정 controller만 테스트하기 위한 annotation
class RoomControllerTest {

    public String jwt; // protected로 쓰는 예시를 봤음!

    @Autowired
    private MockMvc mockMvc;

//    @MockBean
    @Autowired
    private JwtUtil jwtUtil;

    @MockBean
    private MemberService memberService; // 사용하지 않는데도 불구하고 선언해주지 않으면 에러나네..

    @MockBean
    private RoomService roomService;

    @MockBean
    private RoomRepository roomRepository;

    private ObjectMapper objectMapper = new ObjectMapper();

//    // 인터셉터 무시 처리 포함한 @BeforeEach
//    @BeforeEach
//    public void setup() {
//        this.mockMvc = MockMvcBuilders.webAppContextSetup(context)
//                .addFilters(new CharacterEncodingFilter("UTF-8", true))
//                .dispatchOptions(true)
//                .build();
//    }

    @BeforeEach
    void set() {
        jwt = jwtUtil.generateJwtToken(1L, "kakao");
        Long tempNum = 123L;
        System.out.println(tempNum.toString());
        System.out.println("jwt: " + jwt);
    }

    @Test
    @DisplayName("방 생성 성공 확인 테스트")
    void createRoom() throws Exception {
        CreateRoomReq createRoomReq = new CreateRoomReq();

        Member member = new Member();
        member.setId(1L);
        member.setEmail("8dener@gmail.com");
        member.setNickname("woochanhee");
        member.setLoginType("kakao");

        createRoomReq.setId(3L);
        createRoomReq.setRoomType("coop");
        createRoomReq.setRoomRound(5);

        Room mockRoom = new Room();
        mockRoom.setCode(123456);

        when(roomService.createRoom(any(CreateRoomReq.class))).thenReturn(mockRoom);

        mockMvc.perform(
                post("/api/rooms")
                        .header("Authorization", "Bearer " + jwt)
                        .contentType(MediaType.APPLICATION_JSON)
                        .content(objectMapper.writeValueAsString(createRoomReq))
                )
                .andExpect(status().isCreated())
                .andExpect(content().json("123456"));
    }
}
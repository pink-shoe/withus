# [] WITH US

## 서비스 소개

---
다같이 도형을 만들고 AI가 맞추는 아이스브레이킹 게임, With Us!  

> With Us에서 몸을 움직이며, 사람들과의 어색함을 풀어보아요!  

프로젝트 기간: 2023.07.04 ~ 2023.08.18(6주)  

## 기술 스택

- **FrontEnd**  
  **Language |** JavaScript, TypeScript  
  **Framework |** React 18.2.0  
  **Engine |** Node 20.4.2  
  **Library |** Jotai, Tailwind, ..

  <br/>
- **BackEnd**  

  **Language |** Java 11  
  **Framework |** Spring Boot 2.7.13  
  **DB |** MySQL 8.0.33, Spring Data JPA  
  **Build Tool |** Gradle 8.1.1  
  <br/>
- **AI**  
  **Language |** Python 3.8.10  
  **Framework |** Flask 2.3.2  

  <br/>

- **WebRTC**  
  - Openvidu 2.28.0  
  <br/>
  
- **Pose Detection**  

  <br/>
  
- **CI/CD**  
  - AWS EC2
  - AWS S3
  - Docker
  - Nginx  
  - Gunicorn  
  - Jenkins  
    <br/>  

- **Tool**
  - Git
  - Jira
  - Notion
  - MatterMost

---


## 팀 소개

|      | 권기윤 (팀장)  | 김예빈  | 이두현  | 이민영  | 우찬희 | 이지은  |  
|:----:|:---------:|:----:|:----:|:----:|:----:|:----:|
|  이름  | Infra, AI |  FE  |  FE  |  FE  | BE |  BE  |

## 주요 기능

---
### 1. 로그인
  - 소셜 로그인(구글/카카오)  
    > 플레이어는 소셜 로그인 후 게임 방을 생성할 수 있습니다.

    ![withus 카카오](docs/카카오 로그인.GIF)
  - 게스트  
    > 게스트는 닉네임과 방 코드를 입력해 게임에 참여할 수 있습니다.  

### 2. 대기실
  - 닉네임 변경  
    > 플레이어는 대기실에서 닉네임 수정할 수 있습니다. 변경된 닉네임은 실시간으로 확인할 수 있습니다.  
  - 채팅  
    > 플레이어들은 실시간으로 채팅을 이용해 소통할 수 있습니다. 

### 3. 게임   
  - 게임 진행  
    > 총 5라운드로 진행되며, 플레이어가 합심에 팔을 이용해 주어진 도형을 표현합니다. AI는 플레이어가 만든 도형과 정답을 비교한 후 정답 여부를 알려줍니다.
  - MVP 투표  
    > 게임 결과가 나오기 전, 플레이어는 게임의 MVP를 투표해 선정할 수 있습니다.  

  1. 게스트 ver  
     ![게스트 시연](docs/게스트 시연.GIF)
  2. 로그인 ver  
     ![withus 방장 시연](docs/방장 시연.GIF)

### 4. 앨범
  - 사진 조회  
    > 플레이어는 게임 플레이 사진을 앨범에서 조회하고, 다양한 프레임을 사용해 배치할 수 있습니다.    
    
    ![withus 사진](docs/앨범.GIF)
  - 사진 QR 저장  
    > 플레이어는 게임 플레이 사진을 QR 코드로 다운 받을 수 있습니다.
    


## API 명세

---
### [API 명세서 전체 보기](https://docs.google.com/spreadsheets/d/1_ibyCUzroQdF4HLyg2jRdpOz7aF99Q1AtgkwqjBDmMU/edit?usp=sharing)

![withus API 일부](docs/API 명세 일부.PNG)

## DB 설계

---

![withusERD.png](docs/withusERD.png)

## 아키텍처 설계

---

![withus 아키텍처.png](docs/withus 아키텍처.png)

<br/> 

### 최종 산출물

---
### [👉 UCC 보러가기 👈](https://www.youtube.com/watch?v=fLDroW6CujI)  

### [👉 최종 발표 ppt 👈](docs/공통프로젝트_최종발표.pdf)

<br/> 

### 노션

---
### [노션 바로가기](https://butter-clematis-bc0.notion.site/A704-ceed8f9d6d2a4c0594aef6fdb6658592?pvs=4)
<br/> 


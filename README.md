# GIT COMMIT 컨벤션

### 1. Commit 메시지 구조

---

기본 적인 커밋 메시지 구조는 **`제목`, `본문`, `꼬리말`** 세가지 파트로 나누고, 각 파트는 빈 줄을 두어 구분한다.

단, 맨 처음에 대괄호로 FE/BE를 명시한다.

```
[FE/BE] type: subject

body

footer
```

### 2. Commit Type

---

타입은 태그와 제목으로 구성되고, 태그는 영어(소문자)로 쓰되 제목은 한글로 쓴다.

**`태그: 제목`의 형태이며, `:`뒤에만 space가 있음에 유의한다.**

- `feat` : 새로운 기능 추가
- `fix` : 버그 수정
- `docs` : 문서 수정
- `style` : 코드 포맷팅, 세미콜론(;) 누락, 코드 변경이 없는 경우
- `refactor` : 코드 리펙토링
- `test` : 테스트 코드, 리펙토링 테스트 코드 추가
- `chore` : 빌드 업무 수정, 패키지 매니저 수정

![Untitled](GIT%20COMMIT%20%E1%84%8F%E1%85%A5%E1%86%AB%E1%84%87%E1%85%A6%E1%86%AB%E1%84%89%E1%85%A7%E1%86%AB%207439841383f3441c816c148c5811ed28/Untitled.png)

### 3. Subject

---

- 제목은 최대 50글자가 넘지 않도록 하고 마침표 및 특수기호는 사용하지 않는다.
- 한글로 표기하되, 동사형으로 끝내지 않는다.
- 제목은 **개조식 구문**으로 작성한다.
    - 완전한 서술형 문장이 아니라, 간결하고 요점적인 서술을 의미.

```
ex. 

[BE] style: 들여쓰기 통일
```

### 4. Body

---

본문은 다음의 규칙을 지킨다.

- 본문은 한 줄 당 72자 내로 작성한다.
- 본문 내용은 양에 구애 받지 않고 최대한 상세히 작성한다.
- 본문 내용은 어떻게 변경했는지 보다 무엇을 변경했는지 또는 왜 변경했는지 설명한다.

### 5. footer

---

꼬릿말은 다음의 규칙을 지킨다.

- 꼬리말은 `optional`이고 `이슈 트래커 ID`를 작성한다.
- 꼬리말은 `"유형: #이슈 번호"` 형식으로 사용한다.
- 여러 개의 이슈 번호를 적을 때는 `쉼표(,)`로 구분한다.
- 이슈 트래커 유형은 다음 중 하나를 사용한다.`Fixes`
    - 이슈 수정 중 (아직 해결되지 않은 경우)`Resolves`
    - 이슈를 해결했을 때 사용`Ref`
    - 참고할 이슈가 있을 때 사용`Related to`
    - 해당 커밋에 관련된 이슈번호 (아직 해결되지 않은 경우)
        
        ```jsx
        ex)
        
        type: ~~~
        
        ...
        
        Fixes: #45
        Related to: #48, #45
        ```
        

### 6. Commit 예시

---

```
[BE] feat: WebRtc 화면 송출 기능 개발

Openvidu를 사용하여 WebRtc화면 송출 기능 개발

Resolves: #123
Ref: #456
Related to: #48, #45
```


# GIT FLOW (깃 전략)

### 깃 브랜치 전략

---

- master : 제품으로 출시될 수 있는 브랜치
- develop : 다음 출시 버전을 개발하는 브랜치
- feature : 기능을 개발하는 브랜치
- release : 이번 출시 버전을 준비하는 브랜치
- hotfix : 출시 버전에서 발생한 버그를 수정 하는 브랜치

### 깃 브랜치 네이밍

---

브랜치명/깃허브아이디/기능

ex) feature/jini11/google-social-login

### 깃 브랜치 전략 진행 예시

---

![출처 : [https://techblog.woowahan.com/2553/](https://techblog.woowahan.com/2553/)](GIT%20FLOW%20(%E1%84%80%E1%85%B5%E1%86%BA%20%E1%84%8C%E1%85%A5%E1%86%AB%E1%84%85%E1%85%A3%E1%86%A8)%20c2f701bfb3ed4285b564fcf25b901244/Untitled.png)

출처 : [https://techblog.woowahan.com/2553/](https://techblog.woowahan.com/2553/)

### 깃 풀리퀘스트 전략

---

- Pull Request 진행 방식
    - Pull Request 방식을 채택한 이유
        - 개발 후 merge 전 `코드 리뷰`
- `feature/#1` → `develop` branch Pull Request 예시.
    
    ```bash
    git add .
    git status
    git commit -m "커밋 컨벤션 메세지"
    git push origin 브랜치이름
    ```
    
- Reviewers와 Assignees 는 각 Pull Request마다 반드시 한 명 이상 참여한다
    - Reviewer : 현재 Pull Request(PR)을 리뷰를 해 줄 팀원.
    - Assignee : 현재 PR 작업의 담당자
- Reviewer는 구체적이고 명확하게 comment를 적는다.

### 깃 머지 전략

---

- `develop` ↔ `feature`
    - `squash & merge` 를 사용한다.
        - 이유
            - feature의 복잡한 커밋 히스토리를 새로운 커밋으로 develop branch에 추가해, develop branch에서 독자적으로 관리할 수 있다.
- `master` ↔ `develop`
    - `rebase & merge` 를 사용한다.
        - 이유
            - develop의 내용을 master에 추가할 때에는 별도의 새로운 커밋을 생성할 이유가 없다.
- `hotfix` ↔ `develop` , `hotfix` ↔ `master`
    - `squash & merge` 또는 `merge` 를 사용한다.
        - 이유
            - hotfix branch 작업의 각 커밋 히스토리가 모두 남아야 하는 경우 merge, 필요 없는 경우 squash and merge를 사용한다.

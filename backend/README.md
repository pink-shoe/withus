# 프로젝트 처음 실행 시


```
# h2 세팅
1. h2 2.2.220 설치
2. C:\Program Files (x86)\H2\bin 에 있는 h2w 배치 파일로 h2 실행
    - 맥북은 h2.sh 실행
3. 실행 시 다음과 같이 세팅
   - JDBC URL
       - 최초 접속(DB 생성): jdbc:h2:~/test
       - 이후 접속: jdbc:h2:tcp://localhost/~/test
   - 사용자명: sa

# h2 버전 확인
- h2 실행 후 다음 입력
  SELECT H2VERSION() FROM DUAL;

```
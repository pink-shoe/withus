# 프로젝트 처음 실행 시

```
# pnpm으로 프로젝트 세팅
cd frontend
pnpm i

# 만약 pnpm이 없다면 아래 명령어 실행하여 pnpm 설치
npm install -g pnpm

# pnpm 설치 확인
pnpm -v


# openvidu 실행 위해 터미널에서 docker 실행
# openvidu-call-react docker
docker run -p 4443:4443 --rm -e OPENVIDU_SECRET=MY_SECRET openvidu/openvidu-dev:2.28.0

# 프론트 코드는 frontend 폴더 내에서 실행
cd frontend
pnpm run dev

```

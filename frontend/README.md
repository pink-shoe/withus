# 프로젝트 처음 실행 시

```
# pnpm으로 프로젝트 세팅
pnpm i

# 만약 pnpm이 없다면 아래 명령어 실행하여 pnpm 설치
npm install -g pnpm

# pnpm 설치 확인
pnpm -v


# openvidu 실행 위해 터미널에서 docker 실행
# openvidu-call-react docker
docker run -p 4443:4443 --rm -e OPENVIDU_SECRET=MY_SECRET openvidu/openvidu-dev:2.28.0

# openvidu 서버 처음 실행 시 openvidu-basic-node 폴더 내로 이동 후 아래 명령어 실행
cd openvidu-basic-node
npm i

# openvidu 서버 실행 위해 openvidu-basic-node 폴더 내에서 아래 명령어 실행
node index.js


# 프론트 코드는 frontend 폴더 내에서 실행
pnpm run dev

```

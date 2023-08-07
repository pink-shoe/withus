# node 이미지를 받는다 build이미지이구나 
# node 기반의 이미지로 생성된다. 
#FROM node:18.17.0 as build-stage 
# nginx 로 실행
FROM nginx

# RUN, CMD, ENTRYPOINT의 명령이 실행될 디렉터리 
WORKDIR /app 

RUN mkdir ./dist

ADD ./dist ./dist

RUN rm /etc/nginx/conf.d/default.conf

# 작성한 nginx 설정파일을 복사한다. 
COPY ./nginx.conf /etc/nginx/conf.d

# COPY nginx.conf /etc/nginx/nginx.conf 

EXPOSE 5173

CMD ["nginx". "-g", "daemon off"]
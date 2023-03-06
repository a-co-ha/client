# 가져올 이미지를 정의
FROM node:16-alpine
# 경로 설정하기
WORKDIR /app
# package.json 워킹 디렉토리에 복사
COPY package* yarn.lock .pnp* ./
COPY .yarnrc.yml ./
COPY .yarn ./.yarn
COPY --chown=nextjs:nodejs /app/.next/standalone ./
# 의존성 설치
RUN yarn --immutable
# 각각의 명령어들은 한줄 한줄씩 캐싱되어 실행된다.
# package.json의 내용은 자주 바뀌진 않을 거지만
# 소스 코드는 자주 바뀌는데
# npm install과 COPY . . 를 동시에 수행하면
# 소스 코드가 조금 달라질때도 항상 npm install을 수행해서 리소스가 낭비된다.

# 3000번 포트 노출
EXPOSE 3000
# yarn dev 스크립트 실행
CMD ["yarn", "dev"]
# 그리고 Dockerfile로 docker 이미지를 빌드해야한다.
# $ docker build .
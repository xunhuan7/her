FROM node:12.10.0

WORKDIR /app
COPY . .

RUN yarn config set registry https://registry.npm.taobao.org/  && \
    yarn install && \
    yarn run start:prod

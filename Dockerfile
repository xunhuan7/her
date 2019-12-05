FROM node:12.10.0

WORKDIR /app
COPY . .

RUN npm config set registry https://registry.npm.taobao.org  && \
    npm install -g apidoc && \
    apidoc -i src/ -o doc/ && \
    npm install && \
    npm run build

CMD  node dist/main

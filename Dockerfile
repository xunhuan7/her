FROM node:12.10.0

WORKDIR /app
COPY . .

RUN yarn config set registry https://registry.npm.taobao.org/  && \
    yarn add global apidoc && \
    yarn install --network-timeout 1000000 && \
    yarn run build  && \
    apidoc -i src/ -o doc/ && \
    apt-get install nginx -y && \
    node dist/main

COPY nginx.conf /etc/nginx/nginx.conf
CMD ["nginx", "-g", "daemon off;"]

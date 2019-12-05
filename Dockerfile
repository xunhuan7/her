FROM node:12.10.0

WORKDIR /app
COPY . .

RUN npm config set registry https://registry.npm.taobao.org  && \
    npm install -g apidoc && \
    apidoc -i src/ -o doc/ && \
    npm install && \
    npm run build  && \
    mv /etc/apt/sources.list /etc/apt/sources.list.bak && \
    echo "deb http://mirrors.tuna.tsinghua.edu.cn/debian jessie main non-free contrib" >/etc/apt/sources.list && \
    apt-get update && \
    apt-get install nginx -y

COPY nginx.conf /etc/nginx/nginx.conf

#CMD ["nginx", "-g", "daemon off;"]
CMD  node dist/main

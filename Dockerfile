FROM registry.cn-hangzhou.aliyuncs.com/raininfall/nginx-rtmp
ADD . /root/handshake
WORKDIR /root/handshake
RUN npm i && npm test

FROM registry.cn-hangzhou.aliyuncs.com/raininfall/nginx-rtmp
ADD . /root/handshake
WORKDIR /root/handshake
RUN npm set registry https://registry.npm.taobao.org && npm i && npm test

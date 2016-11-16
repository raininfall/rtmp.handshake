FROM registry.cn-hangzhou.aliyuncs.com/raininfall/nginx-rtmp
ADD . /root/handshake
WORKDIR /root/handshake
RUN /root/sbin/nginx -c /root/nginx.conf && npm set registry https://registry.npm.taobao.org && npm i && npm test

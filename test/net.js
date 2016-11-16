const handshake = require('../');
const mlog = require('mocha-logger');
const net = require('net');
const BufferList = require('bl');

describe('test with nginx-rtmp', () => {
  it('should go throuught handshake', (done) => {
    const c0 = handshake.C0.create();
    const c1 = handshake.C1.create();
    const sock = net.connect(1935, () => {
      sock.write(c0.encode());
      sock.write(c1.encode());
    });
    const bl = new BufferList();
    sock.on('data', (data) => {
      bl.append(data);
      if (bl.length === 1 + 1536 + 1536) {
        mlog.log('Server response.');
        done();
      }
    });
    sock.on('error', done);
  });
});

const expect = require('expect');
const handshake = require('../');
const mlog = require('mocha-logger');
const net = require('net');
const BufferList = require('bl');

describe('test with nginx-rtmp', () => {
  it('should go throught handshake', /* @this */function ng_handshake(done) {
    this.timeout(5 * 1000);

    const sock = net.connect(1935, () => {
      const c0 = handshake.C0.create();
      sock.write(c0.encode());

      const c1 = handshake.C1.create();
      sock.write(c1.encode());

      mlog.log('Send C0,C1');
    });

    const bl = new BufferList();
    sock.on('data', (data) => {
      bl.append(data);
      if (bl.length === 1 + 1536 + 1536) {
        mlog.log('Recv S0,S1');

        expect(handshake.C0.fromBuffer(bl.slice(0, 1)).validate()).toBe(true);
        expect(handshake.C2.fromBuffer(bl.slice(1)).validate()).toBe(true);

        const c2 = handshake.C2.createb(bl.slice(1));
        sock.write(c2.encode());
        mlog.log('Send C2');


      }
    });
    sock.on('error', done);
  });
});

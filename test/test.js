const handshake = require('../src');
const expect = require('expect');

describe('handshake', () => {
  describe('#C0', () => {
    it('test itself', () => {
      expect(handshake.C0.create().validate()).toBe(true);

      const c0_from_buffer = handshake.C0.fromBuffer(Buffer.from([0x03]));
      const c0_create = handshake.C0.create();

      expect(c0_from_buffer).toEqual(c0_create);
    });
  });
});

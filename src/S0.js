export default class S0 {
  static DATA = Buffer.from([0x03]);

  static create() {
    const s0 = new S0();
    s0._buf = S0;

    return s0;
  }

  static fromBuffer(buf) {
    const s0 = new S0();
    s0._buf = buf;

    return s0;
  }

  encode() {
    return this._buf;
  }

  validate() {
    if (Buffer.compare(S0.DATA, this._buf) !== 0) {
      return false;
    }

    return true;
  }
}

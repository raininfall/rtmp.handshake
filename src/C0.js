export default class C0 {
  static DATA = Buffer.from([0x03]);

  static create() {
    const c0 = new C0();
    c0._buf = C0.DATA;

    return c0;
  }

  static fromBuffer(buf) {
    const c0 = new C0();
    c0._buf = buf;

    return c0;
  }

  encode() {
    return this._buf;
  }

  validate() {
    if (Buffer.compare(C0.DATA, this._buf) !== 0) {
      return false;
    }

    return true;
  }
}

export default class C0 {
  static C0 = Buffer.from([0x03]);

  static create() {
    const c0 = new C0();
    c0._buf = C0;

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
    if (Buffer.compare(C0, this._buf) !== 0) {
      return false;
    }

    return true;
  }
}

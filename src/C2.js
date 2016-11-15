import S1 from './S1';
import crypto from 'crypto';
import hmacFMS from './HmacFMS';

export default class C2 {
  static create(buf_c1) {
    const c2 = new C2();
    c2._buf = crypto.randomBytes(1536);
    c2._s1 = S1.fromBuffer(buf_c1);

    return c2;
  }

  static fromBuffer(buf) {
    const c2 = new C2();
    c2._buf = buf;

    return c2;
  }

  getRandom() {
    return this._buf.slice(0, 1504);
  }

  getDigest() {
    return this._buf.slice(1504);
  }

  encode() {
    const hmac = crypto.createHmac(hmacFMS(this._s1.getDigest()));
    hmac.update(this.getRandom());
    const digest = hmac.digest();
    digest.copy(this._buf, 1504);

    return this._buf;
  }
}

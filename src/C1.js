import crypto from 'crypto';
import hmacFP from 'HmacFP';
import is from 'is';
import moment from 'moment';
import random_engine from 'random-js';

const random =  random_engine();

const C1_VERSION = 0x80000702;

export default class C1 {
  static fromBuffer(buf) {
    const c1 = new C1();
    c1._buf = buf;

    return c1;
  }

  static create() {
    const c1 = new C1();
    c1._buf = crypto.randomBytes(1536);

    return c1;
  }

  getVersion() {
    return C1_VERSION;
  }

  getTime() {
    return this._buf.readUInt32BE(0);
  }

  getDigestOffset() {
    return this._buf.readUInt32BE(8);
  }

  getDigest() {
    const digest_offset = this.getDigestOffset();

    return this._buf.slice(12 + digest_offset, 44 + digest_offset);
  }

  getKeyOffset() {
    return this._buf.readUInt32BE(1532);
  }

  getkey() {
    const key_offset = this.getKeyOffset();

    return this._buf.slice(772 + key_offset, 900 + key_offset);
  }

  getJoinPart() {
    const digest_offset = this.getDigestOffset();

    return Buffer.concat([
      this._buf.slice(0, 12 + digest_offset),
      this._buf.slice(44 + digest_offset)
    ]);
  }

  encode(dh) {
    this._buf.writeUInt32BE(moment.unix(), 0);
    this._buf.writeUInt32BE(C1_VERSION, 4);

    const key_offset = random.integer(0, 764 - 128 - 4);
    this._buf.writeUInt32BE(key_offset, 1532);
    const key = dh.generateKeys();
    key.copy(this._buf, 772 + key_offset);

    const digest_offset = random.integer(0, 764 - 4 - 32);
    this._buf.writeUInt32BE(digest_offset, 8);
    const digest = hmacFP(this.getJoinPart());
    digest.copy(this._buf, 12 + digest_offset);

    return this._buf;
  }

  validate() {
    const digest_offset = this.getDigestOffset();
    if (!is.within(digest_offset, 0, 764 - 4 - 32)) {
      return false;
    }

    const key_offset = this.getKeyOffset();
    if (!is.within(key_offset, 0, 764 - 4 - 32)) {
      return false;
    }

    return true;
  }
}

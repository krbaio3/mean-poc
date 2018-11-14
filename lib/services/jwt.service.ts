import { Request, Response, NextFunction } from 'express';
import { decode, encode } from 'jwt-simple';
import moment from 'moment';
import { Payload } from 'models';

export class JwtServices {
  private key: string;
  public payload: Payload;

  constructor() {
    this.payload = null;
    this.key = 'SECRET_TOKEN';
  }

  public getKey(): string {
    return this.key;
  }

  public setPayload(user) {
    this.payload = {
      sub: user._id,
      name: user.name,
      email: user.email,
      role: user.role,
      img: user.img,
      password: undefined,
      phone: undefined,
      issuedAt: moment().unix(),
      expiration: moment().add(14)
    };
    // console.log(JSON.stringify(this.payload, null, 4));
    return encode(this.payload, this.key);
  }
}

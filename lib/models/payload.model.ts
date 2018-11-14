import { UserModel } from './user.model';

export interface Payload extends UserModel {
    sub: any;
    issuedAt: any;
    expiration: any;
}

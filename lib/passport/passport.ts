import { use } from 'passport';
import passportLocal from 'passport-local';
import { Strategy, ExtractJwt } from 'passport-jwt';
import { User } from '../schemas/user.schema';

export class PassportCustom {
  private LocalStrategy = passportLocal.Strategy;
  constructor() {
    this.initial();
  }

  private initial() {
    use(
      new this.LocalStrategy(
        {
          usernameField: 'email',
          passwordField: 'password'
        },
        (email, password, callback) => {
          try {
            console.log('entraaaaaaaaaaaaaaaaaa');
            const user = User.findOne({ email, password });
            if (!user) {
              return callback(null, false, {
                message: 'Incorrect email or password.'
              });
            }
            return callback(null, user, { message: 'Logged In Successfully' });
          } catch (err) {
            return callback(err);
          }
        }
      )
    );

    use(
      new Strategy(
        {
          jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
          secretOrKey: 'SECRET_TOKEN'
        },
        async (jwtPayload, callBack) => {
          // find the user in db if needed. This functionality may be omitted if you store everything you'll need in JWT payload.
          try {
            const user = await User.findById(jwtPayload.id);
            return callBack(null, user);
          } catch (err) {
            return callBack(err);
          }
        }
      )
    );
  }
}

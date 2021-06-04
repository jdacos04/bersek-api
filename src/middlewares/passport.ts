import { Strategy, ExtractJwt, StrategyOptions } from "passport-jwt";
import config from "../config/config";
import {pool} from '../db'


const opts: StrategyOptions = {
  jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
  secretOrKey: config.jwtSecret
};

export default new Strategy(opts, async (payload, done) => {
  try {
    const user = await  pool.query('SELECT * FROM users WHERE user_id = $1', [payload.id])
    const confir = user.rows
    if (confir) {
      return done(null, user);
    }
    return done(null, false);
  } catch (error) {
    console.log(error);
  }
});



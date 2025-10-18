import dotenv from 'dotenv';
import path from 'path';

dotenv.config({ path: path.join((process.cwd(), '.env')) });

export default {
  NODE_ENV: process.env.NODE_ENV,
  port: process.env.PORT,
  db_url: process.env.DB_URL,
  jwt_secret:process.env.jwt_secret,
  jwt_token_exp:process.env.jwt_token_exp,
  bcrypt_sat_round:process.env.bcrypt_sat_round

};

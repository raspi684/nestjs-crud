import { PassportStrategy } from '@nestjs/passport';
import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { Strategy, StrategyOption } from 'passport-facebook'

@Injectable()
export class FacebookStrategy extends PassportStrategy(Strategy) {
  constructor() {
    super({
      clientID: process.env.FACEBOOK_CLIENT_ID,
      clientSecret: process.env.FACEBOOK_CLIENT_SECRET,
      callbackURL: process.env.FACEBOOK_OAUTH_REDIRECT,
      profileFields: ['id', 'email', 'first_name', 'middle_name', 'last_name'],
      scope: ['email']
    })
  }

  async validate(accessToken: string, refreshToken: string, profile: any, done): Promise<any> {
    const { id, first_name, last_name, email } = profile._json

    const user = {
      facebookID: id,
      email,
      firstName: first_name,
      lastName: last_name,
    }
    done(null, user);
  }
}
import { PassportStrategy } from '@nestjs/passport';
import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { Strategy, VerifyCallback } from 'passport-google-oauth20';

@Injectable()
export class GoogleStrategy extends PassportStrategy(Strategy) {
  constructor() {
    super({
      clientID: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
      callbackURL: process.env.GOOGLE_OAUTH_REDIRECT,
      scope: ['profile', 'email', 'displayName']
    })
  }

  async validate(accessToken: string, refreshToken: string, profile: any, done: VerifyCallback): Promise<any> {
    const { id, name, emails } = profile;

    const user = {
      googleID: id,
      email: emails[0].value,
      firstName: name.givenName,
      lastName: name.familyName,
    }
    done(null, user);
  }
}
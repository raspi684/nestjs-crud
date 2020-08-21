import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { UsersModule } from '@/users/users.module';
import { LocalStrategy } from './strategies/local.strategy';
import { PassportModule } from '@nestjs/passport';
import { AuthController } from './auth.controller';
import { JwtModule } from '@nestjs/jwt';
import { JwtStrategy } from './strategies/jwt.strategy';
import { ConfigService } from '@nestjs/config';
import { GoogleStrategy } from './strategies/google.strategy';
import { FacebookStrategy } from './strategies/facebook.strategy';

@Module({
  providers: [AuthService, LocalStrategy, JwtStrategy, GoogleStrategy, FacebookStrategy, ConfigService],
  imports: [
    UsersModule,
    PassportModule,
    JwtModule.register({
      secret: process.env.JWT_SECRET,
      signOptions: { expiresIn: process.env.JWT_EXPIRE_TIME }
    })
  ],
  controllers: [AuthController]
})
export class AuthModule {}

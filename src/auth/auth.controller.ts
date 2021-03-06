import { Controller, Request, Post, UseGuards, HttpCode, Get } from '@nestjs/common';
import { LocalAuthGuard } from './guards/local-auth.guard';
import { AuthService } from './auth.service';
import { JwtAuthGuard } from './guards/jwt-auth.guard';
import { GoogleAuthGuard } from './guards/google.guard';
import { FacebookAuthGuard } from './guards/facebook.guard';

@Controller('auth')
export class AuthController {

    constructor (private authService: AuthService) { }

    @HttpCode(200)
    @UseGuards(LocalAuthGuard)
    @Post('login')
    async login(@Request() req) {
        return this.authService.login(req.user);
    }
    
    @Post('register')
    async register(@Request() req) {
        return this.authService.register(req.body);
    }


    @UseGuards(GoogleAuthGuard)
    @Get('google')
    async google(@Request() req) {}
    
    @UseGuards(GoogleAuthGuard)
    @Get('google/redirect')
    async googleRedirect(@Request() req) {
        return this.authService.signInByOauth(req)
    }
    
    @UseGuards(FacebookAuthGuard)
    @Get('facebook')
    async facebook(@Request() req) {}
    
    @UseGuards(FacebookAuthGuard)
    @Get('facebook/redirect')
    async facebookRedirect(@Request() req) {
        return this.authService.signInByOauth(req)
    }

    @UseGuards(JwtAuthGuard)
    @Get('profile')
    async profile(@Request() req) {
        return req.user;
    }
}

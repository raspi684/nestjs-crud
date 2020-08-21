import { Injectable, UnauthorizedException, NotFoundException, InternalServerErrorException, ForbiddenException } from '@nestjs/common';
import { UsersService } from '@/users/users.service';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcrypt';
import { UserDto } from '@/users/dto/user.dto';

@Injectable()
export class AuthService {
    constructor (
        private usersService: UsersService,
        private jwtService: JwtService
    ) {}

    async validateUser(username: string, pass: string): Promise<any> {
        const user = await this.usersService.findOneByUsername(username);
        if (user && user.password != null && await bcrypt.compare(pass, user.password)) {
            const { password, ...result } = user;
            return result;
        }
        return null;
    }

    login(user: any) {
        const payload = {name: user.name, sub: user.id};

        return {
            access_token: this.jwtService.sign(payload, { secret: process.env.JWT_SECRET, expiresIn: process.env.JWT_EXPIRE }),
            refresh_token: this.jwtService.sign(payload, { secret: process.env.JWT_REFRESH_SECRET, expiresIn: process.env.JWT_REFRESH_EXPIRE })
        }
    }
    
    async register(data: UserDto) {
        return await this.usersService.store(data);
    }

    async signInByOauth(req: any) {

        if( !req.user ) throw new NotFoundException();

        if(req.user.googleID) {
            const user = await this.usersService.findByGoogleID(req.user.googleID)
            if(user) return this.login(user)
        }
        
        if(req.user.facebookID) {
            const user = await this.usersService.findByFacebookID(req.user.facebookID)
            if(user) return this.login(user)
        }

        const user = await this.usersService.findOneByUsername(req.user.email);
        if(user) throw new ForbiddenException('User exists')

        const newUser = await this.usersService.storeByOauth({
            name: `${req.user.firstName} ${req.user.lastName}`,
            email: req.user.email,
            google_id: req.user.googleID,
            facebook_id: req.user.facebookID,
        });

        if(newUser) return this.login(newUser);

        throw new InternalServerErrorException('Cannot create user');
    }
    
}

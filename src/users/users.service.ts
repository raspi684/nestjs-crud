import { Injectable, NotFoundException, InternalServerErrorException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from './user.entity';
import { Repository } from 'typeorm';
import { CreateUserDto } from './dto/create-user.dto';

@Injectable()
export class UsersService {

    constructor(
        @InjectRepository(User)
        private usersRepository: Repository<User>,
    ) {}

    findAll(): Promise<User[]> {
        return this.usersRepository.find();
    }

    async findOne(id: string): Promise<User> {
        try {
            return await this.usersRepository.findOneOrFail(id);
        } catch(e) {
            throw new NotFoundException();
        }
    }

    store(data: CreateUserDto): Promise<User> {
        try {
            const user = new User();
            user.name = data.name;
            user.email = data.email;

            return this.usersRepository.save(user);
        } catch(e) {
            throw new InternalServerErrorException();
        }
    }

    async update(id: string, data: CreateUserDto): Promise<User> {
        try {
            const user = await this.usersRepository.findOneOrFail(id);
            user.name = data.name;
            user.email = data.email;
            return this.usersRepository.save(user);
        } catch (e) {
            throw new NotFoundException(e);
        }
    }

    async destroy(id: string) {
        try {
            await this.usersRepository.delete(id);
        } catch(e) {
            throw new NotFoundException(e);
        }
        return;
    }
}

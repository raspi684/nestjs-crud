import {
  Injectable,
  NotFoundException,
  InternalServerErrorException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from '@/entity/User';
import { UserDto } from './dto/user.dto';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User)
    private usersRepository: Repository<User>,
  ) {}

  findAll(): Promise<User[]> {
    return this.usersRepository.find();
  }

  findOne(id: string): Promise<User> {
    try {
      return this.usersRepository.findOneOrFail(id);
    } catch (e) {
      throw new NotFoundException();
    }
  }

  store(data: UserDto): Promise<User> {
    try {
      const user = new User();
      user.name = data.name;
      user.email = data.email;

      return this.usersRepository.save(user);
    } catch (e) {
      throw new InternalServerErrorException();
    }
  }

  async update(id: string, data: UserDto): Promise<User> {
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
    } catch (e) {
      throw new NotFoundException(e);
    }
    return;
  }
}

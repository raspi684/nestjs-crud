import {
  Injectable,
  NotFoundException,
  InternalServerErrorException,
  UnprocessableEntityException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from '@/entity/User';
import { UserDto } from './dto/user.dto';
import * as bcrypt from 'bcrypt';

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
  
  async findOneByUsername(email: string) {
    try {
      const user = await this.usersRepository.findOneOrFail({email});
      return user;
    } catch (e) {
      return null;
    }
  }

  async store(data: UserDto): Promise<User> {
    if( (await this.usersRepository.findAndCount({email: data.email}))[1] > 0 ) {
      throw new UnprocessableEntityException('User already exists');
    }
    try {
      const user = new User();
      user.name = data.name;
      user.email = data.email;
      user.password = await bcrypt.hash(data.password, await bcrypt.genSalt(10));

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
      return;
    } catch (e) {
      throw new NotFoundException(e);
    }
  }
}

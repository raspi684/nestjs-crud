import {
  Injectable,
  NotFoundException,
  InternalServerErrorException,
  UnprocessableEntityException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository, In } from 'typeorm';
import { User } from '@/entity/User';
import { UserDto } from './dto/user.dto';
import * as bcrypt from 'bcrypt';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User)
    private usersRepository: Repository<User>,
  ) { }

  findAll(): Promise<User[]> {
    return this.usersRepository.find();
  }

  async findOne(id: string): Promise<User> {
    try {
      return await this.usersRepository.findOne(id);
    } catch (e) {
      throw new InternalServerErrorException(e);
    }
  }

  async findOneByUsername(email: string) {
    try {
      const user = await this.usersRepository.findOne({ email });
      return user;
    } catch (e) {
      throw new InternalServerErrorException(e);
    }
  }

  async findByGoogleID(id: string) {
    try {
      const user = await this.usersRepository.findOne({ google_id: id });
      return user;
    } catch (e) {
      throw new InternalServerErrorException(e);
    }
  }

  async findByFacebookID(id: string) {
    try {
      const user = await this.usersRepository.findOne({ facebook_id: id });
      return user;
    } catch (e) {
      throw new InternalServerErrorException(e);
    }
  }

  async store(data: UserDto): Promise<User> {
    if ((await this.usersRepository.findAndCount({ email: data.email }))[1] > 0) {
      throw new UnprocessableEntityException('User already exists');
    }
    try {
      const user = new User();
      user.name = data.name;
      user.email = data.email;
      user.password = await bcrypt.hash(data.password, await bcrypt.genSalt(10));

      return this.usersRepository.save(user);
    } catch (e) {
      throw new InternalServerErrorException("Cannot create user");
    }
  }

  async storeByOauth(data: any): Promise<User> {
    try {
      const user = new User();
      user.name = data.name;
      user.email = data.email;
      if (data.google_id != undefined) user.google_id = data.google_id;
      if (data.facebook_id != undefined) user.facebook_id = data.facebook_id;
      user.active = true;

      return this.usersRepository.save(user);
    } catch (e) {
      throw new InternalServerErrorException("Cannot create user");
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
      throw new InternalServerErrorException("Cannot delete user");
    }
  }
}

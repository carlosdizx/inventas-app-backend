import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import User from './entities/user.entity';
import { Repository } from 'typeorm';
import CreateUserDto from './dto/create.user.dto';
import ErrorHandler from '../common/utils/error-handler';

@Injectable()
export default class AuthService {
  constructor(
    @InjectRepository(User) private readonly repository: Repository<User>,
    private readonly errorHandler: ErrorHandler,
  ) {}

  public registerUser = async (createUserDto: CreateUserDto) => {
    try {
      const user = this.repository.create({
        ...createUserDto,
      });
      await this.repository.save(user);
      delete user.password;
      return user;
    } catch (error) {
      this.errorHandler.handleException(error);
    }
  };
}

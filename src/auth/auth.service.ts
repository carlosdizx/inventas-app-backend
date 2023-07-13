import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import User from './entities/user.entity';
import { Repository } from 'typeorm';
import CreateUserDto from './dto/create.user.dto';
import ErrorHandlerService from '../common/modules/error-handler/error.handler.service';

const nameService = 'AuthService';
@Injectable()
export default class AuthService {
  constructor(
    @InjectRepository(User) private readonly repository: Repository<User>,
    private readonly errorHandlerService: ErrorHandlerService,
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
      this.errorHandlerService.handleException(error, nameService);
    }
  };
}

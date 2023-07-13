import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import User from './entities/user.entity';
import { Repository } from 'typeorm';
import CreateUserDto from './dto/create.user.dto';
import ErrorHandlerService from '../common/utils/error.handler.service';
import EncryptService from '../common/utils/encrypt.service';

const nameService = 'AuthService';
@Injectable()
export default class AuthService {
  constructor(
    @InjectRepository(User) private readonly repository: Repository<User>,
    private readonly errorHandlerService: ErrorHandlerService,
    private readonly encryptService: EncryptService,
  ) {}

  public registerUser = async (createUserDto: CreateUserDto) => {
    try {
      const user = this.repository.create({
        ...createUserDto,
        password: await this.encryptService.encryptPassword(
          createUserDto.password,
        ),
      });
      await this.repository.save(user);
      delete user.password;
      return user;
    } catch (error) {
      this.errorHandlerService.handleException(error, nameService);
    }
  };
}

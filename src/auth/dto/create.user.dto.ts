import { PartialType } from '@nestjs/mapped-types';
import LoginUserDto from './login.user.dto';

export default class CreateUserDto extends PartialType(LoginUserDto) {}

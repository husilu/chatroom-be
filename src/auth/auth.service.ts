import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { UserEntity } from 'src/user/user.entity';
import { Repository } from 'typeorm';
import { LoginUserDto } from './login-user.dot';
import { InjectRepository } from '@nestjs/typeorm';
import { UserService } from '../user/user.service'

@Injectable()
export class AuthService {
  constructor(
    @InjectRepository(UserEntity)
    private readonly userRepository: Repository<UserEntity>,
    private jwtService: JwtService,
    private UserService: UserService
  ) {}

 // 生成token
  createToken(user: Partial<UserEntity>) {
    return this.jwtService.sign(user);
  }

  async login(user: Partial<UserEntity>) {
    const token = this.createToken({
      id: user.id,
      username: user.username,
    });
    // console.log('token', { token })
    return { token };
  }

  async getUser(user) {
    return await this.UserService.findById(user.id);
  }
}

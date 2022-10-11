//jwt.strategy.ts
import { ConfigService } from '@nestjs/config';
import { UnauthorizedException } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { StrategyOptions, Strategy, ExtractJwt } from 'passport-jwt';
import { InjectRepository } from '@nestjs/typeorm';
import { AuthService } from './auth.service';
import { UserEntity } from 'src/user/user.entity';
import { Repository } from 'typeorm';
import { LoginUserDto } from './login-user.dot';

export class JwtStorage extends PassportStrategy(Strategy) {
  constructor(
    @InjectRepository(UserEntity)
    private readonly userRepository: Repository<UserEntity>,
    private readonly configService: ConfigService,
    private readonly authService: AuthService,
  ) {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      secretOrKey: configService.get('SECRET'),
    } as StrategyOptions);
  }

  async validate(user: LoginUserDto) {
    const existUser = await this.authService.getUser(user);
    if (!existUser) {
      throw new UnauthorizedException('token不正确');
    }
    return existUser;
  }
}
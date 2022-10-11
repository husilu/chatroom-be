import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { PassportModule } from '@nestjs/passport';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserEntity } from 'src/user/user.entity';
import { LocalStorage } from './local.strategy';
import { JwtModule } from '@nestjs/jwt';
import { ConfigService } from '@nestjs/config';
import { JwtStorage } from './jwt.strategy';
import { UserModule } from '../user/user.module'
//语法
// nest g [文件类型] [文件名] [文件目录]
const jwtModule = JwtModule.registerAsync({
  inject: [ConfigService],
  useFactory: async (configService: ConfigService) => {
    return {
      secret: configService.get('SECRET'),
      signOptions: { expiresIn: '4h' },
    };
  },
});

@Module({
  imports: [TypeOrmModule.forFeature([UserEntity]), PassportModule, jwtModule, UserModule],
  controllers: [AuthController],
  providers: [AuthService, LocalStorage, JwtStorage],
  exports: [jwtModule]
})

export class AuthModule {}

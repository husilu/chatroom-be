import { IsNotEmpty } from 'class-validator';
import { ApiProperty} from '@nestjs/swagger';

export class LoginUserDto {
  @ApiProperty({ description: '用户名' })
  @IsNotEmpty({ message: '用户名必填' })
  readonly username: string;

  @IsNotEmpty({ message: '密码必填' })
  @ApiProperty({ description: '密码' })
  readonly password: string;
}
import { IsNotEmpty, IsNumber, IsString } from 'class-validator';
import { ApiProperty,  ApiPropertyOptional} from '@nestjs/swagger';

export class CreatePostDto {
  @ApiProperty({ description: '用户名' })
  @IsNotEmpty({ message: '用户名必填' })
  readonly username: string;

  @IsNotEmpty({ message: '密码必填' })
  @ApiProperty({ description: '密码' })
  readonly password: string;

  @ApiPropertyOptional({ description: '用户昵称' })
  readonly nickname: string;

  @ApiPropertyOptional({ description: '用户头像' })
  readonly avatar: string;
}
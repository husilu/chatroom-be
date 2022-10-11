
import { AuthGuard } from '@nestjs/passport';
import { ApiTags } from '@nestjs/swagger'
import { Req, Body, Controller, UseGuards, UseInterceptors, Post, ClassSerializerInterceptor } from '@nestjs/common'
import { LoginUserDto } from './login-user.dot'
@ApiTags('验证')
@Controller('auth')

export class AuthController {
  @UseGuards(AuthGuard('local'))
  @UseInterceptors(ClassSerializerInterceptor)
  @Post('login')
  async login(@Body() user: LoginUserDto, @Req() req) {
    console.log('req',req)
    return req.user;
  }
}
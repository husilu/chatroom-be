
import { AuthGuard } from '@nestjs/passport';
import { ApiTags, ApiOperation } from '@nestjs/swagger'
import { Req, Body, Controller, UseGuards, UseInterceptors, Post, ClassSerializerInterceptor } from '@nestjs/common'
import { LoginUserDto } from './login-user.dot'
import { AuthService } from './auth.service'

@ApiTags('验证')
@Controller('auth')

export class AuthController {
  constructor(private readonly authService: AuthService) {}
  @ApiOperation({ summary: '登录' })
  @UseGuards(AuthGuard('local'))
  @UseInterceptors(ClassSerializerInterceptor)
  @Post('login')
  async login(@Body() user: LoginUserDto, @Req() req) {
    return await this.authService.login(req.user);
  }
}
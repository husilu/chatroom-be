import { Injectable } from '@nestjs/common';
import { UserService } from '../user/user.service';
@Injectable()
export class AuthService {
  constructor(private userService: UserService) {}
  async validateUser(username: string, pass: string): Promise<any> {
    const user = await this.userService.findById(username);
    if (user && user.password === pass) {
      const { password, ...result } = user;
      return result;
    }
    return null;
  }
//   constructor(
//     @InjectRepository(UserEntity)
//     private readonly userRepository: Repository<UserEntity>,
//     private jwtService: JwtService,
//     private UserService: UserService
//   ) {}

//  // 生成token
//   createToken(user: Partial<UserEntity>) {
//     return this.jwtService.sign(user);
//   }

//   async login(user: Partial<UserEntity>) {
//     const token = this.createToken({
//       id: user.id,
//       username: user.username,
//     });
//     // console.log('token', { token })
//     return { token };
//   }

//   async getUser(user) {
//     return await this.UserService.findById(user.id);
//   }

}

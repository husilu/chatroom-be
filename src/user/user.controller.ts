import { UserService } from './user.service';
import { UserEntity } from './user.entity';
import { ClassSerializerInterceptor, UseInterceptors } from '@nestjs/common';
import { ApiTags, ApiOperation, ApiResponse } from '@nestjs/swagger';
import { CreatePostDto } from './create-user.dot';
import { Body, Controller, Delete, Get, Param, Post, Put, Query } from '@nestjs/common';
@ApiTags("用户 /user")
@Controller('user')
export class UserController {
    constructor(private readonly UserService:UserService){}

    /**
     * 创建用户
     * @param post
     */
    @ApiOperation({ summary: '注册用户' })
    @ApiResponse({ status: 201, type: [UserEntity] })
    @UseInterceptors(ClassSerializerInterceptor)
    @Post('register')
    async register(@Body() post: CreatePostDto){
        return await this.UserService.register(post)
    }

    /**
     * 获取指定用户信息
     * @param id 
     */
    @Get(':id')
    async findById(@Param('id') id) {
        return await this.UserService.findById(id)
    }

    /**
    * 用户登录
    * @param username
    * 
    * @param password
    */
    @Post('/login')
    async login(@Body() user){
      return await this.UserService.login(user)
    }

    /**
     * 更新用户信息
     * @param id 
     * @param post 
     */
  
    @Put(":id")
    async update(@Param("id") id, @Body() post){
        return await this.UserService.updateById(id, post)
    }
}
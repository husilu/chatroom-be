import { HttpException, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { UserEntity } from './user.entity';

export interface UserRo {
  list: UserEntity[];
  count: number;
}
@Injectable()
export class UserService {
  constructor(
    @InjectRepository(UserEntity)
    private readonly UserRepository: Repository<UserEntity>,
  ) {}

  // 注册用户
  async register(post: Partial<UserEntity>): Promise<UserEntity> {
    const { username } = post;
    const doc = await this.UserRepository.findOne({ where: { username } });
    if (doc) {
      throw new HttpException('该用户名已存在', 401);
    }
    // save 数据插入
    const newUser = await this.UserRepository.create(post)
    return await this.UserRepository.save(newUser);
  }
  
  // 获取文章列表
  // async findAll(query): Promise<PostsRo> {
    // const qb = await Repository(UserEntity).createQueryBuilder('post');
    // qb.where('1 = 1');
    // qb.orderBy('post.create_time', 'DESC');

    // const count = await qb.getCount();
    // const { pageNum = 1, pageSize = 10, ...params } = query;
    // qb.limit(pageSize);
    // qb.offset(pageSize * (pageNum - 1));

    // const posts = await qb.getMany();
    // return { list: posts, count: count };
  // }

  // 获取指定用户信息
  async findById(id): Promise<UserEntity> {
    return await this.UserRepository.findOne({where: {id}});
  }

  // 用户登录
  // async login(user): Promise<UserEntity> {
  //   let { username, password } = user;
  //   return await this.UserRepository.findOne({where: {username, password}});
  // }

  // 更新文章
  async updateById(username, post): Promise<UserEntity> {
    const existPost = await this.UserRepository.findOne(username);
    if (!existPost) {
      throw new HttpException(`用户名为${username}的用户不存在`, 401);
    }
    const updatePost = this.UserRepository.merge(existPost, post);
    return this.UserRepository.save(updatePost);
  }

  // 刪除文章
  // async remove(id) {
  //   const existPost = await this.UserRepository.findOne(id);
  //   if (!existPost) {
  //     throw new HttpException(`id为${id}的文章不存在`, 401);
  //   }
  //   return await this.UserRepository.remove(existPost);
  // }
}

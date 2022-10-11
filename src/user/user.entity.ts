import { Column, Entity, PrimaryGeneratedColumn, BeforeInsert } from "typeorm";
const bcrypt = require('bcryptjs');
import { Exclude } from 'class-transformer';

@Entity("user")
export class UserEntity {
    @PrimaryGeneratedColumn('uuid')
    id:number; // 标记为主列，值自动生成

    @Column({ length: 20 })
    username: string;

    @Exclude()
    @Column({ length: 100})
    password: string;

    @Column("text")
    nickname:string;

    @Column({default:''})
    avatar: string;

    @Column({
        name: 'create_time',
        type: 'timestamp',
        default: () => 'CURRENT_TIMESTAMP',
      })
      createTime: Date;
    
    @Column({
    name: 'update_time',
    type: 'timestamp',
    default: () => 'CURRENT_TIMESTAMP',
    })
    updateTime: Date;

    @BeforeInsert() 
    async encryptPwd() { 
        this.password = await bcrypt.hashSync(this.password); 
    } 
}
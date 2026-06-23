import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import { RolesEnum } from "../enums/roles.enum";
import { PostModel } from "src/posts/posts.service";
import { PostsModel } from "src/posts/entities/post.entity";

@Entity()
export class UsersModel{
    @PrimaryGeneratedColumn()
    id: number;

    @Column({
        length: 20,
        unique: true,
    })
    nickname: string;

    @Column({
        unique: true
    })
    email: string;

    @Column()
    password: string;

    @Column({
        enum : RolesEnum,
        default : RolesEnum.USER
    })
    role : RolesEnum;

    @OneToMany(() => PostsModel, (post) => post.author)
    posts: PostModel[];
}
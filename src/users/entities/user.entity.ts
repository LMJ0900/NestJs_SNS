import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";
import { RolesEnum } from "../enums/roles.enum";

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
}
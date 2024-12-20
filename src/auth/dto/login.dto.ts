import { IsEmail, IsString } from "class-validator"

export class LoginUpDto{
    @IsString()
    name:string

    @IsEmail()
    email:string

    @IsString()
    password:string
}
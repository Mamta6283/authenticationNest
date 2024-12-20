import { BadRequestException, Injectable, UnauthorizedException } from "@nestjs/common";
import { InjectModel } from "@nestjs/mongoose";
import { User } from "./schemas/user.schema";
import { Model, now } from "mongoose";
import { SignUpDto } from "./dto/signup.dto";
import * as bcrypt from  'bcrypt'
import { ExceptionsHandler } from "@nestjs/core/exceptions/exceptions-handler";
import { LoginUpDto } from "./dto/login.dto";
import { JwtService } from "@nestjs/jwt";
import { RefreshToken } from "./schemas/refresh.schema";
import { v4 as uuidv4 } from 'uuid';
import { RoleService } from "src/role/role.service";

@Injectable()
export class AuthService{
    constructor(    
        @InjectModel(User.name) private userModel:Model<User>,
        @InjectModel(RefreshToken.name) private refreshModel:Model<RefreshToken>,
        private JwtService:JwtService,
        private roleService:RoleService
    ){}

async signup(signUpDto:SignUpDto) {

    const{name,email,password}=signUpDto
    const emailInUse=await this.userModel.findOne({email:email})

if(emailInUse){
    throw new BadRequestException('email already in use')
}
const salt = await bcrypt.genSalt()

const hasshedPassword= await bcrypt.hash(password,salt)

const user=await this.userModel.create({
    name,
    email,
    password:hasshedPassword
})
await user.save()
return {user} 
}

async Login(loginUpDto:LoginUpDto)
{
    const {name,email,password}=loginUpDto;

    const user=await this.userModel.findOne({email})
    if(!user){
        throw new UnauthorizedException("invalid email")
    } 
    const passwordMatched=await bcrypt.compare(password,user.password)
    
    if(!passwordMatched){
        throw new UnauthorizedException("password is not matched")
    }
    const payload={sub:1,name:loginUpDto.name ,role:'admin'}

    // return {
    //     access_token: this.JwtService.sign(payload),
    //   };
      
    // genrate token
    const tokens= await this.generateToken(user._id)
    return { 
        token:tokens,
        userId:user._id,
        payload
    }
    
//    return this.generateToken(user._id) 
}

async refreshtokens(refreshtoken:string){
         const token=await this.refreshModel.findOne({
            token:refreshtoken,
            expiryDate:{$gte: new Date()}
         })
         if(!token){
            throw new UnauthorizedException("refresh token is not fresh")
         }
         return this.generateToken(token.userId)
}

async  generateToken(userId)
{
    const accessToken=this.JwtService.sign({userId},{expiresIn:'3d' })
    const refreshtoken=uuidv4()

    await this.storeRefreshToken(refreshtoken,userId)
    return {accessToken ,refreshtoken}
}

async storeRefreshToken(token:string ,userId){

    //calculate expiry date 3 days from now
    const expiryDate= new Date()
    expiryDate.setDate(expiryDate.getDate()+3)

   await this.refreshModel.updateOne({ userId},{$set:{expiryDate ,token}},{upsert:true}) //it will not repreat the token again in db it will update

}

async getUserPermissions(userId:string){
    const user=await this.userModel.findById(userId)

    if(!user) throw new BadRequestException()
        const role=await this.roleService.geteRoleById(user.roleId.toString())
    return  role.permission

    
}
}
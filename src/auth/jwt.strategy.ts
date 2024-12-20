// src/auth/jwt.strategy.ts
import { Injectable, UnauthorizedException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { PassportStrategy } from '@nestjs/passport';
import { ExtractJwt, Strategy } from 'passport-jwt';
import { User } from './schemas/user.schema';
import { Model } from 'mongoose';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy, 'jwt') {
  constructor( @InjectModel(User.name) private userModel:Model<User>,) {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      ignoreExpiration: false,
      secretOrKey: '123',
    });
  }
//   async validate(payload:any){
//     const{id}=payload;

//     const user =await this.userModel.findById(id)
//     console.log("user cominng from model",user)
// if(!user){
// throw new UnauthorizedException('login first to access this endpoint')
// }

// return {user, userId: payload.sub, name: payload.name, role: payload.role };
// }

  async validate(payload: any) {
    // Attach the user payload to the request object
    return { userId: payload.sub, username: payload.username, role: payload.role };
  }
}

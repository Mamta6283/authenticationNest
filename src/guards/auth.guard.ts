import { CanActivate, ExecutionContext, Injectable, Logger, UnauthorizedException } from "@nestjs/common";
import { request } from "http";
import { Observable } from "rxjs";
import { Request } from "express";
import { JwtService } from "@nestjs/jwt";


@Injectable()
export class AuthGuard implements CanActivate{
    constructor(private jwtService:JwtService){}
    canActivate
    (context: ExecutionContext

    ): boolean | Promise<boolean> | Observable<boolean> {
        const request=context.switchToHttp().getRequest()
        const token= this.extractTokenFromHeader(request)
       if(!token){
        throw new UnauthorizedException('invalid token')
       }
       try{
        const payload = this.jwtService.verify(token) //verify token
        request.userId=payload.userId
       }
       catch(err){
        Logger.error(err.message)
        throw new UnauthorizedException('invalid token')
}
return true;
    }
    private extractTokenFromHeader(request:Request):string | undefined{
           return request.headers.authorization?.split('')[1]
    }
}
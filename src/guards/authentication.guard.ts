import { CanActivate, ExecutionContext, Logger, UnauthorizedException } from "@nestjs/common";
import { JwtService } from "@nestjs/jwt";
import { Observable } from "rxjs";
import { Request } from "express";

export class AuthenticationsGuard implements CanActivate{
    constructor(private jwtService :JwtService){}

    
    canActivate
    (context: ExecutionContext

    ): boolean | Promise<boolean> | Observable<boolean> {
        console.log("INSIDE AUTHENTICATION GUARD ")
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
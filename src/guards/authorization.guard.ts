import { CanActivate, ConsoleLogger, ExecutionContext, ForbiddenException, Injectable, UnauthorizedException } from "@nestjs/common";
import { Observable } from "rxjs";
import { Reflector } from "@nestjs/core";
import { PERMISSION_KEY } from "src/decorator/permission.decorator";
import { AuthService } from "src/auth/auth.service";
import { Permission } from "src/role/dto/createRole.dto";

@Injectable()
export class AuthorizationGuard implements CanActivate{
    constructor(private reflector:Reflector ,
        private authService:AuthService ){}

    async canActivate(context: ExecutionContext): Promise<boolean>  {
        console.log("INSIDE AUTHORIZATION GAURD")
        const request =context.switchToHttp().getRequest()

        if(!request.userId){
            throw new UnauthorizedException('user id not found')
        }

        //reflector retrieve metadata for a specified key for specified target
        const routePermissions=this.reflector.getAllAndOverride(PERMISSION_KEY,
       [context.getHandler(),context.getClass()])

       console.log("the route permission are ")
       console.log(routePermissions)

    //    try{
    //     const userPermissions =await this.authService.getUserPermissions(request.userId)
    //     console.log(`the user permission are ${userPermissions}`)
       
    //     for (const routePermission of routePermissions){
    //         const userPermission=userPermissions.find((perm)=>perm.resource === routePermission.resource,)

    //         if(!userPermission) {
    //             throw new  ForbiddenException()
    //         }
    //           const allActionAvailble =routePermission.actions.every(
    //            (requiredAction)=>userPermission.actions.inlcudes(requiredAction))

    //    if(!allActionAvailble){
    //     throw new ForbiddenException()
    //    }
    //      }
    //        }
    //    catch(e){
    //         throw new ForbiddenException()
    //    }
      
        return true
    }
}
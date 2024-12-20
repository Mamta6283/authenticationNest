import { Controller, Get, Req, UseGuards } from '@nestjs/common';
import { AppService } from './app.service';
import { AuthGuard } from './guards/auth.guard';
import { Permissions } from './decorator/permission.decorator';
import { Resource } from './role/enum/resource.enum';
import { Action } from './role/enum/action.enum';
import { AuthorizationGuard } from './guards/authorization.guard';

@UseGuards(AuthGuard,AuthorizationGuard)
@Controller('/products')
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Permissions([{resource:Resource.products,actions:[Action.read]},
  {resource:Resource.setting ,actions:[Action.read]}])
  @Get()
 someProtectRoute(@Req() req)
 {
  return {message:"access resource",userId:req.userId}
 }
 }




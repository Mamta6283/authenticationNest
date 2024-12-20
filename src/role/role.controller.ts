import { Body, Controller, Post } from "@nestjs/common";
import { RoleService } from "./role.service";
import { CreateRoleDto, Permission } from "./dto/createRole.dto";
import { permission } from "process";

@Controller()
export class RoleController{
    constructor( private roleService:RoleService){}

    @Post('role')
   
    async createRole(@Body() createRole:CreateRoleDto)
    {
      return this.roleService.createRole(createRole)
    }
}



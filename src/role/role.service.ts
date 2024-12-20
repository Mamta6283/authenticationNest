import { Injectable } from "@nestjs/common";
import { Role } from "./schemas/role.schema";
import { Model } from "mongoose";
import { CreateRoleDto } from "./dto/createRole.dto";
import { InjectModel } from "@nestjs/mongoose";

@Injectable()
export class RoleService{
    constructor(@InjectModel(Role.name) private RoleModel:Model<Role>){}

    async createRole(role:CreateRoleDto){
        return this.RoleModel.create(role)
    }

    async geteRoleById(roleId:string){
        return this.RoleModel.findById(roleId)
    }
}
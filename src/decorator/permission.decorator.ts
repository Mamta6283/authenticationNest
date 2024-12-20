import { SetMetadata } from "@nestjs/common";
import { permission } from "process";
import { Permission } from "src/role/dto/createRole.dto";

export const PERMISSION_KEY="permissions"
export const Permissions=(permissions:Permission[])=>
    SetMetadata(PERMISSION_KEY,permissions)


//we will use like this @Permissions([{}]) in which we give actionns and resource
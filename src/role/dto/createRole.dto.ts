import { ArrayUnique, IsEnum, IsString, ValidateNested  } from "class-validator";
import { Resource } from "../enum/resource.enum";
import { Action } from "../enum/action.enum";
// import { Types } from "mongoose";

export class CreateRoleDto{
    @IsString()
    name:string

    @ValidateNested()
    // @Type(()=> Permission)
    permisssions:Permission[]
}

export class Permission{

    @IsEnum(Resource)
    resource:Resource

   @IsEnum(Action,{each:true})
    @ArrayUnique()//it will not duplicate 
    actions:Action[]
    
}
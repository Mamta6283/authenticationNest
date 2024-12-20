import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { Resource } from "../enum/resource.enum";
import { Action } from "../enum/action.enum";

@Schema()
export class Permission{
    @Prop({required:true,enum:Resource})
    resource:Resource

    @Prop({type:[{type:String,enum:Action}]})
    action:Action[]
}
@Schema()
export class Role{
     @Prop({required:true})
     name:string

     @Prop({required:true,type:[Permission]})
     permission:Permission
}

export const RoleSchema=SchemaFactory.createForClass(Role)
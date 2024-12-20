import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { IsString } from "class-validator";
import mongoose from "mongoose";
import { Document } from "mongoose";

@Schema({versionKey:false,timestamps:true})
export class RefreshToken extends Document{
    @Prop({required:true})
    token:string

    @Prop({required:true,type:mongoose.Types.ObjectId})
    userId:mongoose.Types.ObjectId

    @Prop({required:true})
    expiryDate:Date

}
export const RefreshSchema=SchemaFactory.createForClass(RefreshToken)


import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AuthModule } from './auth/auth.module';
import mongoose from 'mongoose';
import { MongooseModule } from '@nestjs/mongoose';
import { JwtModule } from '@nestjs/jwt';
import { RoleModule } from './role/role.module';
import { APP_GUARD } from '@nestjs/core';
import { RolesGuard } from './guards/roles.guards';

@Module({
  imports: [JwtModule.register({global:true ,secret:'123'})

    , MongooseModule.forRoot('mongodb://localhost:27017/authentication'),
   AuthModule,
   RoleModule
  ],
  controllers: [AppController],
  providers: [ AppService,
    {
      provide:APP_GUARD,
      useClass:RolesGuard ,//apply the roleGuard globally
    }
  ],
})
export class AppModule {}

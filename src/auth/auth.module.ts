import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { User, userSchema } from './schemas/user.schema';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { PassportModule } from '@nestjs/passport';
import { JwtModule } from '@nestjs/jwt';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { RefreshSchema, RefreshToken } from './schemas/refresh.schema';
import { RoleModule } from 'src/role/role.module';
import { JwtStrategy } from './jwt.strategy';
import { APP_GUARD } from '@nestjs/core';
import { RolesGuard } from 'src/guards/roles.guards';

@Module({
    imports:[
      RoleModule,
        PassportModule.register({defaultStrategy:'jwt'}),
        JwtModule.registerAsync({
          imports:[ConfigModule], //important to import for working properly configService
          inject:[ConfigService],
          useFactory:(config:ConfigService)=>{
            return{
              secret:config.get<string>('jwt_secret','123'),
              signOptions:
              {
                // expiresIn:config.get<string | number>('jwt_expire'),
                expiresIn:'3d'
              },
            };
          },
        }),
    MongooseModule.forFeature([
        {
            name:User.name,
            schema:userSchema
        },
        {
            name:RefreshToken.name,
            schema:RefreshSchema
        }
       
    ])
    ],
    controllers:[AuthController],
    providers:[AuthService ,JwtStrategy,
      {provide:APP_GUARD,
        useClass:RolesGuard}
    ],
    exports:[AuthService]
})

export class AuthModule {}

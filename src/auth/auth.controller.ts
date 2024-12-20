import { Body, Controller, Get, Post, UseGuards } from "@nestjs/common";
import {AuthService} from './auth.service'
import { SignUpDto } from "./dto/signup.dto";
import { LoginUpDto } from "./dto/login.dto";
import { RefreshTokenDto } from "./dto/refresh.dto";
import { AuthGuard } from "src/guards/auth.guard";
import { Roles } from "src/role/dto/roles.decorator";
import { Role } from "src/role/enum/roles.enum";
import { JwtAuthGuard } from "src/guards/jwt.guard";
import { RolesGuard } from "src/guards/roles.guards";

// @UseGuards(AuthGuard)
@Controller('auth')
// @UseGuards(JwtAuthGuard,RolesGuard)

export class AuthController{
    constructor( private readonly authService:AuthService ){}

    //post request:
    @Post('signup')
    async signUpUser(@Body() signUpDto:SignUpDto){ 
        return  this.authService.signup(signUpDto)
    }

    @Post('login')
    // @Roles(Role.ADMIN) // Only accessible by admins
    // @UseGuards(AuthGuard)
    async loginUser(@Body() loginUpDto:LoginUpDto){
        return this.authService.Login(loginUpDto)
    }

    @Post('refresh')
    async refreshtoken(@Body() refreshTokenDto:RefreshTokenDto){
    return this.authService.refreshtokens(refreshTokenDto.token)
    }

  @Get('admin')
// @Roles(Role.ADMIN) // Only accessible by admins
  getAdminData() {
    return 'This is admin data';
  }

  @Get('moderator')
  @Roles(Role.MODERATOR) // Only accessible by moderators
  getModeratorData() {
    return 'This is moderator data';
  }

  @Get('public')
  getPublicData() {
    return 'This is public data accessible to anyone';
  }
}


import { Controller, Get, Res, Post, UseGuards, Body, Req } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { AuthService } from './auth.service';
import { LoginDto } from './dtos/login.dto'

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

//   @UseGuards(AuthGuard('local'))
  @Post('/login')
  public async login(@Body() loginDto: LoginDto) {

    const loginData = {
        cellphone: loginDto.cellphone,
        password: loginDto.password
      }
    return this.authService.login(loginData);
  }

  @UseGuards(AuthGuard('jwt'))
  @Get('/me')
  public getProfile(@Req() req) {
    const user = req.user;
    return user;
  }

  @Get('/index')
  public async index() {
    return 'it is auth index';
  }
}
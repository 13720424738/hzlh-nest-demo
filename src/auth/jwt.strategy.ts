
import { ExtractJwt, Strategy } from 'passport-jwt';
import { PassportStrategy } from '@nestjs/passport';
import { Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtPayload } from './jwt-payload.interface'
import { jwtConstants } from './constants';
import { UsersService } from '../users/users.service';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor(
    private readonly usersService: UsersService,
    private readonly jwtService: JwtService,) {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      passReqToCallback: false,
      secretOrKey: jwtConstants.secret,
    });
  }

  async validate(payload: JwtPayload) {
    console.log('*********')
    console.log(payload)

    const user = await this.usersService.findOne(payload.cellphone);

    if (!user) {
      throw new UnauthorizedException();
    }

    const time = payload.exp;
    const created = Math.floor(Date.now() / 1000);

    if((time - created) < 10*60 && (time - created) > 0){
      const newPayload = { cellphone: payload.cellphone, sub: payload.sub };
      const newToken = 'Bearer '+this.jwtService.sign(newPayload)

      if (newToken) {
        return {
          access_token: newToken,
        };
      }else{
        throw new UnauthorizedException();
      }
    }

    return user;
  }
}
import { Injectable } from '@nestjs/common';
import { UsersService } from '../users/users.service';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AuthService {
  constructor(
    private readonly usersService: UsersService,
    private readonly jwtService: JwtService,
  ) {}

  async validateUser(cellphone: string, password: string): Promise<any> {
    const user = await this.usersService.findOne(cellphone);
    if (user && user.password === password) {
      const { password, ...result } = user;
      return result;
    }
    return null;
  }

  async login(user: any) {
    const result = await this.validateUser(user.cellphone, user.password);
    if (result) {
      const userData = await this.usersService.findOne(user.cellphone);
      const payload = { cellphone: userData.cellphone, sub: userData.userId };
      return {
        access_token: 'Bearer '+this.jwtService.sign(payload),
      };
    }
  }
}
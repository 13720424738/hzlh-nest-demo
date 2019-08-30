import { Injectable } from '@nestjs/common';

export type User = any;

@Injectable()
export class UsersService {
  private readonly users: User[];

  constructor() {
    this.users = [
      {
        userId: 1,
        cellphone: '13720424738',
        password: 'admin123',
      },
      {
        userId: 2,
        cellphone: '13720406329',
        password: 'admin123',
      },
      {
        userId: 3,
        cellphone: '18800000000',
        password: 'admin123',
      },
    ];
  }

  async findOne(cellphone: string): Promise<User | undefined> {
    return this.users.find(user => user.cellphone === cellphone);
  }
}

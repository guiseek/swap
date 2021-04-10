import { Injectable } from '@nestjs/common';

export type User = any;

@Injectable()
export class UsersService {
  private count: number = 0;

  private readonly users = [
    {
      userId: 1,
      username: 'john',
      password: 'changeme',
    },
    {
      userId: 2,
      username: 'guiseek',
      password: 'guiseek',
    },
  ];

  async findOne(username: string): Promise<User | undefined> {
    return this.users.find((user) => user.username === username);
  }

  addUser(username: string): Promise<User> {
    return new Promise<User>((resolve, reject) => {
      if (this.users.find((user) => user.username === username)) {
        reject(username);
      } else {
        let user: User = { id: ++this.count, name: username };
        this.users.push(user);
        resolve(user);
      }
    });
  }
}

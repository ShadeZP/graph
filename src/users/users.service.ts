import { Injectable } from '@nestjs/common';
import axios, { AxiosInstance } from 'axios';
import { JWT, User } from '../graphql.schema'

@Injectable()
export class UsersService {
  client: AxiosInstance;

  constructor() {
    this.client = axios.create({
      baseURL: 'http://localhost:3004/v1/users',
    });
  }

  async login(email: string, password: string): Promise<JWT> {
    return (await this.client.post<JWT>('/login', { email, password })).data
  }

  async register({ firstName, lastName, password, email }): Promise<User> {
    return (await this.client.post<User>('/register', { firstName, lastName, password, email })).data
  }

  async getUserById(id: string): Promise<User> {
    const res = await this.client.get<User>(id)

    return res.data;
  }
}

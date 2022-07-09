import { Injectable } from '@nestjs/common';
import axios, { AxiosInstance } from 'axios';
import { UserDTO } from 'src/common/models/interfaces';
import { JWT, User } from '../graphql.schema'

@Injectable()
export class UsersService {
  client: AxiosInstance;

  constructor() {
    this.client = axios.create({
      baseURL: process.env.USERS_URL,
    });
  }

  async login(email: string, password: string): Promise<JWT> {
    return (await this.client.post<JWT>('/login', { email, password })).data
  }

  async register({ firstName, lastName, password, email }): Promise<User> {
    return (await this.client.post<User>('/register', { firstName, lastName, password, email })).data
  }

  async getUserById(id: string): Promise<User> {
    const res = await this.client.get<UserDTO>(id)

    return {
      ...res.data,
      id: res.data._id,
    };
  }
}

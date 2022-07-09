import { Injectable } from '@nestjs/common';
import axios, { AxiosInstance } from 'axios';
import { updateEntity } from 'src/common/utils/updateEntity';
import { JWT, LoginInput, RegisterInput, User } from '../graphql.schema'

@Injectable()
export class UsersService {
  client: AxiosInstance;

  constructor() {
    this.client = axios.create({
      baseURL: process.env.USERS_URL,
    });

    this.client.interceptors.response.use((res) => {
      return updateEntity(res);
    });
  }

  async login(loginInput: LoginInput): Promise<JWT> {
    return (await this.client.post<JWT>('/login', loginInput)).data
  }

  async register(registerInput: RegisterInput): Promise<User> {
    return (await this.client.post<User>('/register', registerInput)).data
  }

  async getUserById(id: string): Promise<User> {
    const res = await this.client.get<User>(id)

    return res.data
  }
}

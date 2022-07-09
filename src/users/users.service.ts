import { Injectable } from '@nestjs/common';
import axios, { AxiosInstance } from 'axios';
import { updateEntity } from 'src/common/utils/updateEntity';
import { JWT, User } from '../graphql.schema'
import { LoginDto } from './dto/login.dto';
import { RegisterDto } from './dto/register.dto';

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

  async login(logtinDto: LoginDto): Promise<JWT> {
    return (await this.client.post<JWT>('/login', logtinDto)).data
  }

  async register(registerDto: RegisterDto): Promise<User> {
    return (await this.client.post<User>('/register', registerDto)).data
  }

  async getUserById(id: string): Promise<User> {
    const res = await this.client.get<User>(id)

    return res.data
  }
}

import { Injectable } from '@nestjs/common';
import axios, { AxiosInstance } from 'axios';
import { updateEntity } from 'src/common/utils/updateEntity';
import { Band } from 'src/graphql.schema';
import { CreateBandDto } from './dto/create-band.dto';
import { createAuthHeader } from '../common/utils/createAuthHeader';
import { UpdateBandDto } from './dto/update-band.dto';

interface getBandsResponse {
  items: Band[],
  offset: number,
  limit: number,
  total: number,
}
@Injectable()
export class BandsService {
  client: AxiosInstance;

  constructor() {
    this.client = axios.create({
      baseURL: process.env.BANDS_URL,
    });

    this.client.interceptors.response.use((res) => {
      return updateEntity(res);
    });
  }

  async findAll(): Promise<getBandsResponse> {
    const res = await this.client.get<getBandsResponse>('');

    return res.data;
  }

  async findOne(id: string): Promise<Band> {
    const res = await this.client.get<Band>(id);

    return res.data;
  }

  async create(createBandDto: CreateBandDto, jwt: string): Promise<Band> {
    const res = await this.client.post<Band>('', createBandDto, createAuthHeader(jwt));

    return res.data;
  }

  async update(id: string, updateBandDto: UpdateBandDto, jwt: string) {
    const res = await this.client.put(id, updateBandDto, createAuthHeader(jwt));

    return res.data;
  }

  async delete(jwt: string) {
    const res = await this.client.delete('', createAuthHeader(jwt));

    return res.data;
  }
}

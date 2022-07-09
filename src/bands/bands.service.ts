import { Injectable } from '@nestjs/common';
import axios, { AxiosInstance, AxiosRequestConfig } from 'axios';
import { updateEntity } from 'src/common/utils/updateEntity';
import { Band, BandsPagination, CreateBandInput, UpdateBandInput } from 'src/graphql.schema';
import { createAuthHeader } from '../common/utils/createAuthHeader';
import { FilterBandsInput } from '../graphql.schema';

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

  async findAll(limit: number, offset: number, filters?: FilterBandsInput): Promise<BandsPagination> {
    const config: AxiosRequestConfig = {
      params: {
        limit,
        offset,
        ...filters,
      }
    }

    const res = await this.client.get<BandsPagination>('/', config);

    return res.data;
  }

  async findOne(id: string): Promise<Band> {
    const res = await this.client.get<Band>(id);
    console.log(res.data)
    return res.data;
  }

  async create(createBandInput: CreateBandInput, jwt: string): Promise<Band> {
    const res = await this.client.post<Band>('', createBandInput, createAuthHeader(jwt));

    return res.data;
  }

  async update(id: string, updateBandInput: UpdateBandInput, jwt: string) {
    const res = await this.client.put(id, updateBandInput, createAuthHeader(jwt));

    return res.data;
  }

  async delete(id: string, jwt: string) {
    const res = await this.client.delete(`/${id}`, createAuthHeader(jwt));

    return res.data;
  }
}

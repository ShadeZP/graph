import { Injectable } from '@nestjs/common';
import axios, { AxiosInstance, AxiosRequestConfig } from 'axios';
import { createAuthHeader } from '../common/utils/createAuthHeader'
import { updateEntity } from 'src/common/utils/updateEntity';
import { Album, AlbumsPagination, CreateAlbumInput, FilterAlbumsInput, UpdateAlbumInput } from 'src/graphql.schema';

@Injectable()
export class AlbumsService {
  client: AxiosInstance;

  constructor() {
    this.client = axios.create({
      baseURL: process.env.ALBUMS_URL,
    });

    this.client.interceptors.response.use((res) => {
      return updateEntity(res);
    });
  }

  async findAll(limit: number, offset: number, filters?: FilterAlbumsInput): Promise<AlbumsPagination> {
    const config: AxiosRequestConfig = {
      params: {
        limit,
        offset,
        ...filters,
      }
    }

    const res = await this.client.get<AlbumsPagination>('/', config);
    return res.data;
  }

  async findOne(id: string): Promise<Album> {
    const res = await this.client.get<Album>(id);

    return res.data;
  }

  async create(createAlbumInput: CreateAlbumInput, jwt: string): Promise<Album> {
    const res = await this.client.post<Album>('', createAlbumInput, createAuthHeader(jwt));

    return res.data;
  }

  async update(id: string, updateAlbumInput: UpdateAlbumInput, jwt: string) {
    const res = await this.client.put(id, updateAlbumInput, createAuthHeader(jwt));

    return res.data;
  }

  async delete(id: string, jwt: string) {
    const res = await this.client.delete(`/${id}`, createAuthHeader(jwt));

    return res.data;
  }
}

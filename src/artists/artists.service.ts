import { Injectable } from '@nestjs/common';
import axios, { AxiosInstance, AxiosRequestConfig, AxiosRequestHeaders } from 'axios';
import { createAuthHeader } from '../common/utils/createAuthHeader'
import { updateEntity } from 'src/common/utils/updateEntity';
import { Artist, ArtistsPagination, CreateArtistInput, Delete, FilterArtistsInput, UpdateArtistInput } from 'src/graphql.schema';

@Injectable()
export class ArtistsService {
  client: AxiosInstance;

  constructor() {
    this.client = axios.create({
      baseURL: process.env.ARTISTS_URL,
    });

    this.client.interceptors.response.use((res) => {
      return updateEntity(res);
    });
  }

  async findAll(limit: number, offset: number, filters?: FilterArtistsInput): Promise<ArtistsPagination> {
    const config: AxiosRequestConfig = {
      params: {
        limit,
        offset,
        ...filters,
      }
    }

    const res = await this.client.get<ArtistsPagination>('/', config);

    return res.data;
  }

  async findOne(id: string): Promise<Artist> {
    const res = await this.client.get<Artist>(id);

    return res.data;
  }

  async create(createArtistInput: CreateArtistInput, jwt: string): Promise<Artist> {
    const res = await this.client.post<Artist>('', createArtistInput, createAuthHeader(jwt));

    return res.data;
  }

  async update(id: string, updateArtistInput: UpdateArtistInput, jwt: string): Promise<Artist> {
    const res = await this.client.put(id, updateArtistInput, createAuthHeader(jwt));

    return res.data;
  }

  async delete(id: string, jwt: string): Promise<Delete> {
    const res = await this.client.delete<Delete>(`/${id}`, createAuthHeader(jwt));

    return res.data;
  }
}

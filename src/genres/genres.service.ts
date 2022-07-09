import { Injectable } from '@nestjs/common';
import axios, { AxiosInstance, AxiosRequestConfig } from 'axios';
import { updateEntity } from 'src/common/utils/updateEntity';
import { createAuthHeader } from '../common/utils/createAuthHeader';
import { CreateGenreInput, FilterGenresInput, Genre, GenresPagination, UpdateGenreInput } from 'src/graphql.schema';

@Injectable()
export class GenresService {
  client: AxiosInstance;

  constructor() {
    this.client = axios.create({
      baseURL: process.env.GENRES_URL,
    });

    this.client.interceptors.response.use((res) => {
      return updateEntity(res);
    });
  }

  async findAll(limit: number, offset: number, filters?: FilterGenresInput): Promise<GenresPagination> {
    const config: AxiosRequestConfig = {
      params: {
        limit,
        offset,
        ...filters,
      }
    }

    const res = await this.client.get<GenresPagination>('/', config);

    return res.data;
  }

  async findOne(id: string): Promise<Genre> {
    const res = await this.client.get<Genre>(id);

    return res.data;
  }

  async create(createGenreInput: CreateGenreInput, jwt: string): Promise<Genre> {
    const res = await this.client.post<Genre>('', createGenreInput, createAuthHeader(jwt));

    return res.data;
  }

  async update(id: string, updateGenreInput: UpdateGenreInput, jwt: string) {
    const res = await this.client.put(id, updateGenreInput, createAuthHeader(jwt));

    return res.data;
  }

  async delete(id: string, jwt: string) {
    const res = await this.client.delete(`/${id}`, createAuthHeader(jwt));

    return res.data;
  }
}

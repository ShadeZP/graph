import { Injectable } from '@nestjs/common';
import axios, { AxiosInstance } from 'axios';
import { GenreDTO } from 'src/common/models/interfaces';
import { updateEntity } from 'src/common/utils/updateEntity';
import { CreateGenreDto } from './dto/create-genre.dto';
import { createAuthHeader } from '../common/utils/createAuthHeader'
import { UpdateGenreDto } from './dto/update-genre.dto';

interface getGenresResponse {
  items: GenreDTO[],
  offset: number,
  limit: number,
  total: number,
}

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

  async findAll(): Promise<getGenresResponse> {
    const res = await this.client.get<getGenresResponse>('');

    return res.data;
  }

  async findOne(id: string): Promise<GenreDTO> {
    const res = await this.client.get<GenreDTO>(id);

    return res.data;
  }

  async create(createGenreDto: CreateGenreDto, jwt: string): Promise<GenreDTO> {
    const res = await this.client.post<GenreDTO>('', createGenreDto, createAuthHeader(jwt));

    return res.data;
  }

  async update(id: string, updateGenreDto: UpdateGenreDto, jwt: string) {
    const res = await this.client.put(id, updateGenreDto, createAuthHeader(jwt));

    return res.data;
  }

  async delete(jwt: string) {
    const res = await this.client.delete('', createAuthHeader(jwt));

    return res.data;
  }
}

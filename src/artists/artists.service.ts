import { Injectable } from '@nestjs/common';
import axios, { AxiosInstance } from 'axios';
import { createAuthHeader } from '../common/utils/createAuthHeader'
import { updateEntity } from 'src/common/utils/updateEntity';
import { CreateArtistDto } from './dto/create-artist.dto';
import { UpdateArtistDto } from './dto/update-artist.dto';
import { Artist } from 'src/graphql.schema';

interface getArtistsResponse {
  items: Artist[],
  offset: number,
  limit: number,
  total: number,
}
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

  async findAll(): Promise<getArtistsResponse> {
    const res = await this.client.get<getArtistsResponse>('');

    return res.data;
  }

  async findOne(id: string): Promise<Artist> {
    const res = await this.client.get<Artist>(id);

    return res.data;
  }

  async create(createArtistDto: CreateArtistDto, jwt: string): Promise<Artist> {
    const res = await this.client.post<Artist>('', createArtistDto, createAuthHeader(jwt));

    return res.data;
  }

  async update(id: string, updateArtistDto: UpdateArtistDto, jwt: string) {
    const res = await this.client.put(id, updateArtistDto, createAuthHeader(jwt));

    return res.data;
  }

  async delete(jwt: string) {
    const res = await this.client.delete('', createAuthHeader(jwt));

    return res.data;
  }
}

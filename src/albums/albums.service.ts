import { Injectable } from '@nestjs/common';
import axios, { AxiosInstance } from 'axios';
import { CreateAlbumDto } from './dto/create-album.dto';
import { UpdateAlbumDto } from './dto/update-album.dto';
import { createAuthHeader } from '../common/utils/createAuthHeader'
import { updateEntity } from 'src/common/utils/updateEntity';
import { Album } from 'src/graphql.schema';

interface getAlbumsResponse {
  items: Album[],
  offset: number,
  limit: number,
  total: number,
}

interface getAllParams {
  offset?: number,
  limit?: number,
  name?: string,
}
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

    this.findAll();
  }

  async findAll(params: getAllParams = {}): Promise<getAlbumsResponse> {
    const res = await this.client.get<getAlbumsResponse>('', { params });
    return res.data;
  }

  async findOne(id: string): Promise<Album> {
    const res = await this.client.get<Album>(id);

    return res.data;
  }

  async create(createAlbumDto: CreateAlbumDto, jwt: string): Promise<Album> {
    const res = await this.client.post<Album>('', createAlbumDto, createAuthHeader(jwt));

    return res.data;
  }

  async update(id: string, updateAlbumDto: UpdateAlbumDto, jwt: string) {
    const res = await this.client.put(id, updateAlbumDto, createAuthHeader(jwt));

    return res.data;
  }

  async delete(jwt: string) {
    const res = await this.client.delete('', createAuthHeader(jwt));

    return res.data;
  }
}

import { Injectable } from '@nestjs/common';
import { createAuthHeader } from '../common/utils/createAuthHeader';
import axios, { AxiosInstance } from 'axios';
import { updateEntity } from 'src/common/utils/updateEntity';
import { Favourites } from 'src/graphql.schema';
import { AddToFavouritesDto } from './dto/add-to-favourites.dto';
import { RemoveFromFavouritesDto } from './dto/remove-from-favourites.dto';

interface getFavouritesResponse {
  items: Favourites[],
  offset: number,
  limit: number,
  total: number,
}
@Injectable()
export class FavouritesService {
  client: AxiosInstance;

  constructor() {
    this.client = axios.create({
      baseURL: process.env.GENRES_URL,
    });

    this.client.interceptors.response.use((res) => {
      return updateEntity(res);
    });
  }

  async findAll(): Promise<getFavouritesResponse> {
    const res = await this.client.get<getFavouritesResponse>('');

    return res.data;
  }

  async add(addToFavouritesDto: AddToFavouritesDto, jwt: string): Promise<Favourites> {
    const res = await this.client.put<Favourites>('/add', addToFavouritesDto, createAuthHeader(jwt));

    return res.data;
  }

  async remove(removeFromFavouritesDto: RemoveFromFavouritesDto, jwt: string) {
    const res = await this.client.put('/remove', removeFromFavouritesDto, createAuthHeader(jwt));

    return res.data;
  }
}

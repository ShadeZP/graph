import { Injectable } from '@nestjs/common';
import { createAuthHeader } from '../common/utils/createAuthHeader';
import axios, { AxiosInstance } from 'axios';
import { updateEntity } from 'src/common/utils/updateEntity';
import { AddToFavouritesInput, Favourites, RemoveFromFavouritesInput } from 'src/graphql.schema';

@Injectable()
export class FavouritesService {
  client: AxiosInstance;

  constructor() {
    this.client = axios.create({
      baseURL: process.env.FAVOURITES_URL,
    });

    this.client.interceptors.response.use((res) => {
      return updateEntity(res);
    });
  }

  async findAll(jwt: string): Promise<Favourites> {
    const res = await this.client.get<Favourites>('', createAuthHeader(jwt));
    console.log('res', res.data)
    return res.data;
  }

  async add(addToFavouritesInput: AddToFavouritesInput, jwt: string): Promise<Favourites> {
    const res = await this.client.put<Favourites>('/add', addToFavouritesInput, createAuthHeader(jwt));
    console.log(res)
    return res.data;
  }

  async remove(removeFromFavouritesInput: RemoveFromFavouritesInput, jwt: string) {
    const res = await this.client.put('/remove', removeFromFavouritesInput, createAuthHeader(jwt));

    return res.data;
  }
}

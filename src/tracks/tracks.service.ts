import { Injectable } from '@nestjs/common';
import axios, { AxiosInstance, AxiosRequestConfig } from 'axios';
import { updateEntity } from 'src/common/utils/updateEntity';
import { CreateTrackInput, Delete, FilterTracksInput, Track, TracksPagination, UpdateTrackInput } from 'src/graphql.schema';
import { createAuthHeader } from '../common/utils/createAuthHeader'

@Injectable()
export class TracksService {
  client: AxiosInstance;

  constructor() {
    this.client = axios.create({
      baseURL: process.env.TRACKS_URL,
    });

    this.client.interceptors.response.use((res) => {
      return updateEntity(res);
    });
  }

  async findAll(limit: number, offset: number, filters?: FilterTracksInput): Promise<TracksPagination> {
    const config: AxiosRequestConfig = {
      params: {
        limit,
        offset,
        ...filters,
      }
    }

    const res = await this.client.get<TracksPagination>('/', config);

    return res.data;
  }


  async findOne(id: string): Promise<Track> {
    const res = await this.client.get<Track>(id);

    return res.data;
  }

  async create(createTrackInput: CreateTrackInput, jwt: string): Promise<Track> {
    const res = await this.client.post<Track>('', createTrackInput, createAuthHeader(jwt));

    return res.data;
  }

  async update(id: string, updateTrackInput: UpdateTrackInput, jwt: string): Promise<Track> {
    const res = await this.client.put<Track>(id, updateTrackInput, createAuthHeader(jwt));

    return res.data;
  }

  async delete(id: string, jwt: string): Promise<Delete> {
    const res = await this.client.delete<Delete>(`/${id}`, createAuthHeader(jwt));

    return res.data;
  }
}

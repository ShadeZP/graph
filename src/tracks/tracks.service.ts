import { Injectable } from '@nestjs/common';
import axios, { AxiosInstance } from 'axios';
import { updateEntity } from 'src/common/utils/updateEntity';
import { Track } from 'src/graphql.schema';
import { createAuthHeader } from '../common/utils/createAuthHeader'
import { CreateTrackDto } from './dto/create-track.dto';
import { UpdateTrackDto } from './dto/update-track.dto';

interface getTracksResponse {
  items: Track[],
  offset: number,
  limit: number,
  total: number,
}
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

  async findAll(): Promise<getTracksResponse> {
    const res = await this.client.get<getTracksResponse>('');

    return res.data;
  }

  async findOne(id: string): Promise<Track> {
    const res = await this.client.get<Track>(id);

    return res.data;
  }

  async create(createTrackDto: CreateTrackDto, jwt: string): Promise<Track> {
    const res = await this.client.post<Track>('', createTrackDto, createAuthHeader(jwt));

    return res.data;
  }

  async update(id: string, updateTrackDto: UpdateTrackDto, jwt: string) {
    const res = await this.client.put(id, updateTrackDto, createAuthHeader(jwt));

    return res.data;
  }

  async delete(jwt: string) {
    const res = await this.client.delete('', createAuthHeader(jwt));

    return res.data;
  }
}

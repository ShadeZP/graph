import { Args, Context, Mutation, Parent, Query, ResolveField, Resolver } from '@nestjs/graphql';
import { AlbumsService } from 'src/albums/albums.service';
import { ArtistsService } from 'src/artists/artists.service';
import { BandsService } from 'src/bands/bands.service';
import { GenresService } from 'src/genres/genres.service';
import { CreateTrackInput, FilterTracksInput, UpdateTrackInput } from 'src/graphql.schema';
import { TracksService } from './tracks.service';

@Resolver('Track')
export class TracksResolver {
  constructor(
    private tracksService: TracksService,
    private bandsService: BandsService,
    private artistsService: ArtistsService,
    private genresService: GenresService,
    private albumsService: AlbumsService,
  ) {
  }

  @Query('tracks')
  async tracks(
    @Args('limit') limit: number,
    @Args('offset') offset: number,
    @Args('filters') filters: FilterTracksInput,
  ) {
    return this.tracksService.findAll(limit, offset, filters);
  }

  @Query('track')
  async track(
    @Args('id') id: string
  ) {
    return this.tracksService.findOne(id);
  }

  @Mutation('createTrack')
  async createTrack(
    @Args('createTrackInput') createTrackInput: CreateTrackInput,
    @Context() ctx,
  ) {
    const { jwt } = ctx;

    if (!jwt) return null;

    return this.tracksService.create(createTrackInput, jwt);
  }

  @Mutation('updateTrack')
  async updateTrack(
    @Args('id') id: string,
    @Args('updateTrackInput') updateTrackInput: UpdateTrackInput,
    @Context() ctx,
  ) {
    const { jwt } = ctx;

    if (!jwt) return null;

    return this.tracksService.update(id, updateTrackInput, jwt);
  }

  @Mutation('deleteTrack')
  async deleteTrack(
    @Args('id') id: string,
    @Context() ctx,
  ) {
    const { jwt } = ctx;

    if (!jwt) return null;

    return this.tracksService.delete(id, jwt);
  }

  @Resolver()
  @ResolveField('bands')
  async bands(
    @Parent() track
  ) {
    const { bandsIds } = track;

    const res = await Promise.all(bandsIds.map((id) => {
      return this.bandsService.findOne(id);
    }))

    return res;
  }

  @Resolver()
  @ResolveField('artists')
  async artists(
    @Parent() track
  ) {
    const { artistsIds } = track;

    const res = await Promise.all(artistsIds.map((id) => {
      return this.artistsService.findOne(id);
    }))

    return res;
  }

  @Resolver()
  @ResolveField('genres')
  async genres(
    @Parent() track
  ) {
    const { genresIds } = track;

    const res = await Promise.all(genresIds.map((id) => {
      return this.genresService.findOne(id);
    }))

    return res;
  }

  @Resolver()
  @ResolveField('album')
  async album(
    @Parent() track
  ) {
    const { albumId } = track;

    if (albumId) {
      const res = await this.albumsService.findOne(albumId)
      return res;
    }
  }
}

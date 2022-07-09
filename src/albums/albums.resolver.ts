import { Args, Context, Mutation, Parent, Query, ResolveField, Resolver } from '@nestjs/graphql';
import { ArtistsService } from 'src/artists/artists.service';
import { BandsService } from 'src/bands/bands.service';
import { GenresService } from 'src/genres/genres.service';
import { CreateAlbumInput, FilterAlbumsInput, UpdateAlbumInput } from 'src/graphql.schema';
import { TracksService } from 'src/tracks/tracks.service';
import { AlbumsService } from './albums.service';

@Resolver('Album')
export class AlbumsResolver {
  constructor(
    private albumsService: AlbumsService,
    private tracksService: TracksService,
    private bandsService: BandsService,
    private artistsService: ArtistsService,
    private genresService: GenresService,
  ) {
  }

  @Query('albums')
  async albums(
    @Args('limit') limit: number,
    @Args('offset') offset: number,
    @Args('filters') filters: FilterAlbumsInput,
  ) {
    return this.albumsService.findAll(limit, offset, filters);
  }

  @Query('album')
  async album(
    @Args('id') id: string
  ) {
    return this.albumsService.findOne(id);
  }

  @Mutation('createAlbum')
  async createAlbum(
    @Args('createAlbumInput') createAlbumInput: CreateAlbumInput,
    @Context() ctx,
  ) {
    const { jwt } = ctx;

    if (!jwt) return null;

    return this.albumsService.create(createAlbumInput, jwt);
  }

  @Mutation('updateAlbum')
  async updateAlbum(
    @Args('id') id: string,
    @Args('updateAlbumInput') updateAlbumInput: UpdateAlbumInput,
    @Context() ctx,
  ) {
    const { jwt } = ctx;

    if (!jwt) return null;

    return this.albumsService.update(id, updateAlbumInput, jwt);
  }

  @Mutation('deleteAlbum')
  async deleteAlbum(
    @Args('id') id: string,
    @Context() ctx,
  ) {
    const { jwt } = ctx;

    if (!jwt) return null;

    return this.albumsService.delete(id, jwt);
  }

  @Resolver()
  @ResolveField('bands')
  async bands(
    @Parent() album
  ) {
    const { bandsIds } = album;

    const res = await Promise.all(bandsIds.map((id) => {
      return this.bandsService.findOne(id);
    }))

    return res;
  }

  @Resolver()
  @ResolveField('artists')
  async artists(
    @Parent() album
  ) {
    const { artistsIds } = album;

    const res = await Promise.all(artistsIds.map((id) => {
      return this.artistsService.findOne(id);
    }))

    return res;
  }

  @Resolver()
  @ResolveField('genres')
  async genres(
    @Parent() album
  ) {
    const { genresIds } = album;

    const res = await Promise.all(genresIds.map((id) => {
      return this.genresService.findOne(id);
    }))

    return res;
  }

  @Resolver()
  @ResolveField('tracks')
  async tracks(
    @Parent() album
  ) {
    const { trackIds } = album;

    const res = await Promise.all(trackIds.map((id) => {
      return this.tracksService.findOne(id);
    }))

    return res;
  }
}

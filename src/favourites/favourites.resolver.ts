import { Args, Context, Mutation, Parent, Query, ResolveField, Resolver } from '@nestjs/graphql';
import { ArtistsService } from 'src/artists/artists.service';
import { BandsService } from 'src/bands/bands.service';
import { GenresService } from 'src/genres/genres.service';
import { FavouriteType } from 'src/graphql.schema';
import { TracksService } from 'src/tracks/tracks.service';
import { FavouritesService } from './favourites.service';

@Resolver('Favourites')
export class FavouritesResolver {
  constructor(
    private favouritesService: FavouritesService,
    private tracksService: TracksService,
    private bandsService: BandsService,
    private artistsService: ArtistsService,
    private genresService: GenresService,
  ) { }

  @Query('favourites')
  async favourites(
    @Context() ctx,
  ) {
    const { jwt } = ctx;

    if (!jwt) return null;

    return this.favouritesService.findAll(jwt);
  }

  @Mutation('addTrackToFavourites')
  async addTrackToFavourites(
    @Args('id') id: string,
    @Context() ctx,
  ) {
    const { jwt } = ctx;

    if (!jwt) return null;

    return this.favouritesService.add({ type: FavouriteType.tracks, id }, jwt)
  }

  @Mutation('addBandToFavourites')
  async addBandToFavourites(
    @Args('id') id: string,
    @Context() ctx,
  ) {
    const { jwt } = ctx;

    if (!jwt) return null;

    return this.favouritesService.add({ type: FavouriteType.bands, id }, jwt)
  }

  @Mutation('addArtistToFavourites')
  async addArtistToFavourites(
    @Args('id') id: string,
    @Context() ctx,
  ) {
    const { jwt } = ctx;

    if (!jwt) return null;

    return this.favouritesService.add({ type: FavouriteType.artists, id }, jwt)
  }

  @Mutation('addGenreToFavourites')
  async addGenreToFavourites(
    @Args('id') id: string,
    @Context() ctx,
  ) {
    const { jwt } = ctx;

    if (!jwt) return null;

    return this.favouritesService.add({ type: FavouriteType.genres, id }, jwt)
  }

  @Resolver()
  @ResolveField('bands')
  async bands(
    @Parent() favourites
  ) {
    const { bandsIds } = favourites;

    const res = await Promise.all(bandsIds.map((id) => {
      return this.bandsService.findOne(id);
    }))

    return res;
  }

  @Resolver()
  @ResolveField('artists')
  async artists(
    @Parent() favourites
  ) {
    const { artistsIds } = favourites;

    const res = await Promise.all(artistsIds.map((id) => {
      return this.artistsService.findOne(id);
    }))

    return res;
  }

  @Resolver()
  @ResolveField('genres')
  async genres(
    @Parent() favourites
  ) {
    const { genresIds } = favourites;

    const res = await Promise.all(genresIds.map((id) => {
      return this.genresService.findOne(id);
    }))

    return res;
  }

  @Resolver()
  @ResolveField('tracks')
  async tracks(
    @Parent() favourites
  ) {
    const { tracksIds } = favourites;

    const res = await Promise.all(tracksIds.map((id) => {
      return this.tracksService.findOne(id);
    }))

    return res;
  }
}

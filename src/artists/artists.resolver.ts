import { Args, Context, Mutation, Query, Resolver } from '@nestjs/graphql';
import { createTextChangeRange } from '@ts-morph/common/lib/typescript';
import { CreateArtistInput, FilterArtistsInput, UpdateArtistInput } from 'src/graphql.schema';
import { ArtistsService } from './artists.service';

@Resolver('Artist')
export class ArtistsResolver {
  constructor(
    private artistsService: ArtistsService,
  ) {
  }

  @Query('artists')
  artists(
    @Args('limit') limit: number,
    @Args('offset') offset: number,
    @Args('filters') filters: FilterArtistsInput,
  ) {
    return this.artistsService.findAll(limit, offset, filters);
  }

  @Query('artist')
  artist(
    @Args('id') id: string
  ) {
    return this.artistsService.findOne(id);
  }

  @Mutation('createArtist')
  createArtist(
    @Args('createArtistInput') createArtistInput: CreateArtistInput,
    @Context() ctx,
  ) {
    const { jwt } = ctx;

    if (!jwt) return null;

    return this.artistsService.create(createArtistInput, jwt);
  }

  @Mutation('updateArtist')
  updateArtist(
    @Args('id') id: string,
    @Args('updateArtistInput') updateArtistInput: UpdateArtistInput,
    @Context() ctx,
  ) {
    const { jwt } = ctx;

    if (!jwt) return null;

    return this.artistsService.update(id, updateArtistInput, jwt);
  }

  @Mutation('deleteArtist')
  deleteArtist(
    @Args('id') id: string,
    @Context() ctx,
  ) {
    const { jwt } = ctx;

    if (!jwt) return null;

    return this.artistsService.delete(id, jwt);
  }
}

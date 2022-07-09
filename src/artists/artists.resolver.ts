import { Args, Context, Mutation, Parent, Query, ResolveField, Resolver } from '@nestjs/graphql';
import { createTextChangeRange } from '@ts-morph/common/lib/typescript';
import { BandsService } from 'src/bands/bands.service';
import { Artist, CreateArtistInput, FilterArtistsInput, UpdateArtistInput } from 'src/graphql.schema';
import { ArtistsService } from './artists.service';

@Resolver('Artist')
export class ArtistsResolver {
  constructor(
    private artistsService: ArtistsService,
    private bandsService: BandsService,
  ) {
  }

  @Query('artists')
  async artists(
    @Args('limit') limit: number,
    @Args('offset') offset: number,
    @Args('filters') filters: FilterArtistsInput,
  ) {
    return this.artistsService.findAll(limit, offset, filters);
  }

  @Query('artist')
  async artist(
    @Args('id') id: string
  ) {
    return this.artistsService.findOne(id);
  }

  @Mutation('createArtist')
  async createArtist(
    @Args('createArtistInput') createArtistInput: CreateArtistInput,
    @Context() ctx,
  ) {
    const { jwt } = ctx;

    if (!jwt) return null;

    return this.artistsService.create(createArtistInput, jwt);
  }

  @Mutation('updateArtist')
  async updateArtist(
    @Args('id') id: string,
    @Args('updateArtistInput') updateArtistInput: UpdateArtistInput,
    @Context() ctx,
  ) {
    const { jwt } = ctx;

    if (!jwt) return null;

    return this.artistsService.update(id, updateArtistInput, jwt);
  }

  @Mutation('deleteArtist')
  async deleteArtist(
    @Args('id') id: string,
    @Context() ctx,
  ) {
    const { jwt } = ctx;

    if (!jwt) return null;

    return this.artistsService.delete(id, jwt);
  }

  @Resolver()
  @ResolveField('bands')
  async bands(
    @Parent() artist
  ) {
    const { bands } = artist;

    const res = await Promise.all(bands.map((id) => {
      return this.bandsService.findOne(id);
    }))

    return res;
  }
}

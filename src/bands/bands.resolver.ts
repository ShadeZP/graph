import { Args, Context, Mutation, Parent, Query, ResolveField, Resolver } from '@nestjs/graphql';
import { BandsService } from './bands.service';
import { CreateBandInput, FilterBandsInput, UpdateBandInput } from '../graphql.schema'

@Resolver('Bands')
export class BandsResolver {
  constructor(
    private bandsService: BandsService,
  ) { }

  @Query('bands')
  async bands(
    @Args('limit') limit: number,
    @Args('offset') offset: number,
    @Args('filters') filters: FilterBandsInput,
  ) {
    return this.bandsService.findAll(limit, offset, filters);
  }

  @Query('band')
  async band(
    @Args('id') id: string
  ) {
    return this.bandsService.findOne(id);
  }

  @Mutation('createBand')
  async createBand(
    @Args('createBandInput') createBandInput: CreateBandInput,
    @Context() ctx,
  ) {
    const { jwt } = ctx;

    if (!jwt) return null;

    return this.bandsService.create(createBandInput, jwt);
  }

  @Mutation('updateBand')
  async updateBand(
    @Args('id') id: string,
    @Args('updateBandInput') updateBandInput: UpdateBandInput,
    @Context() ctx,
  ) {
    const { jwt } = ctx;

    if (!jwt) return null;

    return this.bandsService.update(id, updateBandInput, jwt);
  }

  @Mutation('deleteBand')
  async deleteBand(
    @Args('id') id: string,
    @Context() ctx,
  ) {
    const { jwt } = ctx;

    if (!jwt) return null;

    return this.bandsService.delete(id, jwt);
  }
}

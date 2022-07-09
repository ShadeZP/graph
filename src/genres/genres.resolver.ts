import { Args, Context, Mutation, Parent, Query, ResolveField, Resolver } from '@nestjs/graphql';
import { CreateGenreInput, FilterGenresInput, UpdateGenreInput } from 'src/graphql.schema';
import { GenresService } from './genres.service';

@Resolver()
export class GenresResolver {
  constructor(
    private genresService: GenresService,
  ) {
  }

  @Query('genres')
  async genres(
    @Args('limit') limit: number,
    @Args('offset') offset: number,
    @Args('filters') filters: FilterGenresInput,
  ) {
    return this.genresService.findAll(limit, offset, filters);
  }

  @Query('genre')
  async genre(
    @Args('id') id: string
  ) {
    return this.genresService.findOne(id);
  }

  @Mutation('createGenre')
  async createGenre(
    @Args('createGenreInput') createGenreInput: CreateGenreInput,
    @Context() ctx,
  ) {
    const { jwt } = ctx;

    if (!jwt) return null;

    return this.genresService.create(createGenreInput, jwt);
  }

  @Mutation('updateGenre')
  async updateGenre(
    @Args('id') id: string,
    @Args('updateGenreInput') updateGenreInput: UpdateGenreInput,
    @Context() ctx,
  ) {
    const { jwt } = ctx;

    if (!jwt) return null;

    return this.genresService.update(id, updateGenreInput, jwt);
  }

  @Mutation('deleteGenre')
  async deleteGenre(
    @Args('id') id: string,
    @Context() ctx,
  ) {
    const { jwt } = ctx;

    if (!jwt) return null;

    return this.genresService.delete(id, jwt);
  }
}

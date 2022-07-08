
import { ApolloDriver, ApolloDriverConfig } from '@nestjs/apollo';
import { Module } from '@nestjs/common';
import { GraphQLModule } from '@nestjs/graphql';
import { upperDirectiveTransformer } from './common/directives/upper-case.directive';
import { UsersModule } from './users/users.module';
import { AlbumsModule } from './albums/albums.module';
import { ArtistsModule } from './artists/artists.module';
import { BandsModule } from './bands/bands.module';
import { FavouritesModule } from './favourites/favourites.module';
import { GenresModule } from './genres/genres.module';
import { TracksModule } from './tracks/tracks.module';

@Module({
  imports: [
    GraphQLModule.forRoot<ApolloDriverConfig>({
      driver: ApolloDriver,
      typePaths: ['./**/*.graphql'],
      transformSchema: schema => upperDirectiveTransformer(schema, 'upper'),
      installSubscriptionHandlers: true,
      context: ({ req }) => {
        const token: string = req.headers.authorization || '';

        return {
          config: {
            headers: {
              Authorization: token,
            },
          },
        };
      },
    }),
    UsersModule,
    AlbumsModule,
    ArtistsModule,
    BandsModule,
    FavouritesModule,
    GenresModule,
    TracksModule,
  ],
})
export class AppModule { }
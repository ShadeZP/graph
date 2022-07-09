
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
import { ConfigModule } from '@nestjs/config';
import { ApolloServerPluginLandingPageLocalDefault } from 'apollo-server-core';
import { BandsService } from './bands/bands.service';
import { ArtistsService } from './artists/artists.service';
import { FavouritesService } from './favourites/favourites.service';
import { GenresService } from './genres/genres.service';
import { TracksService } from './tracks/tracks.service';
import { UsersService } from './users/users.service';
import { ArtistsResolver } from './artists/artists.resolver';
import { BandsResolver } from './bands/bands.resolver';
import { UsersResolver } from './users/users.resolver';
import { GenresResolver } from './genres/genres.resolver';
import { TracksResolver } from './tracks/tracks.resolver';
import { AlbumsService } from './albums/albums.service';
import { AlbumsResolver } from './albums/albums.resolver';

@Module({
  imports: [
    GraphQLModule.forRoot<ApolloDriverConfig>({
      driver: ApolloDriver,
      playground: false,
      plugins: [ApolloServerPluginLandingPageLocalDefault()],
      typePaths: ['./**/*.graphql'],
      transformSchema: schema => upperDirectiveTransformer(schema, 'upper'),
      installSubscriptionHandlers: true,
      context: ({ req }) => {
        const token: string = req.headers.authorization || '';

        return {
          jwt: token,
        };
      },
    }),
    ConfigModule.forRoot(),
    UsersModule,
    AlbumsModule,
    ArtistsModule,
    BandsModule,
    FavouritesModule,
    GenresModule,
    TracksModule,
  ],
  providers: [
    BandsService,
    ArtistsService,
    FavouritesService,
    GenresService,
    TracksService,
    UsersService,
    ArtistsResolver,
    BandsResolver,
    UsersService,
    UsersResolver,
    GenresService,
    GenresResolver,
    TracksService,
    TracksResolver,
    AlbumsService,
    AlbumsResolver,
  ]
})
export class AppModule { }
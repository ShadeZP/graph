
/*
 * -------------------------------------------------------
 * THIS FILE WAS AUTOMATICALLY GENERATED (DO NOT MODIFY)
 * -------------------------------------------------------
 */

/* tslint:disable */
/* eslint-disable */
export enum FavouriteType {
    bands = "bands",
    genres = "genres",
    artists = "artists",
    tracks = "tracks"
}

export class CreateAlbumInput {
    name: string;
    released?: Nullable<number>;
    artistsIds: string;
    bandsIds?: Nullable<string[]>;
    trackIds?: Nullable<string[]>;
    genresIds?: Nullable<string[]>;
    image?: Nullable<string>;
}

export class UpdateAlbumInput {
    name: string;
    released?: Nullable<number>;
    artistsIds?: Nullable<string[]>;
    bandsIds?: Nullable<string[]>;
    trackIds?: Nullable<string[]>;
    genresIds?: Nullable<string[]>;
    image?: Nullable<string>;
}

export class FilterAlbumsInput {
    name: string;
    released?: Nullable<string>;
    image?: Nullable<string>;
}

export class CreateArtistInput {
    firstName: string;
    secondName: string;
    country: string;
    middleName?: Nullable<string>;
    birthDate?: Nullable<string>;
    birthPlace?: Nullable<string>;
    bands?: Nullable<string[]>;
    instruments?: Nullable<string[]>;
}

export class UpdateArtistInput {
    firstName?: Nullable<string>;
    secondName?: Nullable<string>;
    middleName?: Nullable<string>;
    birthDate?: Nullable<string>;
    birthPlace?: Nullable<string>;
    country?: Nullable<string>;
    bands?: Nullable<string[]>;
    instruments?: Nullable<string[]>;
}

export class FilterArtistsInput {
    firstName?: Nullable<string>;
    secondName?: Nullable<string>;
    middleName?: Nullable<string>;
    birthDate?: Nullable<string>;
    birthPlace?: Nullable<string>;
    country?: Nullable<string>;
}

export class UpdateMember {
    artist?: Nullable<string>;
    instrument?: Nullable<string>;
    years?: Nullable<string[]>;
}

export class CreateBandInput {
    name: string;
    origin?: Nullable<string>;
    members?: Nullable<UpdateMember[]>;
    website?: Nullable<string>;
    genresIds?: Nullable<string[]>;
}

export class UpdateBandInput {
    name?: Nullable<string>;
    origin?: Nullable<string>;
    members?: Nullable<UpdateMember[]>;
    website?: Nullable<string>;
    genresIds?: Nullable<string[]>;
}

export class FilterBandsInput {
    name?: Nullable<string>;
    origin?: Nullable<string>;
    website?: Nullable<string>;
}

export class AddToFavouritesInput {
    type: FavouriteType;
    id: string;
}

export class RemoveFromFavouritesInput {
    type: FavouriteType;
    id: string;
}

export class CreateGenreInput {
    name: string;
    description?: Nullable<string>;
    country?: Nullable<string>;
    year?: Nullable<string>;
}

export class UpdateGenreInput {
    name?: Nullable<string>;
    description?: Nullable<string>;
    country?: Nullable<string>;
    year?: Nullable<string>;
}

export class FilterGenresInput {
    name?: Nullable<string>;
    description?: Nullable<string>;
    country?: Nullable<string>;
    year?: Nullable<string>;
}

export class CreateTrackInput {
    title: string;
    albumId?: Nullable<string>;
    bandsIds?: Nullable<string[]>;
    artistsIds?: Nullable<string[]>;
    duration?: Nullable<number>;
    released?: Nullable<number>;
    genresIds?: Nullable<string[]>;
}

export class UpdateTrackInput {
    title?: Nullable<string>;
    albumId?: Nullable<string>;
    bandsIds?: Nullable<string[]>;
    artistsIds?: Nullable<string[]>;
    duration?: Nullable<number>;
    released?: Nullable<number>;
    genresIds?: Nullable<string[]>;
}

export class FilterTracksInput {
    title?: Nullable<string>;
    albumId?: Nullable<string>;
    duration?: Nullable<number>;
    released?: Nullable<number>;
}

export class RegisterInput {
    firstName: string;
    lastName: string;
    password: string;
    email: string;
    favouriteArtistIds?: Nullable<string[]>;
    favouriteSongsIds?: Nullable<string[]>;
    favouriteBandsIds?: Nullable<string[]>;
    favouriteGenresIds?: Nullable<string[]>;
}

export class LoginInput {
    email: string;
    password: string;
}

export abstract class IQuery {
    abstract album(id: string): Nullable<Album> | Promise<Nullable<Album>>;

    abstract albums(limit: number, offset: number, filters?: Nullable<FilterAlbumsInput>): Nullable<AlbumsPagination> | Promise<Nullable<AlbumsPagination>>;

    abstract artist(id: string): Nullable<Artist> | Promise<Nullable<Artist>>;

    abstract artists(limit: number, offset: number, filters?: Nullable<FilterArtistsInput>): Nullable<ArtistsPagination> | Promise<Nullable<ArtistsPagination>>;

    abstract band(id: string): Nullable<Band> | Promise<Nullable<Band>>;

    abstract bands(limit: number, offset: number, filters?: Nullable<FilterBandsInput>): Nullable<BandsPagination> | Promise<Nullable<BandsPagination>>;

    abstract favourites(): Nullable<Favourites> | Promise<Nullable<Favourites>>;

    abstract genre(id: string): Nullable<Genre> | Promise<Nullable<Genre>>;

    abstract genres(limit: number, offset: number, filters?: Nullable<FilterGenresInput>): Nullable<GenresPagination> | Promise<Nullable<GenresPagination>>;

    abstract track(id: string): Nullable<Track> | Promise<Nullable<Track>>;

    abstract tracks(limit: number, offset: number, filters?: Nullable<FilterTracksInput>): Nullable<TracksPagination> | Promise<Nullable<TracksPagination>>;

    abstract user(id: string): Nullable<User> | Promise<Nullable<User>>;

    abstract jwt(email: string, password: string): Nullable<JWT> | Promise<Nullable<JWT>>;
}

export abstract class IMutation {
    abstract createAlbum(createAlbumInput: CreateAlbumInput): Nullable<Album> | Promise<Nullable<Album>>;

    abstract updateAlbum(id: string, updateAlbumInput: UpdateAlbumInput): Nullable<Album> | Promise<Nullable<Album>>;

    abstract deleteAlbum(id: string): Nullable<Delete> | Promise<Nullable<Delete>>;

    abstract createArtist(createArtistInput: CreateArtistInput): Nullable<Artist> | Promise<Nullable<Artist>>;

    abstract updateArtist(id: string, updateArtistInput: UpdateArtistInput): Nullable<Artist> | Promise<Nullable<Artist>>;

    abstract deleteArtist(id: string): Nullable<Delete> | Promise<Nullable<Delete>>;

    abstract createBand(createBandInput: CreateBandInput): Nullable<Band> | Promise<Nullable<Band>>;

    abstract updateBand(id: string, updateBandInput: UpdateBandInput): Nullable<Band> | Promise<Nullable<Band>>;

    abstract deleteBand(id: string): Nullable<Delete> | Promise<Nullable<Delete>>;

    abstract addTrackToFavourites(id: string): Nullable<Favourites> | Promise<Nullable<Favourites>>;

    abstract addBandToFavourites(id: string): Nullable<Favourites> | Promise<Nullable<Favourites>>;

    abstract addArtistToFavourites(id: string): Nullable<Favourites> | Promise<Nullable<Favourites>>;

    abstract addGenreToFavourites(id: string): Nullable<Favourites> | Promise<Nullable<Favourites>>;

    abstract createGenre(createGenreInput: CreateGenreInput): Nullable<Genre> | Promise<Nullable<Genre>>;

    abstract updateGenre(id: string, updateGenreInput: UpdateGenreInput): Nullable<Genre> | Promise<Nullable<Genre>>;

    abstract deleteGenre(id: string): Nullable<Delete> | Promise<Nullable<Delete>>;

    abstract createTrack(createTrackInput: CreateTrackInput): Nullable<Track> | Promise<Nullable<Track>>;

    abstract updateTrack(id: string, updateTrackInput: UpdateTrackInput): Nullable<Track> | Promise<Nullable<Track>>;

    abstract deleteTrack(id: string): Nullable<Delete> | Promise<Nullable<Delete>>;

    abstract register(firstName: string, lastName: string, password: string, email: string, favouriteArtistIds?: Nullable<string[]>): User | Promise<User>;
}

export class Album {
    id: string;
    name?: Nullable<string>;
    released?: Nullable<string>;
    artists?: Nullable<Artist[]>;
    bands?: Nullable<Band[]>;
    tracks?: Nullable<Track[]>;
    genres?: Nullable<Genre[]>;
    image?: Nullable<string>;
}

export class AlbumsPagination {
    items?: Nullable<Album[]>;
    offset?: Nullable<number>;
    limit?: Nullable<number>;
    total?: Nullable<number>;
}

export class Artist {
    id: string;
    firstName?: Nullable<string>;
    secondName?: Nullable<string>;
    middleName?: Nullable<string>;
    birthDate?: Nullable<string>;
    birthPlace?: Nullable<string>;
    country?: Nullable<string>;
    bands?: Nullable<Band[]>;
    instruments?: Nullable<string[]>;
}

export class ArtistsPagination {
    items?: Nullable<Artist[]>;
    offset?: Nullable<number>;
    limit?: Nullable<number>;
    total?: Nullable<number>;
}

export class Band {
    id: string;
    name?: Nullable<string>;
    origin?: Nullable<string>;
    members?: Nullable<Member[]>;
    website?: Nullable<string>;
    genres?: Nullable<Genre[]>;
}

export class Member {
    artist?: Nullable<string>;
    instrument?: Nullable<string>;
    years?: Nullable<string[]>;
}

export class BandsPagination {
    items?: Nullable<Band[]>;
    offset?: Nullable<number>;
    limit?: Nullable<number>;
    total?: Nullable<number>;
}

export class Delete {
    acknowledged?: Nullable<boolean>;
    deletedCount?: Nullable<number>;
}

export class Favourites {
    id: string;
    userId?: Nullable<string>;
    bands?: Nullable<Nullable<Band>[]>;
    genres?: Nullable<Nullable<Genre>[]>;
    artists?: Nullable<Nullable<Artist>[]>;
    tracks?: Nullable<Nullable<Track>[]>;
}

export class Genre {
    id: string;
    name?: Nullable<string>;
    description?: Nullable<string>;
    country?: Nullable<string>;
    year?: Nullable<number>;
}

export class GenresPagination {
    items?: Nullable<Genre[]>;
    offset?: Nullable<number>;
    limit?: Nullable<number>;
    total?: Nullable<number>;
}

export class Track {
    id: string;
    title: string;
    album?: Nullable<Album>;
    artists?: Nullable<Artist[]>;
    bands?: Nullable<Band[]>;
    duration?: Nullable<number>;
    released?: Nullable<number>;
    genres?: Nullable<Genre[]>;
}

export class TracksPagination {
    items?: Nullable<Nullable<Track>[]>;
    offset?: Nullable<number>;
    limit?: Nullable<number>;
    total?: Nullable<number>;
}

export class User {
    id: string;
    firstName: string;
    lastName: string;
    password: string;
    email: string;
}

export class JWT {
    jwt: string;
}

type Nullable<T> = T | null;

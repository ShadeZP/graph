
/*
 * -------------------------------------------------------
 * THIS FILE WAS AUTOMATICALLY GENERATED (DO NOT MODIFY)
 * -------------------------------------------------------
 */

/* tslint:disable */
/* eslint-disable */
export class CreateArtistInput {
    firstName: string;
    secondName: string;
    middleName?: Nullable<string>;
    birthDate?: Nullable<string>;
    birthPlace?: Nullable<string>;
    country: string;
    bands?: Nullable<Nullable<string>[]>;
    instruments?: Nullable<Nullable<string>[]>;
}

export class UpdateArtistInput {
    firstName?: Nullable<string>;
    secondName?: Nullable<string>;
    middleName?: Nullable<string>;
    birthDate?: Nullable<string>;
    birthPlace?: Nullable<string>;
    country?: Nullable<string>;
    bands?: Nullable<Nullable<string>[]>;
    instruments?: Nullable<Nullable<string>[]>;
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
    years?: Nullable<Nullable<string>[]>;
}

export class CreateBandInput {
    name: string;
    origin?: Nullable<string>;
    members?: Nullable<Nullable<UpdateMember>[]>;
    website?: Nullable<string>;
    genresIds?: Nullable<Nullable<string>[]>;
}

export class UpdateBandInput {
    name?: Nullable<string>;
    origin?: Nullable<string>;
    members?: Nullable<Nullable<UpdateMember>[]>;
    website?: Nullable<string>;
    genresIds?: Nullable<Nullable<string>[]>;
}

export class FilterBandsInput {
    name?: Nullable<string>;
    origin?: Nullable<string>;
    website?: Nullable<string>;
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

export class RegisterInput {
    firstName: string;
    lastName: string;
    password: string;
    email: string;
    favouriteArtistIds?: Nullable<Nullable<string>[]>;
    favouriteSongsIds?: Nullable<Nullable<string>[]>;
    favouriteBandsIds?: Nullable<Nullable<string>[]>;
    favouriteGenresIds?: Nullable<Nullable<string>[]>;
}

export class LoginInput {
    email: string;
    password: string;
}

export class Album {
    id: string;
    name?: Nullable<string>;
    released?: Nullable<number>;
    artists?: Nullable<Nullable<Artist>[]>;
    bands?: Nullable<Nullable<Band>[]>;
    tracks?: Nullable<Nullable<Track>[]>;
    genres?: Nullable<Nullable<Genre>[]>;
    image?: Nullable<string>;
}

export abstract class IQuery {
    abstract artist(id: string): Nullable<Artist> | Promise<Nullable<Artist>>;

    abstract artists(limit?: Nullable<number>, offset?: Nullable<number>, filters?: Nullable<FilterArtistsInput>): Nullable<ArtistsPagination> | Promise<Nullable<ArtistsPagination>>;

    abstract band(id: string): Nullable<Band> | Promise<Nullable<Band>>;

    abstract bands(limit?: Nullable<number>, offset?: Nullable<number>, filters?: Nullable<FilterBandsInput>): Nullable<BandsPagination> | Promise<Nullable<BandsPagination>>;

    abstract genre(id: string): Nullable<Genre> | Promise<Nullable<Genre>>;

    abstract genres(limit?: Nullable<number>, offset?: Nullable<number>, filters?: Nullable<FilterGenresInput>): Nullable<GenresPagination> | Promise<Nullable<GenresPagination>>;

    abstract user(id: string): Nullable<User> | Promise<Nullable<User>>;

    abstract jwt(email: string, password: string): Nullable<JWT> | Promise<Nullable<JWT>>;
}

export abstract class IMutation {
    abstract createArtist(createArtistInput?: Nullable<CreateArtistInput>): Nullable<Artist> | Promise<Nullable<Artist>>;

    abstract updateArtist(id?: Nullable<string>, updateArtistInput?: Nullable<UpdateArtistInput>): Nullable<Artist> | Promise<Nullable<Artist>>;

    abstract deleteArtist(id?: Nullable<string>): Nullable<Delete> | Promise<Nullable<Delete>>;

    abstract createBand(createBandInput?: Nullable<CreateBandInput>): Nullable<Band> | Promise<Nullable<Band>>;

    abstract updateBand(id?: Nullable<string>, updateBandInput?: Nullable<UpdateBandInput>): Nullable<Band> | Promise<Nullable<Band>>;

    abstract deleteBand(id?: Nullable<string>): Nullable<Delete> | Promise<Nullable<Delete>>;

    abstract createGenre(createGenreInput?: Nullable<CreateGenreInput>): Nullable<Genre> | Promise<Nullable<Genre>>;

    abstract updateGenre(id?: Nullable<string>, updateGenreInput?: Nullable<UpdateGenreInput>): Nullable<Genre> | Promise<Nullable<Genre>>;

    abstract deleteGenre(id?: Nullable<string>): Nullable<Delete> | Promise<Nullable<Delete>>;

    abstract register(firstName: string, lastName: string, password: string, email: string, favouriteArtistIds?: Nullable<string[]>): User | Promise<User>;
}

export class Artist {
    id: string;
    firstName?: Nullable<string>;
    secondName?: Nullable<string>;
    middleName?: Nullable<string>;
    birthDate?: Nullable<string>;
    birthPlace?: Nullable<string>;
    country?: Nullable<string>;
    bands?: Nullable<Nullable<Band>[]>;
    instruments?: Nullable<Nullable<string>[]>;
}

export class ArtistsPagination {
    items?: Nullable<Nullable<Artist>[]>;
    offset?: Nullable<number>;
    limit?: Nullable<number>;
    total?: Nullable<number>;
}

export class Band {
    id: string;
    name?: Nullable<string>;
    origin?: Nullable<string>;
    members?: Nullable<Nullable<Member>[]>;
    website?: Nullable<string>;
    genres?: Nullable<Nullable<Genre>[]>;
}

export class Member {
    artist?: Nullable<string>;
    instrument?: Nullable<string>;
    years?: Nullable<Nullable<string>[]>;
}

export class BandsPagination {
    items?: Nullable<Nullable<Band>[]>;
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
    items?: Nullable<Nullable<Genre>[]>;
    offset?: Nullable<number>;
    limit?: Nullable<number>;
    total?: Nullable<number>;
}

export class Track {
    id: string;
    title: string;
    album?: Nullable<Album>;
    artists?: Nullable<Nullable<Artist>[]>;
    bands?: Nullable<Nullable<Band>[]>;
    duration?: Nullable<number>;
    released?: Nullable<number>;
    genres?: Nullable<Nullable<Genre>[]>;
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

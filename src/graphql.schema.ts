
/*
 * -------------------------------------------------------
 * THIS FILE WAS AUTOMATICALLY GENERATED (DO NOT MODIFY)
 * -------------------------------------------------------
 */

/* tslint:disable */
/* eslint-disable */
export abstract class IQuery {
    abstract user(id: string): Nullable<User> | Promise<Nullable<User>>;

    abstract jwt(email: string, password: string): Nullable<JWT> | Promise<Nullable<JWT>>;
}

export abstract class IMutation {
    abstract register(firstName: string, lastName: string, password: string, email: string, favouriteArtistIds?: Nullable<string[]>): User | Promise<User>;
}

export class User {
    _id: string;
    firstName: string;
    lastName: string;
    password: string;
    email: string;
}

export class JWT {
    jwt: string;
}

type Nullable<T> = T | null;

export interface ArtistDTO {
  _id: string;
  firstName: string;
  secondName: string;
  middleName: string;
  birthDate: string;
  birthPlace: string;
  country: string;
  bandsIds: string[]
  instruments: string[];
}

export interface UserDTO {
  _id: string;
  firstName: string;
  lastName: string;
  password: string;
  email: string;
}

export interface BandDTO {
  _id: string;
  name: string;
  origin: string;
  membersId: MemberDTO[];
  website: string;
  genresIds: string[];
}

export interface MemberDTO {
  artist: string,
  instrument: string,
  years: string[],
}

export interface GenreDTO {
  _id: string;
  name: string;
  description: string;
  country: string;
  year: string;
}

export interface TrackDTO {
  _id: string;
  title: string;
  albumId: string;
  artistsIds: string[];
  bandsIds: string[];
  duration: number;
  released: number;
  genresIds: string[];
}

export interface AlbumDTO {
  _id: string;
  name: string;
  released: number;
  artistsIds: string[];
  bandsIds: string[];
  trackIds: string[];
  genresIds: string[];
  image: string;
}

export interface FavoriteDTO {
  _id: string;
  userId: string;
  bandsIds: string[];
  genresIds: string[];
  artistsIds: string[];
  tracksIds: string[];
}
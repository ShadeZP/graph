import {
    IsArray,
    IsEmail,
    IsNotEmpty,
    IsOptional,
    IsString,
    Length,
} from 'class-validator';

export class RegisterDto {
    @IsString()
    @IsNotEmpty()
    firstName: string;

    @IsString()
    @IsNotEmpty()
    lastName: string;

    @Length(8)
    @IsNotEmpty()
    password: string;

    @IsEmail()
    @IsNotEmpty()
    email: string;

    @IsArray()
    @IsOptional()
    favouriteArtistIds?: string[];

    @IsArray()
    @IsOptional()
    favouriteSongsIds?: string[];

    @IsArray()
    @IsOptional()
    favouriteBandsIds?: string[];

    @IsArray()
    @IsOptional()
    favouriteGenresIds?: string[];
}

import { IsNumber, IsOptional, IsString } from 'class-validator';

export class CreateAlbumDto {
    @IsString()
    name: string;

    @IsNumber()
    @IsOptional()
    released?: string;

    @IsString()
    @IsOptional()
    artistsIds?: string[];

    @IsOptional()
    bandsIds?: string[];

    @IsOptional()
    trackIds?: string[];

    @IsOptional()
    genresIds?: string[];

    @IsOptional()
    image?: Buffer;
}

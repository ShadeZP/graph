import { IsArray, IsOptional, IsString } from 'class-validator';
import { MemberDTO } from 'src/common/models/interfaces';

export class CreateBandDto {
    @IsString()
    name: string;

    @IsString()
    @IsOptional()
    origin?: string;

    @IsArray()
    @IsOptional()
    members?: MemberDTO[];

    @IsString()
    @IsOptional()
    website?: string;

    @IsArray()
    @IsOptional()
    genresIds?: string[];
}

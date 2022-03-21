import { ApiProperty } from '@nestjs/swagger';
import { Type } from 'class-transformer';
import { IsNotEmpty, IsNumber } from 'class-validator';

export class GetExampleDto {
    @ApiProperty({
        description: `A number of current pagination`,
        example: 1,
        required: true,
    })
    @IsNotEmpty()
    @IsNumber()
    @Type(() => Number)
    page: number;

    @ApiProperty({
        description: `A number of records that show per page`,
        example: 10,
        required: true,
    })
    @IsNotEmpty()
    @IsNumber()
    @Type(() => Number)
    limit: number;
}

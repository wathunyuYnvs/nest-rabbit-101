import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString } from 'class-validator';

export class ExampleDto {
    @ApiProperty({
        description: `value of something ??`,
        example: 'Hi mom.',
        required: true,
    })
    @IsNotEmpty()
    @IsString()
    value: string;
}

import { ApiProperty } from '@nestjs/swagger';
import { IsArray, IsNumber } from 'class-validator';

export class CommonPaginationResDto<T> {
  /** results */
  @ApiProperty({ required: true, isArray: true })
  @IsArray()
  results: T[];

  /** totalCount */
  @ApiProperty({ required: true, format: 'number' })
  @IsNumber()
  totalCount: number;
}

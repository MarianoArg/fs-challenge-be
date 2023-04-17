import { Transform, Type } from 'class-transformer';
import { IsInt, IsOptional, Max, Min, ValidateIf } from 'class-validator';
import { TodoStatus } from '@prisma/client';
import { ApiProperty } from '@nestjs/swagger';

export class GetTodosDto {
  @ApiProperty({ required: false })
  @ValidateIf((params) => params.page !== 0)
  @IsOptional()
  @IsInt()
  @Type(() => Number ?? null)
  page?: string;

  @ApiProperty({ required: false })
  @ValidateIf((params) => params.size !== 0)
  @IsOptional()
  @IsInt()
  @Min(1)
  @Max(20)
  @Type(() => Number)
  size?: number;

  @ApiProperty({ required: false })
  @Transform(({ value }) =>
    typeof value === 'string' &&
    Object.values(TodoStatus).includes(value.toUpperCase() as TodoStatus)
      ? value.toUpperCase()
      : undefined,
  )
  @IsOptional()
  status?: TodoStatus;
}

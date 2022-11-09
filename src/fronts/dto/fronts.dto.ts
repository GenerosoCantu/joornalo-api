import { ApiProperty } from '@nestjs/swagger';
import { IsString, IsInt, IsNotEmpty, IsBoolean } from 'class-validator';
import { Exclude } from 'class-transformer';
import { classToPlain } from 'class-transformer';

export class FrontDto {

  // @IsString()
  // @IsNotEmpty()
  // @ApiProperty()
  // readonly date: Date;

  @IsString()
  @IsNotEmpty()
  @ApiProperty()
  readonly status: string;

  @IsString()
  @IsNotEmpty()
  @ApiProperty()
  readonly section: string;

  // @IsString()
  // @ApiProperty()
  // readonly cover: string;

  toJSON() {
    return classToPlain(this);
  }
}

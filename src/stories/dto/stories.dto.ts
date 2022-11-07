import { ApiProperty } from '@nestjs/swagger';
import { IsString, IsInt, IsNotEmpty, IsBoolean } from 'class-validator';
import { Exclude } from 'class-transformer';
import { classToPlain } from 'class-transformer';

export class StoryDto {

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

  @IsString()
  @ApiProperty()
  readonly subsection: string;

  @IsString()
  @IsNotEmpty()
  @ApiProperty()
  readonly title: string;

  @IsString()
  @ApiProperty()
  readonly desc: string;

  @IsString()
  @ApiProperty()
  readonly text: string;

  @ApiProperty()
  readonly images: string[];

  @ApiProperty()
  readonly embed: string[];

  @ApiProperty()
  readonly quotes: string[];

  toJSON() {
    return classToPlain(this);
  }
}

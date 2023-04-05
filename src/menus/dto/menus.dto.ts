import { ApiProperty } from '@nestjs/swagger';
import { IsString, IsInt, IsNotEmpty, IsBoolean } from 'class-validator';
import { Exclude } from 'class-transformer';
import { classToPlain } from 'class-transformer';

export class MenuDto {

  @IsString()
  @IsNotEmpty()
  @ApiProperty()
  readonly menuName: string;

  // @IsString()
  // @ApiProperty()
  // readonly cover: string;

  // menuOptions: [
  //   {
  //     id: String,
  //     order: Number,
  //     name: String,
  //     link: String,
  //     active: Boolean,
  //     dependencyId: String,
  //     css: String
  //   }
  // ]

  toJSON() {
    return classToPlain(this);
  }
}

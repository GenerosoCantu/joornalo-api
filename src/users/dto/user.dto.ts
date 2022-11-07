import { ApiProperty } from '@nestjs/swagger';
import { IsString, IsInt, IsNotEmpty, IsBoolean } from 'class-validator';
import { Exclude } from 'class-transformer';
import { classToPlain } from 'class-transformer';

export class UserDto {
  @IsString()
  @IsNotEmpty()
  @ApiProperty()
  readonly email: string;

  @IsString()
  @IsNotEmpty()
  @ApiProperty()
  readonly role: string;

  @IsString()
  @IsNotEmpty()
  @ApiProperty()
  readonly firstName: string;

  @IsString()
  @IsNotEmpty()
  @ApiProperty()
  readonly lastName: string;

  // @ApiProperty()
  @Exclude({ toPlainOnly: true })
  readonly password: string;

  @ApiProperty()
  readonly phone: string;

  @ApiProperty()
  readonly reg_time: Date;

  @ApiProperty()
  readonly login_fail: number;

  @ApiProperty()
  readonly locked: boolean;

  @ApiProperty()
  readonly verified: boolean;

  @ApiProperty()
  readonly permissions: string[];

  @ApiProperty()
  readonly status: string;

  @ApiProperty()
  readonly sections: string[];

  @ApiProperty()
  readonly modules: string[];

  toJSON() {
    return classToPlain(this);
  }

  // constructor(partial: Partial<UserDto>) {
  //   Object.assign(this, partial);
  // }
}

export class PermissionsDto {
  @ApiProperty()
  readonly permissions: string[];
}
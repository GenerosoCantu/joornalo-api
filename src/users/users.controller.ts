import { Controller, Request, Get, Post, Put, Patch, Delete, Body, Param, Header, UseGuards, UseInterceptors } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { UserDto, PermissionsDto } from './dto/user.dto';
import { UsersService } from './users.service';
import { User, Permissions } from './interfaces/user.interface';

@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) { }

  @Post()
  @UseGuards(AuthGuard('jwt'))
  create(@Body() userDto: UserDto): Promise<User> {
    return this.usersService.create(userDto);
  }

  @Delete(':id')
  delete(@Param('id') id): Promise<User> {
    return this.usersService.delete(id);
  }

  //@Header('x-men', 'eureka')
  @UseGuards(AuthGuard('jwt'))
  @Get('profile')
  getProfile(@Request() req) {
    console.log('UsersController profile ++++++++++++++++++++++++++++++++');
    return this.usersService.findUserProfile(req.user.email);
  }

  // @UseGuards(AuthGuard('jwt'))
  // @Get('profile')
  // getProfile(@Request() req) {
  //   //return req.user;
  //   let user = this.usersService.findOne(req.user.userId).then((res) => {
  //     console.log('==============', res);
  //     return req.user;
  //   });

  // }

  @UseGuards(AuthGuard('jwt'))
  @Get()
  findAll() {
    return this.usersService.findAll();
  }

  @UseGuards(AuthGuard('jwt'))
  @Get('/:id')
  getUser(@Param('id') id): Promise<User> {
    return this.usersService.findOne(id);
  }

  @UseGuards(AuthGuard('jwt'))
  @Patch('/:id')
  updateUser(@Body() updateUserDto: UserDto, @Param('id') id): Promise<User> {
    return this.usersService.update(id, updateUserDto);
  }

  @Put('permissions/:id')
  update(@Body() permissionsDto: PermissionsDto, @Param('id') id): Promise<User> {
    return this.usersService.updatePermissions(id, permissionsDto);
  }

}

import { Controller, Post, Get, Header, UseGuards, Req, Res } from '@nestjs/common';
import { Request } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { AuthService } from '../auth/auth.service';
// import { Request, Response } from 'express';
// import { CreateItemDto } from './dto/create-item.dto';
// import { ItemsService } from './items.service';
// import { Item } from './interfaces/item.interface';

@Controller('auth')
export class AuthController {
  constructor(
    private readonly authService: AuthService,
  ) { }

  @UseGuards(AuthGuard('local'))
  @Post('/login')
  async login(@Request() req) {
    return this.authService.login(req.user);
  }

  // @UseGuards(AuthGuard('local'))
  // @Post('/login')
  // async login(@Req() req, @Res({ passthrough: true }) res: Response) {
  //   const response = await this.authService.login(req.user);

  //   res.cookie('access_token', response['accessToken'], {
  //     // httpOnly: true,
  //     secure: true,
  //     // sameSite: 'lax',
  //     expires: new Date(Date.now() + 1 * 24 * 60 * 1000),
  //   }).send(response.user);
  // }

  @UseGuards(AuthGuard('jwt'))
  @Get('/validate')
  async valid() {
    console.log('Valid Token------------------------------')
    return;
  }

}

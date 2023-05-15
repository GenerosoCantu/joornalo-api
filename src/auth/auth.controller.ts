import { Controller, Request, Post, Get, Header, UseGuards } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { AuthService } from '../auth/auth.service';
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

  @UseGuards(AuthGuard('jwt'))
  @Get('/validate')
  async valid() {
    console.log('Valid Token------------------------------')
    return;
  }

}

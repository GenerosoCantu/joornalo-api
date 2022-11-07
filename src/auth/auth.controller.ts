import { Controller, Request, Post, Get, Header, UseGuards } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { AuthService } from '../auth/auth.service';
// import { CreateItemDto } from './dto/create-item.dto';
// import { ItemsService } from './items.service';
// import { Item } from './interfaces/item.interface';

@Controller('login')
export class AuthController {
  constructor(
    private readonly authService: AuthService,
  ) { }

  @UseGuards(AuthGuard('local'))
  @Post()
  async login(@Request() req) {
    return this.authService.login(req.user);
  }

}

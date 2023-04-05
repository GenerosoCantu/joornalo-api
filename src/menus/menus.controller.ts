import { Controller, Request, Get, Post, Put, Patch, Delete, Body, Param, Header, UseGuards, Query, UseInterceptors } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { MenuDto } from './dto/menus.dto';
import { MenusService } from './menus.service';
import { Menu } from './interfaces/menus.interface';

@Controller('menus')
export class MenusController {
  constructor(private readonly MenusService: MenusService) { }

  @UseGuards(AuthGuard('jwt'))
  @Get()
  findAll(@Query() { page, limit, section, status, sortBy, sortOrder, date }): Promise<any> {
    console.log(sortBy, ':::', sortOrder)
    return this.MenusService.findAll(page, limit, section, status, sortBy, sortOrder, date);
  }

  @UseGuards(AuthGuard('jwt'))
  @Get('/:id')
  getMenus(@Param('id') id): Promise<Menu> {
    return this.MenusService.findOne(id);
  }

  @Post()
  @UseGuards(AuthGuard('jwt'))
  create(@Body() MenuDto: MenuDto): Promise<Menu> {
    return this.MenusService.create(MenuDto);
  }

  @UseGuards(AuthGuard('jwt'))
  @Patch('/:id')
  updateMenu(@Body() updateMenuDto: MenuDto, @Param('id') id): Promise<Menu> {
    return this.MenusService.update(id, updateMenuDto);
  }

  @Delete(':id')
  delete(@Param('id') id): Promise<Menu> {
    return this.MenusService.delete(id);
  }

}

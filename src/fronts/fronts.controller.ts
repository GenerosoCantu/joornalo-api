import { Controller, Request, Get, Post, Put, Patch, Delete, Body, Param, Header, UseGuards, Query, UseInterceptors } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { FrontDto } from './dto/fronts.dto';
import { FrontsService } from './fronts.service';
import { Front } from './interfaces/fronts.interface';

@Controller('fronts')
export class FrontsController {
  constructor(private readonly FrontsService: FrontsService) { }

  @UseGuards(AuthGuard('jwt'))
  @Get()
  findAll(@Query() { page, limit, section, status, sortBy, sortOrder, date }): Promise<any> {
    console.log(sortBy, ':::', sortOrder)
    return this.FrontsService.findAll(page, limit, section, status, sortBy, sortOrder, date);
  }

  @UseGuards(AuthGuard('jwt'))
  @Get('/:id')
  getFronts(@Param('id') id): Promise<Front> {
    return this.FrontsService.findOne(id);
  }

  @Post()
  @UseGuards(AuthGuard('jwt'))
  create(@Body() FrontDto: FrontDto): Promise<Front> {
    return this.FrontsService.create(FrontDto);
  }

  @UseGuards(AuthGuard('jwt'))
  @Patch('/:id')
  updateFront(@Body() updateFrontDto: FrontDto, @Param('id') id): Promise<Front> {
    return this.FrontsService.update(id, updateFrontDto);
  }

  @Delete(':id')
  delete(@Param('id') id): Promise<Front> {
    return this.FrontsService.delete(id);
  }

}

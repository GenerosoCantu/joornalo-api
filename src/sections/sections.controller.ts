import { Controller, Request, Get, Post, Put, Patch, Delete, Body, Param, Header, UseGuards, UseInterceptors } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { SectionDto } from './dto/section.dto';
import { SectionsService } from './sections.service';
import { Section } from './interfaces/section.interface';

@Controller('sections')
export class SectionsController {
  constructor(private readonly sectionsService: SectionsService) { }

  @UseGuards(AuthGuard('jwt'))
  @Get()
  findAll(): Promise<Section[]> {
    return this.sectionsService.findAll();
  }

  @UseGuards(AuthGuard('jwt'))
  @Get('/:id')
  getSection(@Param('id') id): Promise<Section> {
    return this.sectionsService.findOne(id);
  }

  @Post()
  @UseGuards(AuthGuard('jwt'))
  create(@Body() sectionDto: SectionDto): Promise<Section> {
    console.log('sectionDto==========================');
    console.log(sectionDto);
    return this.sectionsService.create(sectionDto);
  }

  @UseGuards(AuthGuard('jwt'))
  @Patch('/:id')
  updateSection(@Body() updateSectionDto: SectionDto, @Param('id') id): Promise<Section> {
    return this.sectionsService.update(id, updateSectionDto);
  }

  @Delete(':id')
  delete(@Param('id') id): Promise<Section> {
    return this.sectionsService.delete(id);
  }

}

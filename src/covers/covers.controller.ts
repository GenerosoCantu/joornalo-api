import { Controller, Get, Post, Put, Delete, Body, Param } from '@nestjs/common';
import { CreateCoverDto } from './dto/create-cover.dto';
import { CoversService } from './covers.service';
import { Cover } from './interfaces/cover.interface';
import { ValidationPipe, ParseUUIDPipe, UploadedFile, UseInterceptors, UploadedFiles } from '@nestjs/common';
import { FileInterceptor, FilesInterceptor } from '@nestjs/platform-express';


@Controller('covers')
export class CoversController {
  constructor(
    private readonly coversService: CoversService
  ) { }

  // @Get()
  // findAll(): any {
  //   return this.coversService.external();
  // }

  @Get()
  findAll(): Promise<Cover[]> {
    return this.coversService.findAll();
  }

  @Get(':id')
  findOne(@Param('id', new ParseUUIDPipe({ version: '4' })) id): Promise<Cover> {
    return this.coversService.findOne(id);
  }

  // @Post()
  // create(@Body() createCoverDto: CreateCoverDto): Promise<Cover> {
  //   return this.coversService.create(createCoverDto);
  // }

  // @Delete(':id')
  // delete(@Param('id') id): Promise<Cover> {
  //   return this.coversService.delete(id);
  // }

  // @Put(':id')
  // update(@Body() updateCoverDto: CreateCoverDto, @Param('id') id): Promise<Cover> {
  //   return this.coversService.update(id, updateCoverDto);
  // }

  // @Post('upload')
  // @UseInterceptors(FilesInterceptor('file', 1, { dest: './data/tmp' }))
  // async uploadFile(@UploadedFiles() file) {
  //   return this.coversService.uploadFile(file);
  // }

}

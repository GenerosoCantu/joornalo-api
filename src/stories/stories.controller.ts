import { Controller, Request, Get, Post, Put, Patch, Delete, Body, Param, Header, UseGuards, Query, UseInterceptors } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { StoryDto } from './dto/stories.dto';
import { StoriesService } from './stories.service';
import { Story } from './interfaces/stories.interface';

@Controller('stories')
export class StoriesController {
  constructor(private readonly storiesService: StoriesService) { }

  @UseGuards(AuthGuard('jwt'))
  @Get()
  findAll(@Query() { page, limit, section, status, sortBy, sortOrder, date }): Promise<any> {
    console.log(sortBy, ':::', sortOrder)
    return this.storiesService.findAll(page, limit, section, status, sortBy, sortOrder, date);
  }

  @UseGuards(AuthGuard('jwt'))
  @Get('/:id')
  getStories(@Param('id') id): Promise<Story> {
    return this.storiesService.findOne(id);
  }

  @Post()
  @UseGuards(AuthGuard('jwt'))
  create(@Body() storyDto: StoryDto): Promise<Story> {
    return this.storiesService.create(storyDto);
  }

  @UseGuards(AuthGuard('jwt'))
  @Patch('/:id')
  updateStory(@Body() updateStoryDto: StoryDto, @Param('id') id): Promise<Story> {
    return this.storiesService.update(id, updateStoryDto);
  }

  @Delete(':id')
  delete(@Param('id') id): Promise<Story> {
    return this.storiesService.delete(id);
  }

}

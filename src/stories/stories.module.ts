import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { StoriesController } from './stories.controller';
import { StoriesService } from './stories.service';
import { StorySchema } from './schemas/stories.schema';

@Module({
  imports: [MongooseModule.forFeature([{ name: 'Story', schema: StorySchema }])],
  controllers: [StoriesController],
  providers: [StoriesService],
  exports: [StoriesService],
})
export class StoriesModule { }
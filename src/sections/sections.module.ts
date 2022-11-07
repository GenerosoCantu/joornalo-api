import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { SectionsController } from './sections.controller';
import { SectionsService } from './sections.service';
import { SectionSchema } from './schemas/section.schema';

@Module({
  imports: [MongooseModule.forFeature([{ name: 'Section', schema: SectionSchema }])],
  controllers: [SectionsController],
  providers: [SectionsService],
  exports: [SectionsService],
})
export class SectionsModule { }
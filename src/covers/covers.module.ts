import { Module } from '@nestjs/common';
import { HttpModule } from '@nestjs/axios'
import { MongooseModule } from '@nestjs/mongoose';
import { CoversController } from './covers.controller';
import { CoversService } from './covers.service';
import { CoverSchema } from './schemas/cover.schema';

@Module({
  imports: [HttpModule, MongooseModule.forFeature([{ name: 'Cover', schema: CoverSchema }])],
  controllers: [CoversController],
  providers: [CoversService],
})
export class CoversModule { }

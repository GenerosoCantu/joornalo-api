import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { FrontsController } from './fronts.controller';
import { FrontsService } from './fronts.service';
import { FrontSchema } from './schemas/fronts.schema';

@Module({
  imports: [MongooseModule.forFeature([{ name: 'Front', schema: FrontSchema }])],
  controllers: [FrontsController],
  providers: [FrontsService],
  exports: [FrontsService],
})
export class FrontsModule { }
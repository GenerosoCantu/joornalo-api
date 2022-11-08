import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { AppController } from './app.controller';
import { AppService } from './app.service';

import { AuthModule } from './auth/auth.module';
import { CoversModule } from './covers/covers.module';
import { FilesModule } from './files/files.module';
import { FrontsModule } from './fronts/fronts.module';
import { ModulesModule } from './modules/modules.module';
import { SectionsModule } from './sections/sections.module';
import { StoriesModule } from './stories/stories.module';
import { UsersModule } from './users/users.module';

import config from './config/keys'

@Module({
  imports: [
    MongooseModule.forRoot(config.mongoURI),
    AuthModule,
    CoversModule,
    FilesModule,
    FrontsModule,
    ModulesModule,
    SectionsModule,
    StoriesModule,
    UsersModule
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule { }
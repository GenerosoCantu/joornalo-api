import { Controller, Get, Post, Put, Delete, Body, Param } from '@nestjs/common';
import { FilesService } from './files.service';
import { ValidationPipe, ParseUUIDPipe, UploadedFile, UseInterceptors, UploadedFiles } from '@nestjs/common';
import { FileInterceptor, FilesInterceptor } from '@nestjs/platform-express';
import { imageFileFilter } from '../utils/file-upload.utils';
import { diskStorage } from 'multer';

@Controller('files')
export class FilesController {
  constructor(
    private readonly filesService: FilesService
  ) { }

  // @Post('uploadx')
  // @UseInterceptors(FilesInterceptor('file', 1, { dest: './data/tmp' }))
  // async uploadFile(@UploadedFiles() file, @Body() body) {
  //   console.log(body.name);
  //   console.log('file----', file);
  //   return this.filesService.uploadFile(file);
  // }

  @Post('upload')
  @UseInterceptors(
    FileInterceptor('file', {
      storage: diskStorage({
        destination: './data/tmp',
        filename: (req, file, cb) => {
          const extension = file.originalname.split('.').pop();
          // [fieldName]-[date].[ext]
          cb(null, `${file.fieldname}-${Date.now()}.${extension}`);
        },
      }),
      fileFilter: imageFileFilter,
    }),
  )
  async uploadedFile(@UploadedFile() file) {
    console.log(file);
    const response = {
      originalname: file.originalname,
      filename: file.filename,
    };
    return response;
  }

}

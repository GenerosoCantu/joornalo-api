import { Controller, Get, Post, Put, Delete, Body, Param } from '@nestjs/common';
import { FilesService } from './files.service';
import { ValidationPipe, ParseUUIDPipe, UploadedFile, UseInterceptors, UploadedFiles } from '@nestjs/common';
import { FileInterceptor, FilesInterceptor } from '@nestjs/platform-express';
import { imageFileFilter } from '../utils/file-upload.utils';
import { diskStorage } from 'multer';
const fs = require('fs');

@Controller('files')
export class FilesController {
  constructor(
    private readonly filesService: FilesService
  ) { }

  // @Post('upload')
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
          // console.log('req==>', req)
          // console.log('file==>', file)
          // console.log('cb==>', cb)
          const extension = file.originalname.split('.').pop();
          // [fieldName]-[date].[ext]
          cb(null, `${file.fieldname}-${Date.now()}.${extension}`);
        },
      }),
      fileFilter: imageFileFilter,
    }),
  )
  async uploadedFile(@UploadedFile() file) {
    // console.log('uploadedFile----------------------------');
    // console.log(file);
    if (file.originalname !== 'tmpImage.webp') {
      this.filesService.deleteFile('data/tmp/' + file.originalname);
    }
    const response = {
      originalname: file.originalname,
      filename: file.filename,
      src: `http://localhost:5000/tmp/${file.filename}`
    };
    return response;
  }

  @Delete(':id')
  delete(@Param('id') id): Promise<any> {
    return this.filesService.deleteFile('data/tmp/' + id);
  }

}

import { Injectable, NotFoundException } from '@nestjs/common';
import { HttpService } from '@nestjs/axios'
// import * as config from 'config';
import * as fs from 'fs';
// import * as path from 'path';


@Injectable()
export class FilesService {
  constructor() { }

  // async uploadFile(file) {
  //   console.log('filename: ', file[0]);
  //   console.log('filename: ', file[0].filename);
  //   fs.rename('data/tmp/' + file[0].filename, 'data/b/' + file[0].originalname, (err) => {
  //     if (err) console.log(err);
  //     fs.unlink('data/tmp/' + file[0].filename, (err) => {
  //       // if (err) console.log(err);
  //       console.log('originalname: ', file[0].originalname);
  //       console.log('Download complete!');
  //       return { file: file[0].originalname };
  //     });
  //   });
  // }

  async deleteFile(fileName) {
    fs.unlink(fileName, (err) => {
      if (err) {
        console.log(err);
      }
      console.log("Delete File successfully...", fileName);
      return {};
    });
  }

  // async moveFile(oldPath, newPath) {
  //   fs.rename(oldPath, newPath, (err) => {
  //     if (err) {
  //       console.log(err);
  //     }
  //     console.log("File successfully moved...", newPath);
  //     return {};
  //   });
  // }

  // async moveTmpImages(id, images) {
  //   console.log('id:', id)
  //   console.log('images:', images)
  //   // const folders = id.split('');
  //   // const path = '' + folders[0] + '/' + folders[1] + '/'
  //   // console.log('path:', path)
  //   // console.log('images:', images)

  // }

}

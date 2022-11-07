import { Injectable, NotFoundException } from '@nestjs/common';
import { HttpService } from '@nestjs/axios'
// import * as config from 'config';
import * as fs from 'fs';
// import * as path from 'path';


@Injectable()
export class FilesService {
  constructor() { }

  async uploadFile(file) {
    console.log('filename: ', file[0]);
    console.log('filename: ', file[0].filename);
    fs.rename('data/tmp/' + file[0].filename, 'data/b/' + file[0].originalname, (err) => {
      if (err) throw err;
      fs.unlink('data/tmp/' + file[0].filename, (err) => {
        // if (err) throw err;
        console.log('originalname: ', file[0].originalname);
        console.log('Download complete!');
        return { file: file[0].originalname };
      });
    });
  }

}

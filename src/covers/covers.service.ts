import { Model } from 'mongoose';
import { Injectable, NotFoundException } from '@nestjs/common';
import { HttpService } from '@nestjs/axios'
import { InjectModel } from '@nestjs/mongoose';
import { Cover } from './interfaces/cover.interface'
// import { map } from 'rxjs/operators';
// import * as config from 'config';
// import { Storage } from '@google-cloud/storage';
import * as fs from 'fs';
// import * as path from 'path';

// const envVar = config.get('gcs');

// const private_key = process.env.private_key || envVar.private_key;
// const storage = new Storage({
//   credentials: {
//     client_email: process.env.client_email || envVar.client_email,
//     private_key: private_key.replace(/\\n/g, '\n')
//   },
//   projectId: process.env.project_id || envVar.project_id
// });
// const bucket = storage.bucket(process.env.bucket || envVar.bucket);
//storage.getBuckets().then(x => console.log(x));


@Injectable()
export class CoversService {
  constructor(
    private readonly httpService: HttpService,
    @InjectModel('Cover') private readonly coverModel: Model<Cover>,

  ) { }

  async findAll(): Promise<Cover[]> {
    return await this.coverModel.find();
  }

  async findOne(id: string): Promise<Cover> {
    const found = await this.coverModel.findOne({ _id: id });
    if (!found) {
      throw new NotFoundException();
    }
    return found;
  }

  async create(cover: Cover): Promise<Cover> {
    const newCover = new this.coverModel(cover);
    fs.writeFile('data/a/' + newCover['_id'] + '.json', JSON.stringify(cover), function (err) {
      if (err) console.log(err);
    });
    return await newCover.save();
  }

  async delete(id: string): Promise<Cover> {
    return await this.coverModel.findByIdAndRemove(id);
  }

  async update(id: string, cover: Cover): Promise<Cover> {
    return await this.coverModel.findByIdAndUpdate(id, cover, { new: true });
  }

}

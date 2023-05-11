import { Model } from 'mongoose';
import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Front } from './interfaces/fronts.interface'
import { createJsonFile } from '../utils/file-json.utils';
import { CoversModule } from 'src/covers/covers.module';
// import * as fs from 'fs';

@Injectable()
export class FrontsService {
  constructor(
    @InjectModel('Front') private readonly frontModel: Model<Front>
  ) { }

  async findAll(page: number = 0, limit: number = 10, section, status, sortBy = 'date', sortOrder = '-1', date = null): Promise<any> {
    // title search index TBD
    // return await this.frontModel.find();
    // http://localhost:4000/front/?page=0&limit=5&section=international&status=Pending&sortBy=date&sortOrder=-1&date=12/1/2021

    const match = {
      ...(section && { section }),
      ...(status && { status }),
      ...(date && { date: { $gte: new Date(date + ' 00:00:00'), $lte: new Date(date + ' 23:59:59') } })
    };

    const skip = page * limit

    const response = await this.frontModel.aggregate([
      { $match: match },
      { '$sort': { 'date': sortOrder === '1' ? 1 : -1 } },
      {
        '$facet': {
          metadata: [
            { $count: "totalItems" },
            {
              $addFields: {
                itemsPerPage: limit,
                page
              }
            }
          ],
          data: [{ $skip: +skip }, { $limit: +limit }]
        }
      }
    ]);

    return {
      metadata: response[0].metadata[0],
      data: response[0].data
    }
  }

  async findOne(id: string): Promise<Front> {
    console.log('findOne:', id);
    return await this.frontModel.findOne({ _id: id });
  }

  // async findFront(email: string): Promise<Front> {
  //   return await this.frontModel.findOne({ email: email });
  // }

  async create(front: Front): Promise<Front> {
    const newFront = new this.frontModel(front);
    // replace with writeJsonFile
    createJsonFile('data/front/', newFront['_id'], newFront);
    return await newFront.save();
  }

  async update(id: string, front: Front): Promise<Front> {
    // createJsonFile('data/front/', front['_id'], front);
    console.log('front--------------------------')
    console.log(front)
    return await this.frontModel.findByIdAndUpdate(id, front, { new: true });
  }

  async delete(id: string): Promise<Front> {
    return await this.frontModel.findByIdAndRemove(id);
  }

}
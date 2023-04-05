import { Model } from 'mongoose';
import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Menu } from './interfaces/menus.interface'
import { createJsonFile } from '../utils/file-json.utils';
import { CoversModule } from 'src/covers/covers.module';
// import * as fs from 'fs';

@Injectable()
export class MenusService {
  constructor(
    @InjectModel('Menu') private readonly menuModel: Model<Menu>
  ) { }

  async findAll(page: number = 0, limit: number = 10, section, status, sortBy = 'date', sortOrder = '-1', date = null): Promise<any> {
    // title search index TBD
    // return await this.menuModel.find();
    // http://localhost:4000/menu/?page=0&limit=5&section=international&status=Pending&sortBy=date&sortOrder=-1&date=12/1/2021

    const match = {
      ...(section && { section }),
      ...(status && { status }),
      ...(date && { date: { $gte: new Date(date + ' 00:00:00'), $lte: new Date(date + ' 23:59:59') } })
    };

    const skip = page * limit

    const response = await this.menuModel.aggregate([
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

  async findOne(id: string): Promise<Menu> {
    console.log('findOne:', id);
    return await this.menuModel.findOne({ _id: id });
  }

  // async findMenu(email: string): Promise<Menu> {
  //   return await this.menuModel.findOne({ email: email });
  // }

  async create(menu: Menu): Promise<Menu> {
    const newMenu = new this.menuModel(menu);
    createJsonFile('data/menu/', newMenu['_id'], newMenu);
    return await newMenu.save();
  }

  async update(id: string, menu: Menu): Promise<Menu> {
    // createJsonFile('data/menu/', menu['_id'], menu);
    console.log('menu--------------------------')
    console.log(menu)
    return await this.menuModel.findByIdAndUpdate(id, menu, { new: true });
  }

  async delete(id: string): Promise<Menu> {
    return await this.menuModel.findByIdAndRemove(id);
  }

}
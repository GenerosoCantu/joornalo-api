import { Model } from 'mongoose';
import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Module } from './interfaces/module.interface'

@Injectable()
export class ModulesService {
  constructor(
    @InjectModel('Module') private readonly moduleModel: Model<Module>
  ) { }

  async findAll(): Promise<Module[]> {
    return await this.moduleModel.find();
  }

}
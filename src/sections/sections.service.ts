import { Model } from 'mongoose';
import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Section } from './interfaces/section.interface'

@Injectable()
export class SectionsService {
  constructor(
    @InjectModel('Section') private readonly sectionModel: Model<Section>
  ) { }

  async findAll(): Promise<Section[]> {
    return await this.sectionModel.find();
  }

  async findOne(id: string): Promise<Section> {
    console.log('findOne:', id);
    return await this.sectionModel.findOne({ id: id });
  }

  async findSection(email: string): Promise<Section> {
    return await this.sectionModel.findOne({ email: email });
  }

  async create(section: Section): Promise<Section> {
    const newSection = new this.sectionModel(section);
    console.log('newSection==========================');
    console.log(newSection);
    return await newSection.save();
  }

  async update(id: string, section: Section): Promise<Section> {
    return await this.sectionModel.findByIdAndUpdate(section._id, section, { new: true, useFindAndModify: false });
  }

  async delete(id: string): Promise<Section> {
    return await this.sectionModel.findByIdAndRemove(id);
  }

}
import { Model } from 'mongoose';
import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Story } from './interfaces/Stories.interface'
import { createFolders, deleteFile, writeJsonFile, moveImages, deleteFolders } from '../utils/file-json.utils';
// import { CoversModule } from 'src/covers/covers.module';

@Injectable()
export class StoriesService {
  constructor(
    @InjectModel('Story') private readonly storyModel: Model<Story>
  ) { }

  async findAll(page: number = 0, limit: number = 10, section, status, sortBy = 'date', sortOrder = '-1', date = null): Promise<any> {
    // title search index TBD
    // return await this.storyModel.find();
    // http://localhost:4000/story/?page=0&limit=5&section=international&status=Pending&sortBy=date&sortOrder=-1&date=12/1/2021

    const match = {
      ...(section && { section }),
      ...(status && { status }),
      ...(date && { date: { $gte: new Date(date + ' 00:00:00'), $lte: new Date(date + ' 23:59:59') } })
    };

    const skip = page * limit

    const response = await this.storyModel.aggregate([
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

  async findOne(id: string): Promise<Story> {
    return await this.storyModel.findOne({ _id: id });
  }

  async create(story: Story): Promise<Story> {
    const newStory = new this.storyModel(story);
    const path = await createFolders('data/story/', newStory['_id'])
    if (story.status === 'Active') {
      writeJsonFile(path, 'story', newStory);
    }
    moveImages(path, [], story['images']);
    return newStory.save();
  }

  async update(id: string, story: Story): Promise<Story> {
    const oldStory = await this.storyModel.findOne({ _id: id });
    const path = await createFolders('data/story/', id)
    if (story.status === 'Active') {
      writeJsonFile(path, 'story', story);
    } else {
      deleteFile(path + 'story.json')
    }
    moveImages(path, oldStory['images'], story['images']);
    return await this.storyModel.findByIdAndUpdate(id, story, { new: true });
  }

  async delete(id: string): Promise<Story> {
    const story = await this.storyModel.findOne({ _id: id });
    const path = await createFolders('data/story/', id)
    await deleteFile(path + 'story.json')
    await moveImages(path, story['images'], []);
    await deleteFolders('data/story/', id)
    return await this.storyModel.findByIdAndRemove(id);
  }

}
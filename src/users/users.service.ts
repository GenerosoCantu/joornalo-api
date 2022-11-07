import { Model } from 'mongoose';
import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { User, Permissions } from './interfaces/user.interface'
import { AuthService } from '../auth/auth.service';
// import { any } from '@hapi/joi';

@Injectable()
export class UsersService {
  constructor(
    @InjectModel('User') private readonly userModel: Model<User>,
    // @InjectModel('UserPass') private readonly userPassModel: Model<UserPass>
  ) { }

  async findAll(): Promise<any> {
    const users = await this.userModel.find();
    return this.buildUsers(users);
  }

  async create(user: User): Promise<any> {
    const newUser = new this.userModel(user);
    const userTmp: User = await newUser.save();
    return this.buildUser(userTmp);

  }

  async update(id: string, user: User): Promise<any> {
    console.log('==========================');
    console.log(id);
    console.log(user);
    const userTmp: User = await this.userModel.findByIdAndUpdate(id, user, { new: true, useFindAndModify: false });
    return this.buildUser(userTmp);
  }

  async sleep(ms) {
    return new Promise((resolve) => {
      setTimeout(resolve, ms);
    });
  }

  async delete(id: string): Promise<any> {
    const user: User = await this.userModel.findByIdAndRemove(id);
    return {};
    // return await this.userModel.findByIdAndRemove(id);
  }

  async findOne(id: string): Promise<any> {
    const user: User = await this.userModel.findOne({ _id: id });
    return this.buildUser(user);
  }

  async findUser(email: string): Promise<User> {
    console.log('findUser:', email);
    return await this.userModel.findOne({ email: email });
  }

  async findUserProfile(email: string): Promise<any> {
    const user: User = await this.findUser(email);
    return this.buildUser(user);
  }

  async badLogin(id: string, login_fail: number): Promise<User> {
    const fails = (login_fail) ? login_fail + 1 : 1;
    const body = (fails > 3) ? { login_fail: fails, locked: true } : { login_fail: fails };
    return await this.userModel.findByIdAndUpdate(id, body, { new: true });
  }

  async updatePermissions(id: string, permissions: Permissions): Promise<User> {
    return await this.userModel.findByIdAndUpdate(id, permissions);
  }

  private buildUser(user: User) {
    const userRO = {
      _id: user.id,
      email: user.email,
      firstName: user.firstName,
      lastName: user.lastName,
      phone: user.phone,
      role: user.role,
      reg_time: user.reg_time,
      login_fail: user.login_fail,
      locked: user.locked,
      verified: user.verified,
      status: user.status,
      modules: user.modules,
      sections: user.sections
    };
    return userRO;
  }

  private buildUsers(users: any[]) {
    const usersRO = users.map((user) => {
      return {
        _id: user._id,
        email: user.email,
        firstName: user.firstName,
        lastName: user.lastName,
        role: user.role,
        locked: user.locked,
        verified: user.verified,
        status: user.status
      };
    })
    return usersRO;
  }


}
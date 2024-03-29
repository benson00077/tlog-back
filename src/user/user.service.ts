import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { RegisterInput } from 'src/auth/dtos/register.input';
import { UpdateUserInput } from './dtos/update-user.input';
import { UserDocument } from './schema/user.schema';

@Injectable()
export class UserService {
  constructor(
    @InjectModel('User') private readonly userModel: Model<UserDocument>,
  ) {}

  /**
   *  For auth service
   */
  public async getUserCount() {
    return this.userModel.estimatedDocumentCount();
  }

  public async findOneByEmail(email: string): Promise<UserDocument> {
    return this.userModel.findOne({ email });
  }

  public async findOneByUsername(username: string): Promise<UserDocument> {
    return this.userModel.findOne({ username });
  }

  public async create(input: RegisterInput): Promise<UserDocument> {
    return this.userModel.create(input);
  }

  /**
   *  For user module and auth module
   */
  public async updateUser(input: UpdateUserInput): Promise<UserDocument> {
    const { id, ...rest } = input;
    return this.userModel.findByIdAndUpdate(id, rest, { new: true });
  }
}

import bcrypt from 'bcrypt';
import { model, Schema } from 'mongoose';
import { TUserTypes, UserModel } from './user.interface';
import { role } from './user.constant';
import config from '../../config';

const userSchema = new Schema<TUserTypes, UserModel>(
  {
    name: {
      type: String,
      required: true,
      trim: true,
      maxlength: [50, 'Name can not be more than 50 characters'],
    },
    email: {
      type: String,
      required: true,
      trim: true,
    },
    password: {
      type: String,
      required: true,
      select: false,
    },
    phone: {
      type: String,
      required: true,
      trim: true,
    },
    role: {
      type: String,
      enum: role,
    },
    address: {
      type: String,
      required: true,
      trim: true,
    },
    isDeleted: {
      type: Boolean,
      default: false,
      select: false,
    },
  }
);

// secure password using bcrypt and save into data
userSchema.pre('save', async function (next) { // doc
  // hashing password and save into DB
  this.password = await bcrypt.hash(
    this.password,
    Number(config.bcrypt_salt_rounds),
  );
  next();
});

userSchema.statics.isUserExists = async function(email: string) {
  const existingUser = await User.findOne({ email }).select('+password');
  return existingUser;
}

userSchema.statics.isPasswordMatched = async function (
  plainTextPassword,
  hashedPassword,
) {
  return await bcrypt.compare(plainTextPassword, hashedPassword);
};

export const User = model<TUserTypes, UserModel>(
  'User',
  userSchema,
);

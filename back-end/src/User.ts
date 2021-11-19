import { Role } from 'auth0';
import mongoose from 'mongoose';

// interface that scribe the properties that are required to create a new User
interface UserAttrs {
  _id: string;
  username: string;
}

// interface that describes the properties that User model has
interface UserModel extends mongoose.Model<UserDoc> {
  build(attrs: UserAttrs): UserDoc;
}

// interface that describes the properties that a User Document has
export interface UserDoc extends mongoose.Document, UserAttrs {
  _id: string;
}

const userSchema = new mongoose.Schema<UserDoc, UserModel>(
  {
    _id: {
      type: String,
      required: true,
    },
    username: {
      type: String,
      require: true,
    },
  },
  {
    toJSON: {
      transform(_, ret) {
        ret.id = ret._id;
        delete ret._id;
        delete ret.__v;
      },
    },
  },
);

userSchema.statics.build = (attrs: UserAttrs) => {
  return new User(attrs);
};

const User = mongoose.model<UserDoc, UserModel>('User', userSchema);

export { User };

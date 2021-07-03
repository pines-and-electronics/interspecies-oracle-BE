import { Document, model, Schema } from 'mongoose'
import TC from './TC'

const UserSchema = new Schema(
  {
    name: {
      type: String,
      required: true,
    },
    userID: {
      type: String,
      unique: true,
      required: true,
    },
  },
  {
    timestamps: true,
  }
)

interface User extends Document {
  name: string
  userID: string
}

const UserModel = model<User>('User', UserSchema, 'users')

const { UserTC, queries, mutations } = TC(UserModel)

export { UserModel, UserTC }
export default { queries, mutations }

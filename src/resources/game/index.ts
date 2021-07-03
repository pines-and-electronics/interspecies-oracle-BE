import { composeMongoose } from 'graphql-compose-mongoose'
import { Document, model, Schema } from 'mongoose'
import genSchema from '../../utils/schema-utils'

const GameSchema = new Schema(
  {
    name: {
      type: String,
      required: true,
    },
    thoughts: {
      type: String,
    },
    description: {
      type: String,
      unique: true,
      required: true,
    },
    rewards: {
      type: [String],
    },
    active: {
      type: Boolean,
      default: true,
    },
  },
  {
    timestamps: true,
  }
)

interface Game extends Document {
  name: string
  gameID: string
}

const GameModel = model<Game>('Game', GameSchema, 'games')

const GameTC = composeMongoose(GameModel, {})

export default genSchema('Game', GameTC)

export { GameModel, GameTC }

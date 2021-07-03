import { composeMongoose } from 'graphql-compose-mongoose'
import { Document, model, Schema } from 'mongoose'
import genSchema from '../../utils/schema-utils'

const GameSchema = new Schema(
  {
    name: {
      type: String,
      required: true,
    },
    description: {
      type: String,
      unique: true,
      required: true,
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

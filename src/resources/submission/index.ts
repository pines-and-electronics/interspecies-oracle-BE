import { composeMongoose } from 'graphql-compose-mongoose'
import { Document, model, Schema } from 'mongoose'
import genSchema from '../../utils/schema-utils'

const SubmissionSchema = new Schema(
  {
    name: {
      type: String,
      required: true,
    },
    gameID: {
      type: String,
      required: false,
    },
    userID: {
      type: String,
      required: false,
    },
    pictureHash: {
      type: String,
      required: false,
    },
    pictureLink: {
      type: String,
      required: false,
    },
    maskHash: {
      type: String,
      required: false,
    },
    maskImage: {
      type: String,
      required: false,
    },
    maskLink: {
      type: String,
      required: false,
    },
    location: {
      latitude: {
        type: String,
        required: false,
      },
      longitude: {
        type: String,
        required: false,
      },
    },
    gpsAccuracy: {
      type: String,
      required: false,
    },
    poem: {
      type: String,
      required: false,
    },
    description: {
      type: String,
      required: false,
    },
    flagCertified: {
      type: Boolean,
      default: false,
    },
    flagEntered: {
      type: Boolean,
      default: false,
    },
    votes: {
      type: Number,
      default: 0,
      index: true,
    },
    flagWinner: {
      type: Boolean,
      default: false,
    },
    staking: {
      stake: {
        type: Number,
        default: 0,
      },
    },
  },
  {
    timestamps: true,
  }
)

interface Submission extends Document {
  name: string
  submissionID: string
}

const SubmissionModel = model<Submission>('Submission', SubmissionSchema, 'submissions')

const SubmissionTC = composeMongoose(SubmissionModel, {})

export default genSchema('Submission', SubmissionTC)

export { SubmissionModel, SubmissionTC }

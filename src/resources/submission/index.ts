import { composeMongoose } from 'graphql-compose-mongoose'
import { Document, model, Schema } from 'mongoose'
import genSchema from '../../utils/schema-utils'

const SubmissionSchema = new Schema(
  {
    name: {
      type: String,
      required: true,
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

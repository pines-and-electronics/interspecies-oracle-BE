import { schemaComposer } from 'graphql-compose'
import mongoose from 'mongoose'

import User from './user'
import Game from './game'
import Submission from './submission'

const RESOURCE_SCHEMAS = {
  User,
  Game,
  Submission,
}

for (const name of mongoose.modelNames()) {
  const { queries, mutations } = RESOURCE_SCHEMAS[name]
  schemaComposer.Query.addFields(queries)
  schemaComposer.Mutation.addFields(mutations)
}

export default schemaComposer.buildSchema()

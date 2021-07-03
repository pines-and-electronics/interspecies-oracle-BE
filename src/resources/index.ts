import { schemaComposer } from 'graphql-compose'
import mongoose from 'mongoose'

import User from './user'
import Game from './game'

const RESOURCE_SCHEMAS = {
  User,
  Game,
}

for (const name of mongoose.modelNames()) {
  const { queries, mutations } = RESOURCE_SCHEMAS[name]
  schemaComposer.Query.addFields(queries)
  schemaComposer.Mutation.addFields(mutations)
}

export default schemaComposer.buildSchema()

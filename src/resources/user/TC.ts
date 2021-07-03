import { schemaComposer } from 'graphql-compose'
import { composeMongoose } from 'graphql-compose-mongoose'

import logger from '../../utils/logger'

import genSchema from '../../utils/schema-utils'

import { Model } from 'mongoose'

function beforeUserCreate(resolver) {
  return resolver.wrapResolve(next => async rp => {
    rp.beforeRecordMutate = async doc => {
      doc.accepted = false
      logger.info(doc)

      return doc
    }
    return next(rp)
  })
}

export default function getTC(UserModel: Model<any>): any {
  const UserTC = composeMongoose(UserModel, {})

  const { queries, mutations } = genSchema('User', UserTC)

  mutations.userCreateOne = beforeUserCreate(UserTC.mongooseResolvers.createOne())

  // Tpe for custom resolver
  const UsersManyByDateType = schemaComposer.createObjectTC({
    name: 'UsersManyByDateType',
    fields: {
      _id: 'String!',
      users: [UserTC],
      count: 'Int',
    },
  })

  UserTC.addResolver({
    name: `userManyGroupByDate`,
    type: [UsersManyByDateType],
    args: { clear: 'Boolean' },
    resolve: async () => {
      return await UserModel.aggregate([
        {
          $sort: { createdAt: -1 },
        },
        {
          $group: {
            _id: { $dateToString: { format: '%Y-%m-%d', date: '$createdAt' } },
            users: { $push: '$$ROOT' },
            count: { $sum: 1 },
          },
        },
        {
          $sort: { _id: -1 },
        },
      ])
    },
  })

  queries.userManyGroupByDate = UserTC.getResolver('userManyGroupByDate')

  return { UserTC, queries, mutations }
}

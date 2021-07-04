interface IReturn {
  queries: Record<string, any>
  mutations: Record<string, any>
}

const genSchema = (collection: string, TC): IReturn => {
  collection = collection.toLowerCase()
  const queries = {
    [`${collection}ById`]: TC.mongooseResolvers.findById(),
    [`${collection}ByIds`]: TC.mongooseResolvers.findByIds(),
    [`${collection}One`]: TC.mongooseResolvers.findOne(),
    [`${collection}Many`]: TC.mongooseResolvers.findMany(),
    [`${collection}Count`]: TC.mongooseResolvers.count(),
    [`${collection}Pagination`]: TC.mongooseResolvers.pagination(),
  }

  const mutations = {
    [`${collection}CreateMany`]: TC.mongooseResolvers.createMany(),
    [`${collection}UpdateById`]: TC.mongooseResolvers.updateById(),
    [`${collection}RemoveById`]: TC.mongooseResolvers.removeById(),
    [`${collection}CreateOne`]: TC.mongooseResolvers.createOne(),
    [`${collection}RemoveMany`]: TC.mongooseResolvers.removeMany(),
  }
  return { queries, mutations }
}

export default genSchema

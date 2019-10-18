const { sortQueryBuilder, paginate } = require('./paginate-mongo');
async list(ctx) {
    const { params } = ctx;
    const {
      sortby, sort, skip = 0, limit = 20,
    } = params;
    const cursor = this.collection.find({ $or: [{ bonus_incoming: true }, { referral_incoming: true }] })
      .sort(sortQueryBuilder(sort, sortby))
      .skip(parseInt(skip))
      .limit(parseInt(limit));
    const pager = await paginate(cursor, skip, limit);
    const result = await cursor.toArray();
    return {
      result,
      next: pager.next,
    };
}

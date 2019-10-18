const sortQueryBuilder = (sort, by) => {
  if (by && sort) {
    return { [by]: parseInt(sort) };
  }
  return { _id: -1 };
};

const paginate = async (cursor, skip, limit) => {
  const count = await cursor.count();

  skip = parseInt(skip);
  limit = parseInt(limit);
  return {
    next: skip + limit >= count ? undefined : { skip: skip + limit, limit },
  };
};

module.exports = {
  sortQueryBuilder,
  paginate,
};

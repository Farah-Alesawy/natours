class APIFeatures {
  constructor(query, requestQuery) {
    this.query = query;
    this.requestQuery = requestQuery;
  }

  filter() {
    //// 1.1) FILTERING
    const queryObj = { ...this.requestQuery };

    const excludedFields = ['page', 'sort', 'limit', 'fields'];
    excludedFields.forEach((el) => {
      delete queryObj[el];
    });

    //// 1.2) ADVANCED FILTERING
    let queryString = JSON.stringify(queryObj);

    queryString = queryString.replace(
      /(gte|lte|gt|lt)\b/g,
      (matched) => `$${matched}`,
    );
    this.query = this.query.find(JSON.parse(queryString));
    return this;
  }

  sort() {
    if (this.requestQuery.sort) {
      const sortBy = this.requestQuery.sort.split(',').join(' ');
      this.query = this.query.sort(sortBy);
    } else {
      this.query = this.query.sort('-ratingsAverage _id ');
    }
    return this;
  }

  limitFields() {
    if (this.requestQuery.fields) {
      const fields = this.requestQuery.fields.split(',').join(' ');
      this.query = this.query.select(fields);
    } else {
      this.query = this.query.select('-__v');
    }
    return this;
  }

  paginate() {
    const { page: rawPage, limit: rawLimit } = this.requestQuery;

    const page = Number(rawPage) > 0 ? Number(rawPage) : 1;
    const limit = Number(rawLimit) > 0 ? Number(rawLimit) : 100;

    const skipped = limit * page - limit;

    this.query = this.query.skip(skipped).limit(limit);

    return this;
  }
}

export default APIFeatures;

const getAllProductsSchema = {
  querystring: {
    type: 'object',
    properties: {
      search: { type: 'string', minLength: 3, nullable: true },
      category: { type: 'string', minLength: 1, nullable: true },
      limit: { type: 'integer', minimum: 1, default: 10 },
      page: { type: 'integer', minimum: 1, default: 1 }
    },
    required: [],
    additionalProperties: false
  }
};

module.exports = { getAllProductsSchema };

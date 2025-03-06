const getAllLogsSchema = {
  querystring: {
    type: 'object',
    properties: {
      limit: { type: 'integer', minimum: 1, default: 10 },
      page: { type: 'integer', minimum: 1, default: 1 }
    },
    required: [],
    additionalProperties: false
  }
};

module.exports = { getAllLogsSchema };

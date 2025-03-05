const { type } = require('os');

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

const addProductSchema = {
  body: {
    type: 'object',
    required: ['title', 'price', 'category'],
    properties: {
      title: { type: 'string', minLength: 1 },
      price: { type: 'number', minimum: 0 },
      description: { type: 'string', minLength: 5 },
      category: { type: 'string', minLength: 3 },
      image_path: { type: 'string', format: 'uri' },
      stock: { type: 'integer', minimum: 0 }
    }
  }
};

const updateProductSchema = {
  params: {
    type: 'object',
    properties: {
      id: { type: 'integer' }
    }
  },
  ...addProductSchema
};

const updateProductStockSchema = {
  params: {
    type: 'object',
    properties: {
      id: { type: 'integer' }
    }
  },
  body: {
    type: 'object',
    required: ['delta_stock'],
    properties: {
      delta_stock: { type: 'integer' }
    }
  }
};

const deleteProductSchema = {
  params: {
    type: 'object',
    properties: {
      id: { type: 'integer' }
    }
  }
};

module.exports = {
  getAllProductsSchema,
  addProductSchema,
  updateProductSchema,
  updateProductStockSchema,
  deleteProductSchema
};

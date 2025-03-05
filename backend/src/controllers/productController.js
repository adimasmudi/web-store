const ProductService = require('../services/productService');
const { errorResponse, successResponse } = require('../utils/response');
const { successCode, internalServerErrorCode } = require('../utils/constants');

class ProductController {
  constructor(fastify) {
    this.productService = new ProductService(fastify);
  }

  async getAllProducts(req, res) {
    try {
      const products = await this.productService.getAllProducts(req);
      return res
        .code(successCode)
        .send(successResponse(products, 'Products retrieved successfully'));
    } catch (error) {
      return res
        .code(internalServerErrorCode)
        .send(errorResponse(error.message));
    }
  }
}

module.exports = ProductController;

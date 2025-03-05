const ProductService = require('../services/productService');
const { errorResponse, successResponse } = require('../utils/response');
const {
  successCode,
  internalServerErrorCode,
  createdCode
} = require('../utils/constants');

class ProductController {
  constructor(fastify) {
    this.productService = new ProductService(fastify);
  }

  async getAllProducts(req, res) {
    try {
      const products = await this.productService.getAllProducts(req.query);
      return res
        .code(successCode)
        .send(successResponse(products, 'Products retrieved successfully'));
    } catch (error) {
      return res
        .code(internalServerErrorCode)
        .send(errorResponse(error.message));
    }
  }

  async addProduct(req, res) {
    try {
      const product = await this.productService.addProduct(req.body);
      return res
        .code(createdCode)
        .send(successResponse(product, 'Product created successfully'));
    } catch (error) {
      return res
        .code(internalServerErrorCode)
        .send(errorResponse(error.message));
    }
  }

  async updateProduct(req, res) {
    try {
      const { id } = req.params;
      const product = await this.productService.updateProduct(req.body, id);
      return res
        .code(successCode)
        .send(successResponse(product, 'Product updated successfully'));
    } catch (error) {
      return res
        .code(internalServerErrorCode)
        .send(errorResponse(error.message));
    }
  }

  async updateProductStock(req, res) {
    try {
      const { delta_stock: deltaStock } = req.body;
      const { id } = req.params;
      const product = await this.productService.updateProductStock(
        deltaStock,
        id
      );
      return res
        .code(successCode)
        .send(successResponse(product, 'Product stock updated successfully'));
    } catch (error) {
      return res
        .code(internalServerErrorCode)
        .send(errorResponse(error.message));
    }
  }
}

module.exports = ProductController;

const ProductRepository = require('../repositories/productRepository');
const LogRepository = require('../repositories/logRepository');

class ProductService {
  constructor(fastify) {
    this.productRepository = new ProductRepository(fastify);
    this.logRepository = new LogRepository(fastify);
  }

  async getAllProducts(requestQuery) {
    const { search, category, limit, page } = requestQuery;
    const limitInt = parseInt(limit);
    const pageInt = parseInt(page);

    return this.productRepository.getAllProducts({
      search,
      category,
      limitInt,
      pageInt
    });
  }

  async addProduct(requestBody) {
    const product = await this.productRepository.getProductByTitle(
      requestBody.title
    );
    if (product) {
      throw new Error(`product with title ${requestBody.title} already exist`);
    }

    return this.productRepository.addProduct(requestBody);
  }

  async updateProduct(requestBody, id) {
    const product = await this.productRepository.getProductById(id);
    if (!product) {
      throw new Error(`product with id ${id} doesn't exist`);
    }
    return this.productRepository.updateProduct(requestBody, id);
  }

  async updateProductStock(deltaStock, id) {
    const product = await this.productRepository.getProductById(id);
    if (!product) {
      throw new Error(`product with id ${id} doesn't exist`);
    }

    if (product.stock + deltaStock < 0) {
      throw new Error(`product stock should at least 0`);
    }

    const result = this.productRepository.updateProductStock(deltaStock, id);

    const logMessage = `Stock of product with id ${id} updated from ${
      product.stock
    } to ${product.stock + deltaStock}`;
    const insertErr = await this.logRepository.addLog(id, logMessage);

    if (insertErr) {
      throw new Error('error when trying to add new log');
    }

    return result;
  }

  async deleteProduct(id) {
    const product = await this.productRepository.getProductById(id);
    if (!product) {
      throw new Error(`product with id ${id} doesn't exist`);
    }
    return this.productRepository.deleteProduct(id);
  }
}

module.exports = ProductService;

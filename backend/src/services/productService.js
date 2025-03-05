const ProductRepository = require('../repositories/productRepository');

class ProductService {
  constructor(fastify) {
    this.productRepository = new ProductRepository(fastify);
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
}

module.exports = ProductService;

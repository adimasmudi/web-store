const ProductRepository = require('../repositories/productRepository');
const { defaultLimit, defaultPage } = require('../utils/constants');

class ProductService {
  constructor(fastify) {
    this.productRepository = new ProductRepository(fastify);
  }

  async getAllProducts(search, category, limit, page) {
    const limitInt = parseInt(limit);
    const pageInt = parseInt(page);

    if ((limit && isNaN(limit)) || limitInt < 1) {
      throw new Error('invalid limit value');
    }

    if ((page && isNaN(page)) || pageInt < 1) {
      throw new Error('invalid page value');
    }

    if (!limit) limit = defaultLimit;
    if (!page) page = defaultPage;

    return this.productRepository.getAllProducts(
      search,
      category,
      limitInt,
      pageInt
    );
  }
}

module.exports = ProductService;

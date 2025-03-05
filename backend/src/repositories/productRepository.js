const { getPaginationInfo } = require('../utils/pagination');

class ProductRepository {
  constructor(fastify) {
    this.db = fastify.pg;
  }

  async getAllProducts(search, category, limit, page) {
    let query = `
    SELECT
        id, title, price, description, category, image_path, stock, created_at, updated_at
    FROM
        products
    `;
    let idx = 1;
    const args = [];
    if (search) {
      query += ` WHERE title ILIKE $${idx}`;
      args.push(`%${search}%`);
      idx += 1;
    }

    if (category) {
      let prefix = 'WHERE';
      if (args.length > 0) {
        prefix = 'AND';
      }

      query += ` ${prefix} category = $${idx}`;
      args.push(category);
      idx += 1;
    }

    const count = await this._countProducts(query, args);

    if (limit) {
      query += ` LIMIT $${idx}`;
      args.push(limit);
      idx += 1;
    }

    if (page) {
      query += ` OFFSET $${idx}`;
      args.push(limit * (page - 1));
    }

    const { rows } = await this.db.query(query, args);
    return getPaginationInfo(rows, count, limit);
  }

  async _countProducts(query, args) {
    const { rows } = await this.db.query(query, args);
    return rows.length;
  }
}

module.exports = ProductRepository;

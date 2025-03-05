const { getPaginationInfo } = require('../utils/pagination');

class ProductRepository {
  constructor(fastify) {
    this.db = fastify.pg;
  }

  async getAllProducts(queryParam) {
    const { search, category, limitInt, pageInt } = queryParam;
    let query = `
    SELECT
        id, title, price, description, category, image_path, stock, created_at, updated_at
    FROM
        products
    WHERE 1 = 1
    `;
    let idx = 1;
    const args = [];
    if (search) {
      query += ` AND title ILIKE $${idx}`;
      args.push(`%${search}%`);
      idx += 1;
    }

    if (category) {
      query += ` AND category = $${idx}`;
      args.push(category);
      idx += 1;
    }

    const count = await this._countProducts(query, args);

    query += ` ORDER BY updated_at DESC LIMIT $${idx} OFFSET $${idx + 1}`;
    args.push(limitInt, limitInt * (pageInt - 1));

    const { rows } = await this.db.query(query, args);
    return getPaginationInfo(rows, count, limitInt);
  }

  async addProduct(requestBody) {
    const { title, price, description, category, image_path, stock } =
      requestBody;
    const query = `
    INSERT INTO 
        "products" ("title","price","description","category","image_path","stock") 
    VALUES
        ($1,$2,$3,$4,$5,$6)
    `;

    const { rows } = await this.db.query(query, [
      title,
      price,
      description,
      category,
      image_path,
      stock
    ]);

    return rows[0];
  }

  async _countProducts(query, args) {
    const { rows } = await this.db.query(query, args);
    return rows.length;
  }
}

module.exports = ProductRepository;

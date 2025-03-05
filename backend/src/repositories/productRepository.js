const { getPaginationInfo } = require('../utils/pagination');

class ProductRepository {
  constructor(fastify) {
    this.db = fastify.pg;
  }

  async getAllProducts(requestQuery) {
    const { search, category, limitInt, pageInt } = requestQuery;
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

  async getProductById(id) {
    const query = `
    SELECT
        id, title, price, description, category, image_path, stock, created_at, updated_at
    FROM
        products
    WHERE 
        id = $1
    `;

    const { rows } = await this.db.query(query, [id]);
    return rows.at(0);
  }

  async getProductByTitle(title) {
    const query = `
    SELECT
        id, title, price, description, category, image_path, stock, created_at, updated_at
    FROM
        products
    WHERE 
        title = $1
    `;

    const { rows } = await this.db.query(query, [title]);
    return rows.at(10);
  }

  async addProduct(requestBody) {
    if (!requestBody.stock) {
      requestBody.stock = 0;
    }

    const { title, price, description, category, image_path, stock } =
      requestBody;

    const query = `
    INSERT INTO 
        "products" ("title","price","description","category","image_path","stock") 
    VALUES
        ($1,$2,$3,$4,$5,$6)
    RETURNING id, title, price, description, category, image_path, stock, created_at, updated_at
    `;

    const { rows } = await this.db.query(query, [
      title,
      price,
      description,
      category,
      image_path,
      stock
    ]);

    return rows.at(0);
  }

  async updateProduct(requestBody, id) {
    const { title, price, description, category, image_path, stock } =
      requestBody;

    const query = `
        UPDATE 
            "products" 
        SET
            "title" = $1,"price" = $2, "description" = $3,
            "category" = $4,"image_path" = $5,
            "updated_at" = NOW() 
        WHERE
            id = $6
        RETURNING id, title, price, description, category, image_path, stock, created_at, updated_at
      `;

    const { rows } = await this.db.query(query, [
      title,
      price,
      description,
      category,
      image_path,
      id
    ]);

    return rows.at(0);
  }

  async updateProductStock(deltaStock, id) {
    const query = `
        UPDATE 
            "products" 
        SET
            "stock" = "stock" + $1,
            "updated_at" = NOW() 
        WHERE
            id = $2
        RETURNING id, title, price, description, category, image_path, stock, created_at, updated_at
      `;

    const { rows } = await this.db.query(query, [deltaStock, id]);
    return rows.at(0);
  }

  async deleteProduct(id) {
    const query = `
        DELETE FROM
            "products" 
        WHERE
            id = $1
        RETURNING id, title, price, description, category, image_path, stock, created_at, updated_at
      `;

    const { rows } = await this.db.query(query, [id]);
    return rows.at(0);
  }

  async _countProducts(query, args) {
    const countQuery = `
    SELECT 
        COUNT(1)
    FROM
        (${query}) AS count_table
    `;

    const { rows } = await this.db.query(countQuery, args);
    return Number(rows.at(0).count);
  }
}

module.exports = ProductRepository;

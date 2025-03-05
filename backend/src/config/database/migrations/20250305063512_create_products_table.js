/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = async function (knex) {
  await knex.raw(`
    CREATE TABLE IF NOT EXISTS "products" (
        "id" BIGSERIAL PRIMARY KEY,
        "title" VARCHAR(255) NOT NULL UNIQUE,
        "price" DECIMAL(10,2) NOT NULL CHECK (price > 0),
        "description" TEXT,
        "category" VARCHAR(255) NOT NULL,
        "image_path" TEXT,
        "stock" INTEGER NOT NULL DEFAULT 0 CHECK (stock >= 0),
        "created_at" TIMESTAMP NOT NULL DEFAULT (now()),
        "updated_at" TIMESTAMP NOT NULL DEFAULT (now())
    );
    `);
};

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.down = async function (knex) {
  await knex.raw(`DROP TABLE IF EXISTS products;`);
};

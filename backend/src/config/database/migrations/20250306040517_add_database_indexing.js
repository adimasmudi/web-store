/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = async function (knex) {
  await knex.raw(`
        CREATE INDEX idx_product_title ON products(title);
        CREATE INDEX idx_product_category ON products(category);
        CREATE INDEX idx_product_updated_at ON products(updated_at DESC);
        CREATE INDEX idx_log_created_at ON logs(created_at DESC);
    `);
};

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.down = async function (knex) {
  await knex.raw(`
        DROP INDEX IF EXISTS idx_product_title;
        DROP INDEX IF EXISTS idx_product_category;
        DROP INDEX IF EXISTS idx_product_updated_at;
        DROP INDEX IF EXISTS idx_log_created_at;
    `);
};

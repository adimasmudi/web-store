const { title } = require('process');

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.seed = async function (knex) {
  // Fetch data
  const data = [];
  await fetch('https://fakestoreapi.com/products')
    .then((res) => res.json())
    .then((resData) =>
      resData.forEach((dt) =>
        data.push({
          title: dt.title,
          price: dt.price,
          description: dt.description,
          category: dt.category,
          image: dt.image,
          stock: Math.round(Math.random() * 100)
        })
      )
    );

  // Construct query
  let query = `
    INSERT INTO 
      "products" ("title","price","description","category","image_path","stock") 
    VALUES
      
    `;

  const args = [];
  data.forEach((dt, i) => {
    query += `(?,?,?,?,?,?)`;
    args.push(
      ...[dt.title, dt.price, dt.description, dt.category, dt.image, dt.stock]
    );

    if (i < data.length - 1) {
      query += ',';
    }
  });

  query += ';';

  // Deletes ALL existing entries
  await knex.raw(`DELETE FROM products;`);

  // Bulk Insert
  await knex.raw(query, args);
};

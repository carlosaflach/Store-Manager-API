const connection = require('./connection');

const getAll = async () => {
  const query = 'SELECT id, name FROM StoreManager.products ORDER BY id;';
  const [products] = await connection.execute(query);
  return products;
};

const findById = async (id) => {
  const query = 'SELECT * FROM StoreManager.products WHERE id = ?;';
  const [product] = await connection.execute(query, [id]);
  return product[0];
};

const checkIfExists = async (name) => {
  const query = 'SELECT * FROM StoreManager.products WHERE name=?;';
  const [product] = await connection.execute(query, [name]);
  return product;
};

const create = async (name) => {
  const query = 'INSERT INTO StoreManager.products (name) VALUES(?);';
  const [newProduct] = await connection.execute(query, [name]);
  return {
    id: newProduct.insertId,
    name,
  };
};

module.exports = {
  getAll,
  findById,
  create,
  checkIfExists,
};
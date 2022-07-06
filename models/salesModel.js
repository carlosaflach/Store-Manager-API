const connection = require('./connection');

const createSale = async (array) => {
  const queryID = 'INSERT INTO StoreManager.sales (date) VALUE(NOW());';
  const [saleId] = await connection.execute(queryID);

  const querySale = `INSERT INTO StoreManager.sales_products
  (sale_id, product_id, quantity) VALUES(?, ?, ?);`;

  await array.forEach((sale) => {
    connection.execute(querySale, [saleId.insertId, sale.productId, sale.quantity]);
  });

  return {
    id: saleId.insertId,
    itemsSold: array,
  };
};

const getAll = async () => {
    const query = `SELECT s.id AS saleId, s.date AS date, sp.product_id AS productId,
    sp.quantity as quantity
    FROM StoreManager.sales AS s
    INNER JOIN StoreManager.sales_products AS sp
    ON sp.sale_id = s.id;`;
    
  const [sales] = await connection.execute(query);
  return sales;
};

const findById = async (id) => {
  const query = `
  SELECT s.date AS date, sp.product_id AS productId,
  sp.quantity as quantity
  FROM StoreManager.sales AS s
  INNER JOIN StoreManager.sales_products AS sp
  ON sp.sale_id = s.id
  WHERE s.id = ?;`;

  const [sale] = await connection.execute(query, [id]);
  return sale;
};

const deleteSale = async (id) => {
  const query = `DELETE FROM StoreManager.sales_products
    WHERE sale_id = ?;`;
  await connection.execute(query, [id]);
  return true;
};

module.exports = {
  createSale,
  getAll,
  findById,
  deleteSale,
};
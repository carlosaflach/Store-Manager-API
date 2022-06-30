const connection = require('./connection');

const createSale = async (array) => {
  const queryID = 'INSERT INTO StoreManager.sales (date) VALUE(NOW());';
  const [id] = await connection.execute(queryID);

  const querySale = `INSERT INTO StoreManager.sales_products
  (sale_id, product_id, quantity) VALUES(?, ?, ?);`;

  await array.forEach((sale) => {
    connection.execute(querySale, [id.insertId, sale.productId, sale.quantity]);
  });

  return {
    id: Number(id),
    itemsSold: array,
  };
};

module.exports = {
  createSale,
};
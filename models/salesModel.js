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

module.exports = {
  createSale,
};
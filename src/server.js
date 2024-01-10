const express = require('express');
const bodyParser = require('body-parser');

const server = express();
const port = 3000;

// Middleware untuk membaca data dari formulir HTML
server.use(bodyParser.urlencoded({ extended: false }));

// Contoh data produk
const products = [
  { id: 1, name: 'Product 1', price: 20.00 },
  { id: 2, name: 'Product 2', price: 30.00 },
  { id: 3, name: 'Product 3', price: 25.00 }
];

// Tampilkan halaman pembelian produk
server.get('/', (req, res) => {
  res.send(`
    <h1>Produk yang Tersedia</h1>
    <ul>
      ${products.map(product => `<li>${product.name} - ${product.price}</li>`).join('')}
    </ul>
    <form action="/purchase" method="post">
      <label for="productId">Pilih produk:</label>
      <select name="productId">
        ${products.map(product => `<option value="${product.id}">${product.name}</option>`).join('')}
      </select>
      <br>
      <label for="quantity">Jumlah:</label>
      <input type="number" name="quantity" value="1" min="1">
      <br>
      <button type="submit">Beli</button>
    </form>
  `);
});

// Proses pembelian
server.post('/purchase', (req, res) => {
  const productId = parseInt(req.body.productId);
  const quantity = parseInt(req.body.quantity);
  const product = products.find(p => p.id === productId);

  if (product && quantity > 0) {
    const total = product.price * quantity;
    res.send(`Pembelian berhasil! Total yang harus dibayar: $${total.toFixed(2)}`);
  } else {
    res.send('Pembelian gagal. Silakan pilih produk dan jumlah yang valid.');
  }
});

// Jalankan server pada port tertentu
server.listen(port, () => {
  console.log(`Server berjalan di http://localhost:${port}`);
});

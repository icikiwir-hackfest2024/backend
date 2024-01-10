import { selectProduct, addToCart, showCartContents } from 'script/FirebaseFunctions';

// Contoh penggunaan
const productId = 'YOUR_PRODUCT_ID'; // Ganti dengan ID produk yang ingin Anda gunakan

// Pilih produk
selectProduct(productId);

// Tambah produk ke dalam keranjang
addToCart(productId, 1); // Ganti 1 dengan jumlah yang diinginkan

// Tampilkan isi keranjang
showCartContents();

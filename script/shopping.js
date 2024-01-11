// Import firebaseConfig sebagai named export
import { firebaseConfig } from "./firebaseConfig.js";
import { initializeApp } from "https://www.gstatic.com/firebasejs/10.7.1/firebase-app.js";
import { getFirestore, doc, setDoc, deleteDoc, collection, getDocs, getDoc } from "https://www.gstatic.com/firebasejs/10.7.1/firebase-firestore.js";

const app = initializeApp(firebaseConfig);
const firestore = getFirestore(app);

// Fungsi untuk menampilkan isi keranjang belanja
const showShoppingCart = async () => {
  const shoppingCartList = document.getElementById("shoppingCart");
  const totalPriceElement = document.getElementById("totalPrice");
  shoppingCartList.innerHTML = "";

  try {
    const cartContents = await showCartContents();
    let totalPrice = 0;

    for (const cartItem of cartContents) {
      const cartItemLi = document.createElement("li");
      const productPrice = await calculateProductPrice(cartItem);
      totalPrice += productPrice;

      cartItemLi.innerHTML = `
        Product ID: ${cartItem.id}, Quantity: 
        <button onclick="updateCartItemQuantity('${cartItem.id}', ${cartItem.quantity - 1})">-</button>
        ${cartItem.quantity}
        <button onclick="updateCartItemQuantity('${cartItem.id}', ${cartItem.quantity + 1})">+</button>
        <button onclick="removeFromCart('${cartItem.id}')">Remove from Cart</button>
        Price: ${formatRupiah(productPrice)}
      `;
      shoppingCartList.appendChild(cartItemLi);
    }

    totalPriceElement.textContent = `Total Price: ${formatRupiah(totalPrice)}`;
  } catch (error) {
    console.error("Error showing shopping cart contents:", error);
  }
};

// Fungsi untuk mengonversi angka menjadi format mata uang Rupiah
const formatRupiah = (number) => {
  return new Intl.NumberFormat("id-ID", { style: "currency", currency: "IDR" }).format(number);
};

// Fungsi untuk menghitung harga total produk
const calculateProductPrice = async (cartItem) => {
  try {
    const products = await selectProduct(cartItem.id);

    if (products && products.length > 0) {
      const product = products[0];
      if (typeof product.price === "number") {
        return product.price * cartItem.quantity;
      } else {
        console.error("Invalid product price:", product);
        return 0;
      }
    } else {
      console.error("Product not found:", cartItem.id);
      return 0;
    }
  } catch (error) {
    console.error("Error calculating product price:", error);
    return 0;
  }
};

// Fungsi untuk menambahkan produk ke keranjang
window.addToShoppingCart = async (productId, quantity) => {
  try {
    // Validasi: Pastikan quantity lebih besar dari 0
    if (quantity < 1) {
      alert("Please enter a quantity greater than 0.");
      return;
    }

    const product = await selectProduct(productId);
    if (product && product.length > 0) {
      const price = product[0].price;  // Mengambil harga dari produk yang sesuai
      await addToCart(productId, quantity, price);
      alert(`Added ${quantity} product(s) to shopping cart!`);
      showShoppingCart();
    } else {
      alert("Product not found!");
    }
  } catch (error) {
    console.error("Error adding to shopping cart:", error);
  }
};


// Fungsi untuk mengurangi atau menambah quantity barang di keranjang
window.updateCartItemQuantity = async (productId, newQuantity) => {
  try {
    // Validasi: Pastikan newQuantity lebih besar dari 0
    if (newQuantity < 1) {
      alert("Please enter a quantity greater than 0.");
      return;
    }

    const cartRef = doc(firestore, "cart", productId);
    const cartDoc = await getDoc(cartRef);

    if (cartDoc.exists()) {
      const { price } = cartDoc.data();

      // Pastikan price selalu tersedia
      if (price === undefined) {
        console.error("Invalid price for cart item:", cartDoc.data());
        return;
      }

      // Update quantity dengan nilai baru
      await setDoc(cartRef, { productId, quantity: parseInt(newQuantity), price });
      showShoppingCart(); // Tampilkan keranjang belanja setelah diupdate
    }
  } catch (error) {
    console.error("Error updating cart item quantity:", error);
  }
};

const addToCart = async (productId, quantity, price) => {
  try {
    const cartRef = doc(firestore, "cart", productId);
    const cartDoc = await getDoc(cartRef);

    if (cartDoc.exists()) {
      const currentQuantity = cartDoc.data().quantity || 0;
      await setDoc(cartRef, { productId, quantity: currentQuantity + parseInt(quantity), price });
    } else {
      await setDoc(cartRef, { productId, quantity: parseInt(quantity), price });
    }

    console.log("Product added to cart successfully!");
  } catch (error) {
    console.error("Error adding product to cart:", error);
  }
};

const selectProduct = async (productId) => {
  try {
    const productsCollection = collection(firestore, "products");

    if (productId) {
      // Jika ID produk diberikan, ambil data produk spesifik
      const productDoc = doc(productsCollection, productId);
      const productSnapshot = await getDoc(productDoc);

      if (productSnapshot.exists()) {
        return [{
          id: productSnapshot.id,
          ...productSnapshot.data(),
        }];
      } else {
        console.error("Product not found:", productId);
        return null; // Mengembalikan null jika produk tidak ditemukan
      }
    } else {
      // Jika tidak ada ID produk, ambil seluruh daftar produk
      const productsSnapshot = await getDocs(productsCollection);
      const products = [];

      productsSnapshot.forEach((doc) => {
        products.push({
          id: doc.id,
          ...doc.data(),
        });
      });

      return products;
    }
  } catch (error) {
    console.error("Error selecting product:", error);
    return null; // Mengembalikan null jika terjadi kesalahan
  }
};

const showCartContents = async () => {
  try {
    const cartSnapshot = await getDocs(collection(firestore, "cart"));
    const cartContents = [];

    cartSnapshot.forEach((doc) => {
      cartContents.push({
        id: doc.id,
        ...doc.data(),
      });
    });

    return cartContents;
  } catch (error) {
    console.error("Error showing cart contents:", error);
    return [];
  }
};

// Fungsi untuk menampilkan daftar produk
const displayProducts = async () => {
  // Pemanggilan fungsi showShoppingCart() setelah inisialisasi Firebase
  showShoppingCart();

  const productListDiv = document.getElementById("productList");
  productListDiv.innerHTML = "";

  try {
    const products = await selectProduct();

    products.forEach((product) => {
      const productDiv = document.createElement("div");
      productDiv.innerHTML = `
        <p><strong>${product.name}</strong></p>
        <p>Harga: ${formatRupiah(product.price)}</p>
        <p>Stock: ${product.stock}</p>
        <p>Deskripsi: ${product.description}</p>
        <button onclick="addToShoppingCart('${product.id}', 1, ${product.price})">Add to Cart</button>
        <input type="number" id="quantityInput_${product.id}" placeholder="Quantity" />
        <button onclick="addToShoppingCart('${product.id}', document.getElementById('quantityInput_${product.id}').value, ${product.price})">Add to Cart</button>
        <hr>
      `;
      productListDiv.appendChild(productDiv);
    });
  } catch (error) {
    console.error("Error displaying products:", error);
  }
};

// Fungsi untuk menghapus produk dari keranjang
window.removeFromCart = async (productId) => {
  try {
    const cartRef = doc(firestore, "cart", productId);
    const cartDoc = await getDoc(cartRef);

    if (cartDoc.exists()) {
      // Tampilkan konfirmasi umum kepada pengguna
      const confirmRemove = confirm("Are you sure you want to remove this product from the cart?");

      if (!confirmRemove) {
        return; // Batal menghapus jika pengguna memilih "Cancel"
      }

      await deleteDoc(cartRef);
      console.log("Product removed from cart successfully!");
      showShoppingCart();
    }
  } catch (error) {
    console.error("Error removing product from cart:", error);
  }
};

// Fungsi untuk menampilkan keranjang belanja saat halaman dimuat
window.onload = () => {
  displayProducts();
};

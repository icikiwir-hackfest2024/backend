// Import firebaseConfig sebagai named export
import { firebaseConfig } from "./firebaseConfig.js";
import { initializeApp } from "https://www.gstatic.com/firebasejs/10.7.1/firebase-app.js";
import { getFirestore, doc, setDoc, deleteDoc, collection, getDocs } from "https://www.gstatic.com/firebasejs/10.7.1/firebase-firestore.js";

const app = initializeApp(firebaseConfig);
const firestore = getFirestore(app);

const selectProduct = async () => {
  try {
    const productsCollection = collection(firestore, "products");
    const productsSnapshot = await getDocs(productsCollection);
    const products = [];

    productsSnapshot.forEach((doc) => {
      products.push({
        id: doc.id,
        ...doc.data(),
      });
    });

    return products;
  } catch (error) {
    console.error("Error selecting products:", error);
    return [];
  }
};

// Fungsi untuk menampilkan isi keranjang belanja
const showShoppingCart = async () => {
  const shoppingCartList = document.getElementById("shoppingCart");
  shoppingCartList.innerHTML = "";

  try {
    const cartContents = await showCartContents();

    cartContents.forEach((cartItem) => {
      const cartItemLi = document.createElement("li");
      cartItemLi.innerHTML = `Product ID: ${cartItem.id}, Quantity: ${cartItem.quantity} 
                              <button onclick="removeFromCart('${cartItem.id}')">Remove from Cart</button>`;
      shoppingCartList.appendChild(cartItemLi);
    });
  } catch (error) {
    console.error("Error showing shopping cart contents:", error);
  }
};

// Fungsi untuk menambahkan produk ke keranjang
window.addToShoppingCart = async (productId) => {
  try {
    const product = await selectProduct(productId);
    if (product) {
      await addToCart(productId, 1);
      alert("Product added to shopping cart!");
      showShoppingCart();
    } else {
      alert("Product not found!");
    }
  } catch (error) {
    console.error("Error adding to shopping cart:", error);
  }
};

const addToCart = async (productId, quantity) => {
  try {
    const cartRef = doc(firestore, "cart", productId);
    await setDoc(cartRef, { productId, quantity });
    console.log("Product added to cart successfully!");
  } catch (error) {
    console.error("Error adding product to cart:", error);
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

const displayProducts = async () => {
  const productListDiv = document.getElementById("productList");
  productListDiv.innerHTML = "";

  try {
    const products = await selectProduct();

    products.forEach((product) => {
      const productDiv = document.createElement("div");
      productDiv.innerHTML = `
        <p><strong>${product.name}</strong></p>
        <p>Harga: $${product.price.toFixed(2)}</p>
        <p>Stock: ${product.stock}</p>
        <button onclick="addToShoppingCart('${product.id}')">Add to Cart</button>
        <hr>
      `;
      productListDiv.appendChild(productDiv);
    });
  } catch (error) {
    console.error("Error displaying products:", error);
  }
};

// Fungsi untuk menambahkan produk ke keranjang
window.addToShoppingCart = async (productId) => {
  try {
    const product = await selectProduct(productId);
    if (product) {
      await addToCart(productId, 1);
      alert("Product added to shopping cart!");
      showShoppingCart();
    } else {
      alert("Product not found!");
    }
  } catch (error) {
    console.error("Error adding to shopping cart:", error);
  }
};

// Fungsi untuk menghapus produk dari keranjang
window.removeFromCart = async (productId) => {
  try {
    const cartRef = doc(firestore, "cart", productId);
    await deleteDoc(cartRef);
    console.log("Product removed from cart successfully!");
    showShoppingCart();
  } catch (error) {
    console.error("Error removing product from cart:", error);
  }
};

displayProducts();

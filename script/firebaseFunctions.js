// Import firebaseConfig sebagai named export
import { firebaseConfig } from "./firebaseConfig.js";
import { initializeApp } from "https://www.gstatic.com/firebasejs/10.7.1/firebase-app.js";
import { getFirestore, doc, setDoc, addDoc, collection } from "https://www.gstatic.com/firebasejs/10.7.1/firebase-firestore.js";

const app = initializeApp(firebaseConfig);
const firestore = getFirestore(app);

export const selectProduct = async (productId) => {
  try {
    const productRef = doc(firestore, "products", productId);
    const productSnapshot = await getDoc(productRef);
    if (productSnapshot.exists()) {
      const selectedProduct = productSnapshot.data();
      console.log("Selected Product:", selectedProduct);
      return selectedProduct;
    } else {
      console.log("Product not found!");
      return null;
    }
  } catch (error) {
    console.error("Error selecting product:", error);
    return null;
  }
};

export const addToCart = async (productId, quantity) => {
  try {
    const cartRef = doc(firestore, "cart", productId);
    await setDoc(cartRef, { productId, quantity });
    console.log("Product added to cart successfully!");
  } catch (error) {
    console.error("Error adding product to cart:", error);
  }
};

export const showCartContents = async () => {
  try {
    const cartSnapshot = await getDocs(collection(firestore, "cart"));
    cartSnapshot.forEach((doc) => {
      console.log("Product ID:", doc.id, "Quantity:", doc.data().quantity);
    });
  } catch (error) {
    console.error("Error showing cart contents:", error);
  }
};

export const addNewProduct = async (productName, productPrice) => {
  try {
    const newProductRef = await addDoc(collection(firestore, "products"), {
      name: productName,
      price: productPrice,
    });
    console.log("New product added with ID:", newProductRef.id);
  } catch (error) {
    console.error("Error adding product:", error);
  }
};

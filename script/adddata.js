// Import firebaseConfig sebagai named export
import { firebaseConfig } from "./firebaseConfig.js";
import { initializeApp } from "https://www.gstatic.com/firebasejs/10.7.1/firebase-app.js";
import { getFirestore, doc, setDoc, addDoc, collection, getDocs } from "https://www.gstatic.com/firebasejs/10.7.1/firebase-firestore.js";


const app = initializeApp(firebaseConfig);
const firestore = getFirestore(app);

// Add data function
export const addNewProduct = async (productName, productPrice, productStock, productDescription) => {
  try {
    const newProductRef = doc(collection(firestore, "products"), productName);
    await setDoc(newProductRef, {
      name: productName,
      price: productPrice,
      stock: productStock,
      description: productDescription,
    });
    console.log("New product added with ID:", productName);
  } catch (error) {
    console.error("Error adding product:", error);
  }
};

const addProductForm = document.getElementById('addProductForm');
addProductForm.addEventListener('submit', async (e) => {
  e.preventDefault();
  const productName = document.getElementById('productName').value;
  const productPrice = parseFloat(document.getElementById('productPrice').value);
  const productStock = parseInt(document.getElementById('productStock').value);
  const productDescription = document.getElementById('productDescription').value;

  if (productName && !isNaN(productPrice) && !isNaN(productStock) && productDescription) {
    await addNewProduct(productName, productPrice, productStock, productDescription);
    alert('Product added successfully!');
    addProductForm.reset();
  } else {
    alert('Please fill in all fields with valid values!');
  }
});

// ------------------------------



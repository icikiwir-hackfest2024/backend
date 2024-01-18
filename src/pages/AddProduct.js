import React, { useState } from "react";
import { Card, Input, Button, Typography } from "@material-tailwind/react";
import { fireDB, storage } from "../config/Config";
import { collection, addDoc } from "firebase/firestore";
import { ref, uploadBytes, getDownloadURL } from "firebase/storage";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

function AddProduct() {
  const [productName, setProductName] = useState("");
  const [productPrice, setProductPrice] = useState("");
  const [productQuantity, setProductQuantity] = useState("");
  const [productDescription, setProductDescription] = useState("");
  const [productImage, setProductImage] = useState(null);

  const Productcollection = collection(fireDB, "Test");

  const handleImageChange = (e) => {
    const file = e.target.files[0];

    // Validasi bahwa file yang dipilih adalah gambar
    if (file && file.type.startsWith("image/")) {
      setProductImage(file);
    } else {
      toast.error("Please select a valid image file.");
    }
  };

  const createProduct = async () => {
    if (!productName || productPrice <= 0 || productQuantity <= 0 || !productDescription) {
      toast.error("Please fill in all fields.");
      return;
    }

    try {
      let imageURL = ""; // Initialize imageURL variable

      // Upload image file if selected
      if (productImage) {
        const storageRef = ref(storage, `productsimages/${productImage.name}`);
        await uploadBytes(storageRef, productImage);
        const downloadURL = await getDownloadURL(storageRef);
        imageURL = downloadURL;
      }
      
      await addDoc(Productcollection, {
        Product: productName,
        Price: Number(productPrice),
        Quantity: Number(productQuantity),
        Description: productDescription,
        ImageURL: imageURL, // Include the imageURL in the document
      });

      // Clear input fields after successfully adding data
      setProductName("");
      setProductPrice("");
      setProductQuantity("");
      setProductDescription("");
      setProductImage(null);

      toast.success("Data added successfully!");
    } catch (error) {
      console.error("Error adding data to Database: ", error);
      toast.error("Error adding data. Please try again.");
    }
  };

  return (
    <div className="flex items-center justify-center h-screen">
      <Card color="transparent" shadow={false}>
        <Typography variant="h4" color="blue-gray">
          Add Data
        </Typography>
        <Typography color="gray" className="mt-1 font-normal">
          Input Data to Database.
        </Typography>
        <form className="mt-8 mb-2 w-80 max-w-screen-lg sm:w-96">
          <div className="mb-1 flex flex-col gap-6">
            <Typography variant="h6" color="blue-gray" className="-mb-3">
              Nama Barang
            </Typography>
            <Input
              size="lg"
              placeholder="Sayuran"
              className=" !border-t-blue-gray-200 focus:!border-t-gray-900"
              value={productName}
              onChange={(e) => setProductName(e.target.value)}
              labelProps={{
                className: "before:content-none after:content-none",
              }}
            />
            <Typography variant="h6" color="blue-gray" className="-mb-3">
              Harga Barang
            </Typography>
            <Input
              size="lg"
              placeholder="Rp.1"
              type="number"
              min="0" // Tambahkan atribut min di sini
              className=" !border-t-blue-gray-200 focus:!border-t-gray-900"
              value={productPrice}
              onChange={(e) => setProductPrice(e.target.value)}
              labelProps={{
                className: "before:content-none after:content-none",
              }}
            />
            <Typography variant="h6" color="blue-gray" className="-mb-3">
              Jumlah Barang
            </Typography>
            <Input
              size="lg"
              placeholder="1"
              type="number"
              min="0" // Tambahkan atribut min di sini
              className=" !border-t-blue-gray-200 focus:!border-t-gray-900"
              value={productQuantity}
              onChange={(e) => setProductQuantity(e.target.value)}
              labelProps={{
                className: "before:content-none after:content-none",
              }}
            />
            <Typography variant="h6" color="blue-gray" className="-mb-3">
              Deskripsi
            </Typography>
            <Input
              size="lg"
              placeholder="Lorem Ipsum"
              className=" !border-t-blue-gray-200 focus:!border-t-gray-900 mb-6"
              value={productDescription}
              onChange={(e) => setProductDescription(e.target.value)}
              labelProps={{
                className: "before:content-none after:content-none",
              }}
            />
            <Typography variant="h6" color="blue-gray" className="-mb-4">
              Gambar
            </Typography>
            <Input size="lg" type="file" onChange={handleImageChange} className="!border-t-blue-gray-200 focus:!border-t-gray-900 mb-4" />
          </div>
          <Button type="button" className="mt-6" fullWidth onClick={createProduct}>
            Add Data
          </Button>
        </form>
      </Card>
      <ToastContainer />
    </div>
  );
}

export default AddProduct;

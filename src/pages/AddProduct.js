import React, { useState } from "react";
import { Card, Input, Button, Typography } from "@material-tailwind/react";
import { fireDB } from "../config/Config";
import { collection, addDoc } from "firebase/firestore";

function AddProduct() {
  const [productName, setProductName] = useState("");
  const [productPrice, setProductPrice] = useState(0);
  const [productQuantity, setProductQuantity] = useState(0);
  const [productDescription, setProductDescription] = useState("");

  const Productcollection = collection(fireDB, "Test");

  const createProduct = async () => {
    try {
      await addDoc(Productcollection, {
        Product: productName,
        Price: Number(productPrice),
        Quantity: Number(productQuantity),
        Description: productDescription,
      });

      // Clear input fields after successfully adding data
      setProductName("");
      setProductPrice(0);
      setProductQuantity(0);
      setProductDescription("");

      console.log("Data added successfully!");
    } catch (error) {
      console.error("Error adding data to Database: ", error);
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
          </div>
          <Button type="button" className="mt-6" fullWidth onClick={createProduct}>
            Add Data
          </Button>
        </form>
      </Card>
    </div>
  );
}

export default AddProduct;

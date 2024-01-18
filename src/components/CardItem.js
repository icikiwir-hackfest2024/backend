import React, { useEffect, useState } from "react";
import { faStar } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Card, CardHeader, CardBody, CardFooter, Typography } from "@material-tailwind/react";
import { collection, getDocs } from "firebase/firestore";
import { fireDB } from "../config/Config";

export default function CardItem() {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      const productCollection = collection(fireDB, "Test");
      const querySnapshot = await getDocs(productCollection);
      const productsData = [];
      querySnapshot.forEach((doc) => {
        productsData.push({ id: doc.id, ...doc.data() });
      });
      setProducts(productsData);
    };

    fetchData();
  }, []);

  return (
    <>
      {products.map((product) => (
        <Card key={product.id} className="w-48 float-left">
          <CardHeader className="relative m-0 h-40 rounded-b-none">
            <img
              src={product.ImageURL} // Gunakan URL gambar dari Firebase Storage
              alt="card-image"
              className="object-cover h-full w-full"
            />
          </CardHeader>
          <CardBody className="p-2">
            <Typography variant="paragraph" className="mb-4 leading-4">
              {product.Product}
            </Typography>
            <Typography variant="lead" className="leading-4">
              Rp {product.Price}
            </Typography>
            <Typography variant="small">
              <span className="text-gray-400 line-through">Rp 20.000</span> <span className="text-green-500 font-semibold">-50%</span>
            </Typography>
          </CardBody>
          <CardFooter className="p-2 pt-0">
            <Typography>
              <FontAwesomeIcon icon={faStar} className="text-yellow-400" /> 5.0 | 0 terjual
            </Typography>
          </CardFooter>
        </Card>
      ))}
    </>
  );
}

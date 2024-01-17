import React from "react";
import SearchBar from "../components/SearchBar";
import CarouselBanner from "../components/CarouselBanner";
import Categories from "../components/Categories";
import Recommendations from "../components/Recommendations";
import Products from "../components/Products";

export default function Home() {
  return (
    <div className="grid gap-4 m-4">
      <SearchBar />
      <CarouselBanner />
      <hr />
      <Categories />
      <Recommendations />
      <Products />
    </div>
  );
}
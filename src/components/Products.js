import { Typography } from "@material-tailwind/react";
import CardItem from "./CardItem";

export default function Products() {
  return (
    <div>
      <Typography
        variant="lead"
        className="font-bold mb-4"
      >
        PRODUK LOKAL
      </Typography>
      <div className="flex w-screen p-4 -m-4 overflow-scroll">
        <div className="flex gap-4">
          <CardItem />
        </div>
      </div>
    </div>
  );
}
import { Typography } from "@material-tailwind/react";
import CardItem from "./CardItem";

export default function Recommendations() {
  return (
    <div className="bg-green-400 p-4 -m-4 my-4">
      <Typography
        variant="lead"
        className="font-bold mb-4"
      >
        REKOMENDASI
      </Typography>
      <div className="flex w-screen p-4 -m-4 overflow-scroll">
        <div className="flex gap-4">
          <CardItem />
          <CardItem />
          <CardItem />
        </div>
      </div>
    </div>
  );
}
import {
  Typography,
} from "@material-tailwind/react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCow, faKitchenSet, faPlateWheat, faSeedling, faWheatAwn } from "@fortawesome/free-solid-svg-icons";

export default function Categories() {
  return (
    <div>
      <Typography
        variant="lead"
        className="text-center font-bold mb-2"
      >
        KATEGORI PRODUK LOKAL
      </Typography>
      <div className="flex flex-wrap gap-3 justify-around mt-5 mb-1">
        <a href="#" className="bg-gray-200 flex flex-col justify-between text-center w-36 h-32 px-2 py-4 rounded-lg shadow-md">
          <FontAwesomeIcon icon={faWheatAwn} className="h-16 w-full" />
          <Typography variant="paragraph" className="font-semibold">Hasil Tani</Typography>
        </a>
        <a href="#" className="bg-gray-200 flex flex-col justify-between text-center w-36 h-32 px-2 py-4 rounded-lg shadow-md">
          <FontAwesomeIcon icon={faSeedling} className="h-16 w-full" />
          <Typography variant="paragraph" className="font-semibold">Hasil Kebun</Typography>
        </a>
        <a href="#" className="bg-gray-200 flex flex-col justify-between text-center w-36 h-32 px-2 py-4 rounded-lg shadow-md">
          <FontAwesomeIcon icon={faCow} className="h-16 w-full" />
          <Typography variant="paragraph" className="font-semibold">Hasil Ternak</Typography>
        </a>
        <a href="#" className="bg-gray-200 flex flex-col justify-between text-center w-36 h-32 px-2 py-4 rounded-lg shadow-md">
          <FontAwesomeIcon icon={faPlateWheat} className="h-16 w-full" />
          <Typography variant="paragraph" className="font-semibold">Olahan</Typography>
        </a>
      </div>
    </div>
  );
}
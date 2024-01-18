import {
  Navbar,
  Typography,
  IconButton,
} from "@material-tailwind/react";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCartShopping, faHouse, faLayerGroup, faReceipt } from '@fortawesome/free-solid-svg-icons';
 
export default function TopNavbar() {
  return (
    <Navbar className="sticky bottom-0 z-10 h-max max-w-full rounded-none px-4 py-2 lg:hidden">
      <div className="container mx-auto flex flex-wrap items-center text-center justify-around text-blue-gray-900">
        <a href="#">
          <IconButton
            variant="text"
            className="text-inherit hover:bg-transparent focus:bg-transparent active:bg-transparent"
          >
            <FontAwesomeIcon icon={faHouse} className="h-6 w-6" />
          </IconButton>
          <Typography variant="small">Beranda</Typography>
        </a>
        <a href="#">
          <IconButton
            variant="text"
            className="text-inherit hover:bg-transparent focus:bg-transparent active:bg-transparent"
          >
            <FontAwesomeIcon icon={faLayerGroup} className="h-6 w-6" />
          </IconButton>
          <Typography variant="small">Kategori</Typography>
        </a>
        <a href="#">
          <IconButton
            variant="text"
            className="text-inherit hover:bg-transparent focus:bg-transparent active:bg-transparent"
          >
            <FontAwesomeIcon icon={faCartShopping} className="h-6 w-6" />
          </IconButton>
          <Typography variant="small">Keranjang</Typography>
        </a>
        <a href="#">
          <IconButton
            variant="text"
            className="text-inherit hover:bg-transparent focus:bg-transparent active:bg-transparent"
          >
            <FontAwesomeIcon icon={faReceipt} className="h-6 w-6" />
          </IconButton>
          <Typography variant="small">Pesanan</Typography>
        </a>
      </div>
    </Navbar>
  );
}
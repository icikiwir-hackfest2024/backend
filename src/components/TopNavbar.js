import {
  Navbar,
  Typography,
} from "@material-tailwind/react";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCartShopping, faUser } from "@fortawesome/free-solid-svg-icons";
 
export default function TopNavbar() {
  const navList = (
    <ul className="mt-2 mb-4 flex flex-row gap-2 lg:mb-0 lg:mt-0 lg:items-center lg:gap-6">
      <Typography
        as="li"
        variant="text"
        className="flex items-center gap-x-2 p-1 font-medium"
      >
        <a href="#" className="flex items-center">
          <FontAwesomeIcon icon={faCartShopping} className="text-xl fa-fw" />
        </a>
      </Typography>
      <Typography
        as="li"
        variant="text"
        className="flex items-center gap-x-2 p-1 font-medium"
      >
        <FontAwesomeIcon icon={faUser} className="text-xl fa-fw" /> 
        <a href="#" className="hidden flex items-center lg:block">
          Akun
        </a>
      </Typography>
    </ul>
  );
 
  return (
    <Navbar className="sticky top-0 z-10 h-max max-w-full rounded-none px-4 py-2 lg:px-8 lg:py-4">
      <div className="container mx-auto flex flex-wrap items-center justify-between text-blue-gray-900">
        <Typography
          as="a"
          href="#"
          className="text-light-green-600 mr-4 cursor-pointer py-1.5 font-bold text-lg tracking-wider"
        >
          GreenBasket
        </Typography>
        <div className="text-gray-600">{navList}</div>
      </div>
    </Navbar>
  );
}
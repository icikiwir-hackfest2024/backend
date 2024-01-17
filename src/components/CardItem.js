import { faStar } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  Card,
  CardHeader,
  CardBody,
  CardFooter,
  Typography,
} from "@material-tailwind/react";
 
export default function CardItem() {
  return (
    <Card className="w-48 float-left">
      <CardHeader className="relative m-0 h-40 rounded-b-none">
        <img
          src="https://images.unsplash.com/photo-1540553016722-983e48a2cd10?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=800&q=80"
          alt="card-image"
          className="object-cover h-full w-full"
        />
      </CardHeader>
      <CardBody className="p-2">
        <Typography
          variant="paragraph"
          className="mb-4 leading-4"
        >
          Selada Keriting Organik
        </Typography>
        <Typography
          variant="lead"
          className="leading-4"
        >
          Rp 10.000
        </Typography>
        <Typography
          variant="small"
        >
          <span className="text-gray-400 line-through">Rp 20.000</span> <span className="text-green-500 font-semibold">-50%</span>
        </Typography>
      </CardBody>
      <CardFooter className="p-2 pt-0">
        <Typography>
          <FontAwesomeIcon icon={faStar} className="text-yellow-400" /> 5.0 | 5rb terjual
        </Typography>
      </CardFooter>
    </Card>
  );
}
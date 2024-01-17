import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import TopNavbar from './components/TopNavbar';
import BottomNavbar from './components/BottomNavbar';
import Home from './pages/Home';
import ErrorPage from './pages/ErrorPage';

const router = createBrowserRouter([
  {
    path: '/',
    element: <Home />,
    errorElement: <ErrorPage />
  },
  {
    path: '/:path(.*)',
    element: <ErrorPage />
  }
]);


export default function App() {
  return (
    <>
      <TopNavbar />
      <RouterProvider router={router} />
      {/* <BottomNavbar /> */}
    </>
  );
}
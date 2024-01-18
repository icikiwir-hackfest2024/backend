import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import TopNavbar from './components/TopNavbar';
import BottomNavbar from './components/BottomNavbar';
import Home from './pages/Home';
import ErrorPage from './pages/ErrorPage';
import AddProduct from './pages/AddProduct';

function App() {
  return (
    <div className='App'>
      <TopNavbar />
      <Router>
        <Routes>
          <Route path='/' element={<Home />} />
          <Route path='/add' element={<AddProduct />} />
          <Route path='*' element={<ErrorPage />} />
        </Routes>
      </Router>
      <BottomNavbar />
    </div>
  );
}

export default App;

import './App.css';
import { BrowserRouter, NavLink, Route, Routes } from 'react-router-dom';
import { Product } from './components/Product';
import User from './components/User';

function App() {
  var pname = "Laptop";
  var price = 50000;
  var uname = "BhavyaS";
  var pwd = "12345678";
  // const addUser = () => {alert("addUser Function invoked!")}
  // const addProduct = () => {alert("addProduct Function invoked!")}
  return (
    <>
    <BrowserRouter>
      <div className="header">
        <NavLink to="/" className="nav-link">Home</NavLink>
        <NavLink to="/product" className="nav-link">Product</NavLink>
        <NavLink to="/user" className="nav-link">User</NavLink>
      </div>
          <Routes>
            <Route path="/" element={<h2 className='container'>Welcome to HomePage</h2>}/>
            <Route path="/product" element={<Product name={pname} price={price}/>}/>
            <Route path="/user" element={<User name={uname} pass={pwd}/>}/>
          </Routes>
      </BrowserRouter>
      </>
  );
}

export default App;

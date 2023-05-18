import './App.css';
import { BrowserRouter, NavLink, Route, Routes } from 'react-router-dom';
import { Product } from './components/Product';
import User from './components/User';

function App() {
  const pname = "Laptop";
  const uname = "Bhavya";
  const addUser = () => {alert("addUser Function invoked!")}
  const addProduct = () => {alert("addProduct Function invoked!")}
  return (
    <>
      <h2 className='header'>Demo of Component communication using react-router-dom and props</h2>
      <BrowserRouter>
        <NavLink to="/" className="nav-link">Home</NavLink>
        <NavLink to="/product" className="nav-link">Product</NavLink>
        <NavLink to="/user" className="nav-link">User</NavLink>
          <Routes>
            <Route path="/" element={<h2 className='content'>HomePage</h2>}/>
            <Route path="/product" element={<Product name={pname} fun={addProduct}/>}/>
            <Route path="/user" element={<User name={uname} fun={addUser}/>}/>
          </Routes>
          
      </BrowserRouter>
      </>
  );
}

export default App;

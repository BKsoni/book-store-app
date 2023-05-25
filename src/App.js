import './App.css';
import { BrowserRouter, NavLink, Route, Routes } from 'react-router-dom';
import { ThemeProvider } from '@material-ui/core';
import RegistrationForm from './components/register/RegistrationForm';
import LoginForm from './components/login/LoginForm';
import { customTheme } from './assets/CustomTheme';
import { nav } from './assets/Navigations'

function App() {

  return (
    <>
    <ThemeProvider theme={customTheme}>
    <BrowserRouter>
      <div className="header">
        <NavLink to="/" className="nav-link">Home</NavLink>
        <NavLink to={nav.Login} className="nav-link">Login</NavLink>
        <NavLink to={nav.Register} className="nav-link">Register</NavLink>
      </div>
          <Routes>
            <Route path="/" element={<h2 className='container'>Welcome to HomePage</h2>}/>
            <Route path={nav.Login} element={<LoginForm/>}/>
            <Route path={nav.Register} element={<RegistrationForm/>}/>
          </Routes>
      </BrowserRouter>
      </ThemeProvider>
      </>
  );
}

export default App;
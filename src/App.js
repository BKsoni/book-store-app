import "./App.css";

import { ThemeProvider } from "@material-ui/core";
import { customTheme } from "./assets/CustomTheme";
import Navbar from "./components/Navbar";
import BodyContent from "./components/BodyContent";
import Footer from "./components/Footer";
import { BrowserRouter } from "react-router-dom";
import { ToastContainer } from "react-toastify";

function App() {
  return (
    <>
      <ThemeProvider theme={customTheme}>
        <ToastContainer/>
        <BrowserRouter>
          <Navbar />
          <BodyContent/>
          <Footer />
        </BrowserRouter>
      </ThemeProvider>
    </>
  );
}

export default App;

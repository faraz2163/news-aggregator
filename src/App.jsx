import { BrowserRouter, Route, Routes } from "react-router-dom";
import "./App.scss";

import Header from "./partials/Header";
import Home from "./pages/Home";
import Footer from "./partials/Footer";
import services from "./services/services";

function App() {
  // console.log(services.NewsAPI.getSources());
  return (
    <div>
      <Header />
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Home />} />
        </Routes>
      </BrowserRouter>
      <Footer />
    </div>
  );
}

export default App;

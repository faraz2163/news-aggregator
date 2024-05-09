import { BrowserRouter, Route, Routes } from "react-router-dom";
import "./App.scss";

import Header from "./partials/Header";
import Home from "./pages/Home";
import Footer from "./partials/Footer";
import { SkeletonTheme } from "react-loading-skeleton";

function App() {
  return (
    <div>
      <SkeletonTheme baseColor="#cfcfcf" highlightColor="#dfdfdf">
        <Header />
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<Home />} />
          </Routes>
        </BrowserRouter>
        <Footer />
      </SkeletonTheme>
    </div>
  );
}

export default App;

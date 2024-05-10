import { BrowserRouter, Route, Routes } from "react-router-dom";
import "./App.scss";

import Header from "./partials/Header";
import Home from "./pages/Home";
import Footer from "./partials/Footer";
import { SkeletonTheme } from "react-loading-skeleton";
import { useSelector } from "react-redux";
import { selectUserPreferences } from "./slices/userPreferencesSlice";

function App() {
  const { user_search } = useSelector(selectUserPreferences);
  return (
    <div>
      <SkeletonTheme baseColor="#cfcfcf" highlightColor="#dfdfdf">
        <Header />
        <div
          className={`transition-all duration-500  ${
            user_search !== "" &&
            "opacity-0 pointer-events-none h-0 overflow-hidden"
          }`}
        >
          <BrowserRouter>
            <Routes>
              <Route path="/" element={<Home />} />
            </Routes>
          </BrowserRouter>
        </div>
        <Footer />
      </SkeletonTheme>
    </div>
  );
}

export default App;

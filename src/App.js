import { BrowserRouter, Route, Routes } from "react-router-dom";
import MyUrlShorten from "./Components/UrlShorten";
import UrlSignup from "./Components/UrlShorten/UrlCreds/urlSignup";
import UrlLogin from "./Components/UrlShorten/UrlCreds/urlLogin";
export default function MyApp() {
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<MyUrlShorten />} />
          <Route path="/urlShorter/Register" element={<UrlSignup />} />
          <Route path="/urlshorter/login" element={<UrlLogin />} />
        </Routes>
      </BrowserRouter>
    </>
  );
}

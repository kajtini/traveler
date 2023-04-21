import Home from "./pages/Home";
import Destinations from "./pages/Destinations";
import Destination from "./pages/Destination";
import Header from "./components/Header";
import { Routes, Route } from "react-router-dom";

function App() {
  return (
    <div className="flex min-h-screen flex-col items-center justify-center bg-slate-900 font-primary text-white">
      <div className="flex w-full max-w-7xl flex-grow flex-col  justify-center px-4 sm:px-6">
        <Routes>
          <Route element={<Header />}>
            <Route path="/" element={<Home />} />
            <Route path="/destinations" element={<Destinations />} />
            <Route path="/destinations/:id" element={<Destination />} />
          </Route>
        </Routes>
      </div>
    </div>
  );
}

export default App;

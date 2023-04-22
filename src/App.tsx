import Home from "./pages/Home";
import Destinations from "./pages/Destinations";
import Destination from "./pages/Destination";
import SignUp from "./pages/SignUp";
import Header from "./components/Header";
import { Routes, Route } from "react-router-dom";
import ProtectedRoutes from "./components/ProtectedRoutes";
import { useEffect } from "react";
import { onAuthStateChanged } from "firebase/auth";
import { auth } from "./firebase/config";
import { useAppDispatch } from "./app/hooks";
import { logIn, logOut } from "./features/user/userSlice";

function App() {
  const dispatch = useAppDispatch();

  useEffect(() => {
    onAuthStateChanged(auth, (user) => {
      if (user) {
        const { displayName, email, uid, photoURL } = user;

        if (displayName && email && uid && photoURL) {
          dispatch(logIn({ displayName, email, uid, photoURL }));
        }
      } else {
        dispatch(logOut);
      }
    });
  }, []);

  return (
    <div className="flex min-h-screen flex-col items-center justify-center bg-slate-900 font-primary text-white">
      <div className="flex w-full max-w-7xl flex-grow flex-col  justify-center px-5 sm:px-6">
        <Routes>
          <Route element={<Header />}>
            <Route element={<ProtectedRoutes />}>
              <Route path="/" element={<Home />} />
              <Route path="/destinations" element={<Destinations />} />
              <Route path="/destinations/:id" element={<Destination />} />
            </Route>
          </Route>
          <Route path="/signUp" element={<SignUp />} />
        </Routes>
      </div>
    </div>
  );
}

export default App;

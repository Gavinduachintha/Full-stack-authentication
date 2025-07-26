import { BrowserRouter, Routes, Route } from "react-router-dom";
import Login from "./components/Login";
import Dashboard from "./components/Dashboard";
import Signup from "./components/Signup";
import Protectedroute from "./components/Protectedroute";
import "./App.css";

function App() {
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Login />} />
          <Route path="/register" element={<Signup />} />

          <Route
            path="/dashboard"
            element={
              <Protectedroute>
                <Dashboard />
              </Protectedroute>
            }
          />
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;

import { useState } from "react";
import { clearToken, getToken } from "./api.js";
import Login from "./Login.jsx";
import Pos from "./Pos.jsx";
import Products from "./Products.jsx";

export default function App() {
  const [loggedIn, setLoggedIn] = useState(Boolean(getToken()));
  const [page, setPage] = useState("pos");

  if (!loggedIn) return <Login onLogin={() => setLoggedIn(true)} />;

  const logout = () => {
    clearToken();
    setLoggedIn(false);
  };

  return (
    <div className="app">
      <header>
        <h1>TindaMate</h1>
        <nav>
          <button className={page === "pos" ? "active" : ""} onClick={() => setPage("pos")}>
            POS
          </button>
          <button className={page === "products" ? "active" : ""} onClick={() => setPage("products")}>
            Products
          </button>
          <button onClick={logout}>Logout</button>
        </nav>
      </header>
      {page === "pos" ? <Pos /> : <Products />}
    </div>
  );
}

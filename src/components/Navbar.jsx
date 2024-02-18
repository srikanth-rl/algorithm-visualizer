import * as React from "react";
import "../styles/navbar.css";

function Navbar({ msg }) {
  return (
    <div style={{ backgroundColor: "rgba(10, 25, 47, 1)", margin: "auto" }}>
      <nav className="navbar">
        <div>
          <a className="navbarlink" href="https://srikanth-algo-visualizer.netlify.app">
            Home
          </a>
        </div>
        <div>
          <span style={{ color: "lightseagreen" }}>{msg}</span>
        </div>
      </nav>
    </div>
  );
}
export default Navbar;

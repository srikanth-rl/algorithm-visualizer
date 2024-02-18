import Card from "../components/Card";
import Footer from "../components/Footer";
import Navbar from "../components/Navbar";
import "../styles/home.css";
import img1 from "../icons/path-finding.png";
import img2 from "../icons/sort-algo.png";
// import img3 from "../icons/prime-spiral.png";
import img4 from "../icons/nqueens.png";
import { Link } from "react-router-dom";

function Home() {
  return (
    <div className="Mycontainer"> {/* Removed the dot from className */}
      <Navbar msg={"Algorithms Visualizer"}></Navbar>
      <h2 className="text-2xl text-center text-slate-700 py-4">
        A Better Visualization Of Different Algorithms
      </h2>

      <div className="cards-container">
        <Link className="no_underline" to="/path-finding">
          <Card array={[img1, "Path-Finder"]} />
        </Link>
        <a className="no_underline" href="https://srikanth-sorting-visualizer.netlify.app" >
        <Card array={[img2, "Sorting Algorithms"]} />
        </a>
        <Link className="no_underline" to="/nqueens">
          <Card array={[img4, "N queens problem"]} className="cardWithMargin" />
        </Link>
      </div>

      <Footer></Footer>
    </div>
  );
}

export default Home;

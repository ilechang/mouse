import React from "react";
import Iphone from "../assets/images/iphone-14.jpg";
// import HoldingIphone from "../assets/images/iphone-hand.png";

function Jumbotron() {

  const handleLearnMore = () => {
    const element = document.querySelector(".sound-section");
    window.scrollTo({
      top: element?.getBoundingClientRect().top,
      lef: 0,
      behavior: 'smooth'
    });
  }

  return (
    <div className="jumbotron-section wrapper"
      style={{
        height: "100vh",
        width: "100%",
        backgroundImage: 'url("./hex.png")',
        backgroundSize: "cover",
        backgroundPosition: "center",
        backgroundRepeat: "no-repeat",
        backgroundAttachment: "fixed" // ✅ 背景固定
      }}
    >
      <h2 className="title">header 1</h2>
      {/* <img className="logo" src={Iphone} alt="iPhone 14 Pro" /> */}
      <h1 className="text">Product name</h1>
      <span className="description">
        Lorem ipsum sint occaecat cupidatat non proident, sunt in culpa qui officia.
      </span>
      <ul className="links">
        <li>
          <button className="button">Buy</button>
        </li>
        <li>
          <a className="link" onClick={handleLearnMore}>Learn more</a>
        </li>
      </ul>
      {/* <img className="iphone-img" src="./top.png" alt="iPhone" /> */}
    </div>
  ); 
}

export default Jumbotron;

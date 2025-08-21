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
    <div className="jumbotron-section wrapper text-md-end "
      style={{
        display: "flex",              // ✅ 加入 Flex
        flexDirection: "column",      // 垂直排列
        justifyContent: "center",    // 垂直置中
        alignItems: "flex-start",    // 水平靠左
        paddingLeft: "45%",          // ✅ 左邊留一點空間
        textAlign: "left",           // 文字靠左對齊       // 讓文字置中對齊
        height: "100vh",
        width: "100%",
        backgroundImage: 'url("./hex.webp")',
        backgroundSize: "cover",
        backgroundPosition: "center",
        backgroundRepeat: "no-repeat",
        backgroundAttachment: "fixed" // ✅ 背景固定
      }}
    >
      <div className="">
        <h1 className="text " style={{ fontSize: "9rem" }}>Xoskeleton</h1>
        <p className="description mx-auto text-center fs-4 ">
          From Office Battles to Gaming Arenas — One Mouse, Total Victory.
        </p>

        <div className="d-flex">
          <ul className="ms-auto text list-unstyled gap-3 fs-4 text-end">
            <li>Industrial Design</li>
            <li>3D Web Design</li>
            <li>3D Web Development</li>
            <li>Solo Project • 2025</li>
          </ul>
        </div>
      </div>

    
    </div>
  );
}

export default Jumbotron;

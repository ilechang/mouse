import React, { useEffect, useState, useRef } from "react";
import gsap from "gsap";

function Jumbotron() {
  const [isMobile, setIsMobile] = useState(false);

  // Refs
  const titleRef = useRef(null);
  const subtitleRef = useRef(null);
  const listRefs = useRef([]); 

  // 畫面寬度監聽
  useEffect(() => {
    const checkSize = () => {
      const vw = window.visualViewport?.width || window.innerWidth;
      setIsMobile(vw <= 1150);
    };
    checkSize();
    window.visualViewport?.addEventListener("resize", checkSize);
    window.addEventListener("resize", checkSize);
    return () => {
      window.visualViewport?.removeEventListener("resize", checkSize);
      window.removeEventListener("resize", checkSize);
    };
  }, []);

  // 動畫流程：延遲 1 秒後一次性淡入
  useEffect(() => {
    if (!titleRef.current || !subtitleRef.current) return;

    // 全部重置為透明
    gsap.set([titleRef.current, subtitleRef.current, ...listRefs.current], {
      opacity: 0,
    });

    // 延遲 1 秒淡入
    gsap.to([titleRef.current, subtitleRef.current, ...listRefs.current], {
      opacity: 1,
      duration: 1,
      ease: "power1.out",
      stagger: 0, // 同時
      delay: 1,   // 延遲 1 秒
    });
  }, [isMobile]);

  const desktopStyle = {
    display: "flex",
    flexDirection: "column",
    position: "relative",
    alignItems: "flex-start",
    paddingLeft: "43%",
    textAlign: "left",
    height: "100vh",
    width: "100%",
    backgroundImage: 'url("/hex.webp")',
    backgroundSize: "cover",
    backgroundPosition: "center",
    backgroundRepeat: "no-repeat",
    backgroundAttachment: "fixed",
  };

  const mobileStyle = {
    display: "flex",
    flexDirection: "column",
    justifyContent: "flex-start",
    alignItems: "center",
    width: "100%",
    backgroundImage: 'url("/hex.webp")',
    backgroundSize: "cover",
    backgroundPosition: "center",
    backgroundRepeat: "no-repeat",
    backgroundAttachment: "fixed",
    position: "relative",
    height: "auto",
    paddingBottom: "40px",
  };

  const items = [
    "Industrial Design",
    "3D Web Design",
    "3D Web Development",
    "Solo Project • 2025",
  ];

  return (
    <div
      className="jumbotron-section wrapper text-md-end"
      style={isMobile ? mobileStyle : desktopStyle}
    >
      {isMobile ? (
        <div style={{ width: "100%", textAlign: "center" }}>
          <h1
            ref={titleRef}
            className="fw-bold text"
            style={{
              width: "95%",
              margin: "0 auto",
              fontSize: "clamp(2rem, 16vw, 9rem)",
              whiteSpace: "nowrap",
            }}
          >
            Xoskeleton
          </h1>
          <p
            ref={subtitleRef}
            className="description mx-auto text-center fs-4"
          >
            From Office Battles to Gaming Arenas — One Mouse, Total Victory.
          </p>

          <div className="d-flex mt-5">
            <ul className="ms-auto text list-unstyled gap-3 fs-5 text-end">
              {items.map((t, i) => (
                <li
                  key={t}
                  ref={(el) => (listRefs.current[i] = el)}
                  style={{ opacity: 0 }}
                >
                  {t}
                </li>
              ))}
            </ul>
          </div>

          <img
            src="/3.webp"
            alt="Mobile Illustration"
            style={{ width: "80%", marginBottom: "50px", height: "auto" }}
          />
        </div>
      ) : (
        <div style={{ position: "absolute", top: "20%" }}>
          <h1 ref={titleRef} className="text" style={{ fontSize: "9rem", marginBottom:"0" }}>
            Xoskeleton
          </h1>
          <p ref={subtitleRef} className="description mx-auto text-end fs-4  mb-5">
            From Office Battles to Gaming Arenas — One Mouse, Total Victory.
          </p>

          <div className="d-flex mt-5">
            <ul className="ms-auto text list-unstyled gap-3 fs-5 text-end mt-3">
              {items.map((t, i) => (
                <li
                  key={t}
                  ref={(el) => (listRefs.current[i] = el)}
                  style={{ opacity: 0 }}
                >
                  {t}
                </li>
              ))}
            </ul>
          </div>
        </div>
      )}
    </div>
  );
}

export default Jumbotron;



















// import React from "react";

// // import HoldingIphone from "../assets/images/iphone-hand.png";

// function Jumbotron() {

//   const handleLearnMore = () => {
//     const element = document.querySelector(".sound-section");
//     window.scrollTo({
//       top: element?.getBoundingClientRect().top,
//       lef: 0,
//       behavior: 'smooth'
//     });
//   }

//   return (
//     <div className="jumbotron-section wrapper text-md-end"
//       style={{
//         display: "flex",              // ✅ 加入 Flex
//         flexDirection: "column",      // 垂直排列
//         justifyContent: "center",    // 垂直置中
//         alignItems: "flex-start",    // 水平靠左
//         paddingLeft: "45%",          // ✅ 左邊留一點空間
//         textAlign: "left",           // 文字靠左對齊       // 讓文字置中對齊
//         height: "100vh",
//         width: "100%",
//         backgroundImage: 'url("./hex.webp")',
//         backgroundSize: "cover",
//         backgroundPosition: "center",
//         backgroundRepeat: "no-repeat",
//         backgroundAttachment: "fixed" // ✅ 背景固定
//       }}
//     >
//       <div className="">
//         <h1 className="text " style={{ fontSize: "9rem" }}>Xoskeleton</h1>
//         <p className="description mx-auto text-center fs-4 ">
//           From Office Battles to Gaming Arenas — One Mouse, Total Victory.
//         </p>

//         <div className="d-flex">
//           <ul className="ms-auto text list-unstyled gap-3 fs-4 text-end">
//             <li>Industrial Design</li>
//             <li>3D Web Design</li>
//             <li>3D Web Development</li>
//             <li>Solo Project • 2025</li>
//           </ul>
//         </div>
//       </div>

    
//     </div>
//   );
// }

// export default Jumbotron;













// <div className="jumbotron-section wrapper text-md-end"
// style={{
//   display: "flex",              // ✅ 加入 Flex
//   flexDirection: "column",      // 垂直排列
//   justifyContent: "start",    // 垂直置中
//   alignItems: "flex-center",   

//   height: "100vh",
//   width: "100%",
//   backgroundImage: 'url("./hex.webp")',
//   backgroundSize: "cover",
//   backgroundPosition: "center",
//   backgroundRepeat: "no-repeat",
//   backgroundAttachment: "fixed" // ✅ 背景固定
// }}
// >

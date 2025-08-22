import React, { useEffect, useState, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

function Jumbotron() {
  const [isMobile, setIsMobile] = useState(false);

  // Refs
  const titleRef = useRef(null);
  const subtitleRef = useRef(null);
  const listRef = useRef(null);
  const imageRef = useRef(null);
  const rootRef = useRef(null); // 整個 Jumbotron

  // 螢幕寬度監聽
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

  // 動畫流程
  useEffect(() => {
    if (!titleRef.current || !subtitleRef.current || !listRef.current) return;

    // reset
    gsap.set(titleRef.current, { opacity: 0 });
    gsap.set(subtitleRef.current, { opacity: 0 });
    gsap.set(listRef.current, { opacity: 0 });
    if (imageRef.current) gsap.set(imageRef.current, { opacity: 0 });

    const tl = gsap.timeline();

    // 1. 大標延遲 1 秒淡入
    tl.to(titleRef.current, { opacity: 1, duration: 0.6, ease: "power1.out" }, "+=1");

    // 2. 副標淡入
    tl.to(subtitleRef.current, { opacity: 1, duration: 0.6, ease: "power1.out" }, "+=0.3");

    // 3. list 一次性淡入
    tl.to(listRef.current, { opacity: 1, duration: 0.6, ease: "power1.out" }, "+=0.3");

    // 4. (Mobile only) 圖片最後淡入
    if (imageRef.current) {
      tl.to(imageRef.current, { opacity: 1, duration: 0.6, ease: "power1.out" }, "+=0.3");
    }

    // ⭐ ScrollTrigger 控制淡出
    ScrollTrigger.create({
      trigger: rootRef.current,
      start: "top top", // 只是定義開始監控
      end: "bottom-=400 top", 
      // ↑ 當 jumbotron bottom 距離瀏覽器頂端還有 400px 時
      onLeave: () => {
        gsap.to(
          [titleRef.current, subtitleRef.current, listRef.current, imageRef.current],
          { opacity: 0.4, duration: 1, ease: "power1.out" }
        );
      },
      onEnterBack: () => {
        gsap.to(
          [titleRef.current, subtitleRef.current, listRef.current, imageRef.current],
          { opacity: 1, duration: 1, ease: "power1.out" }
        );
      },
    });

    return () => {
      tl.kill();
      ScrollTrigger.getAll().forEach((st) => st.kill());
    };
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
    <div ref={rootRef} className="jumbotron-section wrapper text-md-end" style={isMobile ? mobileStyle : desktopStyle}>
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
          <p ref={subtitleRef} className="description mx-auto text-center fs-4">
            From Office Battles to Gaming Arenas — One Mouse, Total Victory.
          </p>

          <div className="d-flex mt-5">
            <ul
              ref={listRef}
              className="ms-auto text list-unstyled gap-3 fs-5 text-end"
            >
              {items.map((t) => (
                <li key={t}>{t}</li>
              ))}
            </ul>
          </div>

          <img
            ref={imageRef}
            src="/3.webp"
            alt="Mobile Illustration"
            style={{ width: "80%", marginBottom: "50px", height: "auto" }}
          />
        </div>
      ) : (
        <div style={{ position: "absolute", top: "20%" }}>
          <h1 ref={titleRef} className="text mb-0" style={{ fontSize: "9rem" }}>
            Xoskeleton
          </h1>
          <p ref={subtitleRef} className="description mx-auto mt-0 text-end fs-4">
            From Office Battles to Gaming Arenas — One Mouse, Total Victory.
          </p>

          <div className="d-flex mt-5">
            <ul
              ref={listRef}
              className="ms-auto text list-unstyled gap-3 fs-5 text-end"
            >
              {items.map((t) => (
                <li key={t}>{t}</li>
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

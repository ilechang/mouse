import React, { useEffect, useState, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

function GameSection({ triggerPreview }) {
  const [isMobile, setIsMobile] = useState(false);
  const textRef = useRef(null);

  useEffect(() => {
    const checkSize = () => setIsMobile(window.innerWidth <= 1150);
    checkSize();
    window.addEventListener("resize", checkSize);
    return () => window.removeEventListener("resize", checkSize);
  }, []);

  useEffect(() => {
    if (isMobile || !textRef.current) {
      if (textRef.current) textRef.current.style.opacity = 1;
      return;
    }

    gsap.set(textRef.current, { opacity: 0 });

    gsap.to(textRef.current, {
      opacity: 1.2,
      duration: 0.8,
      ease: "power1.out",
      scrollTrigger: {
        trigger: textRef.current,
        start: "top bottom-=250", // 文字區塊頂端進入視窗底部以上 400px
        toggleActions: "play none none none",
        once: true,
        // markers: true,
      },
    });
  }, [isMobile]);

  // 桌機樣式
  const desktopStyle = {
    height: "120vh",
    position: "relative",
    backgroundImage: 'url("./hex.webp")',
    backgroundSize: "cover",
    backgroundPosition: "center",
    backgroundRepeat: "no-repeat",
    backgroundAttachment: "fixed", // ✅ 桌機有視差
    paddingTop: "0",
    paddingBottom: "0",
  };

  // 手機樣式
  const mobileStyle = {
    height: "auto",
    position: "relative",
    backgroundImage: 'url("./hex.webp")',
    backgroundSize: "cover",
    backgroundPosition: "center",
    backgroundRepeat: "no-repeat",
    backgroundAttachment: "scroll", // ✅ 手機正常滾動
    paddingTop: "40px",
    paddingBottom: "40px",
  };

  return (
    <div
      className="display-section d-flex flex-column"
      style={isMobile ? mobileStyle : desktopStyle}
    >
      {/* 文字區塊 (GSAP 淡入) */}
      <div
        ref={textRef}
        className={`p-5 ${isMobile ? "text-end" : "text-end ms-auto"}`}
        style={{
          position: isMobile ? "relative" : "absolute",
          top: isMobile ? "0" : "auto",
          right: isMobile ? "auto" : "5%",
          bottom: isMobile ? "auto" : "57%",
          maxWidth: isMobile ? "100%" : "500px",
          color: "white",
          width: isMobile ? "90%" : "auto",
          margin: isMobile ? "0 auto" : "0",
        }}
      >
        <p className="text-secondary" style={{ color: "white" }}>
          For Gaming
        </p>
        <h2 className="fw-bold">Precise and Fast Controls</h2>

        <hr
          style={{
            width: "100%",
            margin: "1rem auto",
            borderTop: "8px solid white",
            opacity: 1,
          }}
        />

        <p
          style={{
            maxWidth: isMobile ? "100%" : "600px",
            margin: "0 auto",
            fontSize: "1rem",
            lineHeight: "1.6",
            color: "white",
          }}
        >
          Engineered for victory—lightning-fast, ultra-precise,
          and built to dominate every game.
        </p>
      </div>

      {/* ✅ 手機/平板 → 顯示 2.webp */}
      {isMobile ? (
        <img
          src="./2.webp"
          alt="Mobile Illustration"
          style={{
            marginTop: "20px",
            width: "90%",
            maxWidth: "500px",
            height: "auto",
            alignSelf: "center",
            marginBottom: "20px",
          }}
        />
      ) : (
        // 🖥️ 桌機 → gamingbg.webp
        <img
          src="./gamingbg.webp"
          alt="Gaming Illustration"
          style={{
            position: "absolute",
            bottom: 0,
            right: 0,
            width: "auto",
            height: "auto",
            maxWidth: "100%",
            maxHeight: "100%",
          }}
        />
      )}
    </div>
  );
}

export default GameSection;








// import React, { useEffect, useState } from "react";

// function GameSection({ triggerPreview }) {
//   const [isMobile, setIsMobile] = useState(false);

//   useEffect(() => {
//     const checkSize = () => setIsMobile(window.innerWidth <= 1150);
//     checkSize(); // 初始化
//     window.addEventListener("resize", checkSize);
//     return () => window.removeEventListener("resize", checkSize);
//   }, []);

//   const handleScrollToTop = () => {
//     window.scrollTo({ top: 0, left: 0, behavior: "smooth" });
//   };

//   return (
//     <div
//       className="display-section d-flex "
//       style={{
//         height: "120vh",
//         position: "relative",
//         backgroundImage: 'url("./hex.webp")',
//         backgroundSize: "cover",
//         backgroundPosition: "center",
//         backgroundRepeat: "no-repeat",
//         backgroundAttachment: "fixed",
//         position: "relative", // 讓內部的 img 可以用 absolute
//       }}
//     >
//       <div className="text-end text-light p-5 ms-auto " style={{ position: "absolute", right:"5%", bottom: "57%", maxWidth:"500px"}}>


//         {/* 主標題 */}
//         <p className="text-secondary">For Gaming</p>
//         <h2 className="fw-bold">Precise and Fast Controls</h2>

//         {/* 分隔線 */}
//         <hr
//           style={{
//             width: "100%",
//             margin: "1rem auto",
//             borderTop: "8px solid #fff",
//             opacity: 1,
//           }}
//         />

//         {/* 說明文字 */}
//         <p style={{ maxWidth: "600px", margin: "0 auto", fontSize: "1rem" }}>
//           Engineered for victory—lightning-fast, ultra-precise,
//           <br />
//           and built to dominate every game.
//         </p>
//       </div>
//       {isMobile ? (
//         // 📱 手機 / iPad (≤1150px)
//         <img
//           src="./gamingbg.webp"
//           alt=""
//           style={{
//             position: "absolute",
//             bottom: 0,
//             right: 0,
//             height: "80%",     // ✅ 高度吃 80%
//             width: "auto",
//             minHeight: "300px" // ✅ 避免過小
//           }}
//         />
//       ) : (
//         // 🖥️ 桌機 (>1150px)
//         <img
//           src="./gamingbg.png"
          
//           style={{
//             position: "absolute",
//             bottom: 0,
//             right: 0,
//             width: "auto",     // ✅ 或設百分比寬度
//             height: "auto",
//             maxWidth: "100%",  // ✅ 防止超出
//             maxHeight: "100%", // ✅ 防止超出
//           }}
//         />
//       )}
//     </div>
//   );
// }

// export default GameSection;











// import React from "react";

// function GameSection({ triggerPreview }) {
//   const handleScrollToTop = () => {
//     window.scrollTo({ top: 0, left: 0, behavior: "smooth" });
//   };

//   return (
//     <div
//       className="display-section d-flex align-items-center"
//       style={{
//         height: "120vh",
//         position: "relative", // ⬅️ 讓內部的 img 可以用 absolute
//         backgroundImage: 'url("./hex.webp")',
//         backgroundSize: "cover",
//         backgroundPosition: "center",
//         backgroundRepeat: "no-repeat",
//         backgroundAttachment: "fixed"
//       }}
//     >
//       {/* ⬇️ 圖片固定在右下角，無空隙 */}
//       <img
//         src="./gamingbg-min.webp"
//         alt=""
//         style={{
//           position: "absolute",
//           bottom: 0,
//           right: 0,
//           width: "auto",     // ✅ 或設百分比寬度
//           height: "auto",
//           maxWidth: "100%",  // ✅ 防止超出
//           maxHeight: "100%", // ✅ 防止超出
//         }}
//       />
//     </div>
//   );
// }

// export default GameSection;




// //加入ismoble 小於1150時 用
// <img
//         src="./gamingbg-min.webp"
//         alt=""
//         style={{
//           position: "absolute",
//           bottom: 0,
//           right: 0,
//           height: "80%",   // 📌 依螢幕高度佔比
//           width: "auto",
//           minHeight: "300px", // 📌 避免過小
//         }}
//       />


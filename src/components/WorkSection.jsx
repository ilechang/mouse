import React, { useEffect, useRef, useState } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

function WorkSection() {
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
      // 手機板直接顯示，不要動畫
      if (textRef.current) textRef.current.style.opacity = 1;
      return;
    }

    // 初始透明
    gsap.set(textRef.current, { opacity: 0 });

    // 滾動淡入
    gsap.to(textRef.current, {
      opacity: 1.2,
      duration: 0.8,
      ease: "power1.out",
      scrollTrigger: {
        trigger: textRef.current,
        start: "top bottom-=250", // 文字區塊頂端進入視窗底部以上 200px
        toggleActions: "play none none none",
        once: true,
        // markers: true, // 除錯可開
      },
    });
  }, [isMobile]);

  return (
    <div
      className="sound-section d-flex align-items-center"
      style={{
        backgroundImage: isMobile ? "none" : 'url("workbg.webp")',
        backgroundColor: isMobile ? "white" : "transparent",
        backgroundSize: "cover",
        backgroundPosition: "center",
        backgroundRepeat: "no-repeat",
        height: isMobile ? "auto" : "120vh",
        position: "relative",
        flexDirection: isMobile ? "column" : "row",
        justifyContent: "flex-start",
        alignItems: isMobile ? "center" : "flex-start",
        paddingTop: isMobile ? "40px" : "0",
        paddingBottom: isMobile ? "40px" : "0",
      }}
    >
      {/* 文字區塊（只有這裡淡入） */}
      <div
        ref={textRef}
        className={`p-5 ${isMobile ? "text-start" : "text-start text-dark"}`}
        style={{
          position: isMobile ? "relative" : "absolute",
          bottom: isMobile ? "auto" : "50%",
          left: isMobile ? "auto" : "35%",
          width: isMobile ? "90%" : "450px",
          color: isMobile ? "black" : "inherit",
        }}
      >
        <p className="text-secondary">For Productivity</p>
        <h2 className="fw-bold">Efficient Workflow</h2>
        <hr
          style={{
            width: "100%",
            margin: "1rem auto",
            borderTop: "8px solid black",
            opacity: 1,
          }}
        />
        <p
          style={{
            textAlign: "left",
            fontSize: "1rem",
            lineHeight: "1.6",
          }}
        >
          With voice input and built-in AI for instant assistant launch,
          combined with automatic profile detection and switching, your
          workflows stay seamless and efficient.
        </p>
      </div>

      {/* 手機板才顯示圖片 */}
      {isMobile && (
        <img
          src="./1.webp"
          alt="Mobile Illustration"
          style={{
            marginTop: "20px",
            marginBottom: "40px",
            width: "90%",
            maxWidth: "500px",
            height: "auto",
          }}
        />
      )}
    </div>
  );
}

export default WorkSection;













// import React, { useEffect, useState } from "react";

// function WorkSection() {
//   const [isMobile, setIsMobile] = useState(false);

//   useEffect(() => {
//     const checkSize = () => setIsMobile(window.innerWidth <= 1150);
//     checkSize(); // 初始化
//     window.addEventListener("resize", checkSize);
//     return () => window.removeEventListener("resize", checkSize);
//   }, []);

//   const handleLearnMore = () => {
//     const element = document.querySelector(".display-section");
//     window.scrollTo({
//       top: element?.getBoundingClientRect().bottom,
//       left: 0,
//       behavior: "smooth",
//     });
//   };

//   return (
//     <div
//       className="sound-section d-flex align-items-center"
//       style={{
//         backgroundImage: 'url("workbg.webp")',
//         backgroundSize: "cover",
//         backgroundPosition: isMobile ? "center" : "center", // 📌 小螢幕靠左
//         backgroundRepeat: "no-repeat",
//         height: "120vh",
//         position: "relative", // 讓內部元素可以絕對定位
//       }}
//     >
//          <div className="text-start text-dark p-5 ms-auto " style={{ position: "absolute", left: "35%", bottom: "50%", maxWidth:"450px"}}>



// <p className="text-secondary">For Productivity</p>
// <h2 className="fw-bold">Efficient Workflow</h2>


// <hr
//   style={{
//     width: "100%",
//     margin: "1rem auto",
//     borderTop: "8px solid black",
//     opacity: 1,
//   }}
// />


// <p  style={{
//     maxWidth: "500px",
//     margin: "0 auto",
//     textAlign: "left",
//     fontSize: "1rem",
//     lineHeight: "1.6",
//   }}>
//   With voice input and built-in AI for instant assistant launch, combined with automatic profile detection and switching, your workflows stay seamless and efficient.
// </p>

// </div>
//       <div className="container text-dark text-center">
//         <div className="row">
//           <div
//             className="col-md-4 me-auto position-relative"
//             style={{ top: "0px", left: "35%" }}
//           >
//             {/* <h2 className="title">header 2</h2>
//             <p className="h3 fw-bold">Smart for Work</p>
//             <p className="description">
//               Quick AI assistant launch and smart profile switching streamline creative workflows.
//             </p> */}
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// }

// export default WorkSection;







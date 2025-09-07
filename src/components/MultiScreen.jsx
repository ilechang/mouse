import React, { useEffect, useRef, useState } from "react";
import { Card } from "react-bootstrap";
import gsap from "gsap";

function MultiScreen({ onProfileChange }) {
  const screens = [
    {
      label: "LoL",
      profileKey: "lol",
      imgSrc: "/lol.jpg",
      transformStyle: "rotateY(15deg) scale(0.8)",
      marginStyle: { marginRight: "clamp(-100px, -8vw, -40px)" },
      widthClamp: "clamp(600px, 50vw, 700px)",
    },
    {
      label: "Photoshop",
      profileKey: "photoshop",
      imgSrc: "/ps.jpg",
      transformStyle: "scale(0.9)",
      marginStyle: { margin: "0 clamp(4px, 1vw, 12px)" },
      widthClamp: "clamp(500px, 37vw, 600px)",
    },
    {
      label: "VS Code",
      profileKey: "vscode",
      imgSrc: "/vscode.jpg",
      transformStyle: "rotateY(-15deg) scale(0.8)",
      marginStyle: { marginLeft: "clamp(-100px, -8vw, -40px)" },
      widthClamp: "clamp(600px, 50vw, 700px)",
    },
  ];

  const [activeIndex, setActiveIndex] = useState(0);
  const [isMobile, setIsMobile] = useState(false);
  const cardRefs = useRef(screens.map(() => React.createRef()));

  useEffect(() => {
    const checkSize = () => {
      const mobile = (window.visualViewport?.width || window.innerWidth) <= 1150;
      setIsMobile(mobile);
    };
    checkSize();
    window.visualViewport?.addEventListener("resize", checkSize);
    window.addEventListener("resize", checkSize);

    return () => {
      window.visualViewport?.removeEventListener("resize", checkSize);
      window.removeEventListener("resize", checkSize);
    };
  }, []);

  // ✅ 自動循環亮起
  useEffect(() => {
    const interval = setInterval(() => {
      setActiveIndex((prev) => (prev + 1) % screens.length);
    }, 1200);
    return () => clearInterval(interval);
  }, [screens.length]);

  // ✅ 當 activeIndex 變化 → 通知父層
  useEffect(() => {
    if (onProfileChange) {
      onProfileChange(screens[activeIndex].profileKey);
    }
  }, [activeIndex]);

  // ✅ GSAP 動畫
  useEffect(() => {
    cardRefs.current.forEach((ref, i) => {
      if (!ref.current) return;
      gsap.to(ref.current, {
        opacity: activeIndex === i ? 1 : 0,
        y: activeIndex === i ? 0 : 20,
        x: activeIndex === i ? 0 : 20,
        scale: activeIndex === i ? 1 : 0.8,
        duration: 0.4,
        ease: "power2.out",
      });
    });
  }, [activeIndex]);

  return (
    <div style={{ backgroundColor: "rgb(31,31,31)", padding: "0rem 0rem 4rem 0rem" }}>
      <div
        style={{
          position: "relative",
          display: "flex",
          justifyContent: isMobile ? "space-evenly" : "center",
          alignItems: "center",
          gap: isMobile ? "0.25rem" : "0rem",
          backgroundColor: "rgb(31,31,31)",
          padding: "0rem",
          flexWrap: "nowrap",
          overflowX: isMobile ? "auto" : "visible",
          marginBottom: isMobile ? "3rem" : "0",
        }}
      >
        {screens.map((screen, i) => (
          <div
            key={screen.label}
            style={{
              perspective: "1200px",
              flex: isMobile ? "0 0 32%" : "unset",
            }}
          >
            <div
              style={{
                ...(!isMobile && screen.marginStyle),
                transform: isMobile ? "scale(0.9)" : screen.transformStyle,
                position: "relative",
                zIndex: activeIndex === i ? 200 : 1,
                boxShadow:
                  activeIndex === i ? "0 0 20px 5px rgba(0, 123, 255, 0.9)" : "none",
                transition: "box-shadow 0.3s ease, z-index 0s",
              }}
            >
              <img
                src={screen.imgSrc}
                alt={screen.label}
                style={{
                  width: isMobile ? "100%" : screen.widthClamp,
                  display: "block",
                }}
              />

              {/* ✅ 桌機自動亮起時顯示卡片；手機不顯示卡片 */}
              {!isMobile && (
                <Card
                  ref={cardRefs.current[i]}
                  className="position-absolute text-white"
                  style={{
                    bottom: 0,
                    right: 0,
                    width: "27%",
                    backgroundColor: "rgb(51,51,51)",
                    margin: "1rem",
                    display: "flex",
                    flexDirection: "column",
                    maxHeight: "90%",
                    zIndex: 1000,
                    opacity: 0,
                    pointerEvents: "none",
                    fontSize: "0.8rem",
                    boxShadow: "0 0 12px rgba(255, 255, 255, 0.15)",
                  }}
                >
                  {/* 🔹 把 top.webp 加回來 */}
                  <img
                    src="/top.webp"
                    alt="trigger base"
                    style={{
                      position: "absolute",
                      bottom: "-0.6rem",
                      right: "-0.6rem",
                      width: "16%",
                      zIndex: 1001,
                      pointerEvents: "none",
                    }}
                  />
                  <Card.Body className="px-3 py-2">
                    <p className="text-white small mb-0">{`${screen.label} Profile On`}</p>
                  </Card.Body>
                </Card>
              )}
            </div>
          </div>
        ))}
      </div>

      <h1 className="mx-auto text-center text-white fw-bold mb-3">
        Multi-Monitor Automatic Profile Switching
      </h1>
      <p
        className="mx-auto text-white text-center mb-4"
        style={{ maxWidth: "1000px" }}
      >
        The mouse delivers a seamless experience by automatically detecting which
        application your cursor is on across wide or multi-monitor setups, and
        instantly switching to the corresponding profile.
      </p>
    </div>
  );
}

export default MultiScreen;
















// import React, { useEffect, useRef, useState } from "react";
// import { Card } from "react-bootstrap";
// import gsap from "gsap";

// function MultiScreen({ setHoveredProfile }) {
//   const screens = [
//     { label: "LoL", profileKey: "lol", imgSrc: "/lol.jpg", transformStyle: "rotateY(15deg) scale(0.8)", marginStyle: { marginRight: "clamp(-100px, -8vw, -40px)" }, widthClamp: "clamp(600px, 50vw, 700px)" },
//     { label: "Photoshop", profileKey: "photoshop", imgSrc: "/ps.jpg", transformStyle: "scale(0.9)", marginStyle: { margin: "0 clamp(4px, 1vw, 12px)" }, widthClamp: "clamp(500px, 37vw, 600px)" },
//     { label: "VS Code", profileKey: "vscode", imgSrc: "/vscode.jpg", transformStyle: "rotateY(-15deg) scale(0.8)", marginStyle: { marginLeft: "clamp(-100px, -8vw, -40px)" }, widthClamp: "clamp(600px, 50vw, 700px)" },
//   ];

//   // 分開控制：hovered 控藍光；showCard 控卡片與 top.png
//   const [hovered, setHovered] = useState(() => screens.map(() => false));
//   const [showCard, setShowCard] = useState(() => screens.map(() => false));

//   const cardRefs = useRef(screens.map(() => React.createRef()));
//   const hideTimers = useRef(screens.map(() => null));

//   useEffect(() => {
//     cardRefs.current.forEach((ref) => {
//       gsap.set(ref.current, {
//         opacity: 0,
//         y: 20,
//         x: 20,
//         scale: 0.8,
//         transformOrigin: "bottom right",
//       });
//     });
//   }, []);

//   // 只對卡片做顯示/隱藏動畫
//   useEffect(() => {
//     showCard.forEach((visible, i) => {
//       const ref = cardRefs.current[i];
//       if (!ref.current) return;
//       gsap.to(ref.current, {
//         opacity: visible ? 1 : 0,
//         y: visible ? 0 : 20,
//         x: visible ? 0 : 20,
//         scale: visible ? 1 : 0.8,
//         duration: 0.3,
//         ease: "power2.out",
//       });
//     });
//   }, [showCard]);

//   const clearTimer = (i) => {
//     if (hideTimers.current[i]) {
//       clearTimeout(hideTimers.current[i]);
//       hideTimers.current[i] = null;
//     }
//   };

//   const handleMouseEnter = (i) => {
//     // 藍光立刻打開
//     setHovered((prev) => prev.map((v, idx) => (idx === i ? true : v)));

//     // 卡片立刻顯示，並在 3 秒後自動關閉
//     clearTimer(i);
//     setShowCard((prev) => prev.map((v, idx) => (idx === i ? true : v)));
//     hideTimers.current[i] = setTimeout(() => {
//       setShowCard((prev) => prev.map((v, idx) => (idx === i ? false : v)));
//     }, 1200);

//     if (setHoveredProfile) setHoveredProfile(screens[i].profileKey);
//   };

//   const handleMouseLeave = (i) => {
//     // 藍光關閉
//     setHovered((prev) => prev.map((v, idx) => (idx === i ? false : v)));
//     // 卡片與 top.png 立刻關閉
//     clearTimer(i);
//     setShowCard((prev) => prev.map((v, idx) => (idx === i ? false : v)));

//     if (setHoveredProfile) setHoveredProfile(null);
//   };

//   return (
//     <div   style={{

//       backgroundColor: "rgb(31,31,31)",
//       padding: "0rem 0rem 4rem 0rem",
   
//     }}>
//     <div
//       style={{
//         position: "relative",
//         display: "flex",
//         justifyContent: "center",
//         alignItems: "center",
//         gap: "0rem",
//         backgroundColor: "rgb(31,31,31)",
//         padding: "0rem 0rem 0rem 0rem",
//         flexWrap: "nowrap",
//       }}
//     >
//       {screens.map((screen, i) => (
//         <div key={screen.label} style={{ perspective: "1200px" }}>
//           <div
//             onMouseEnter={() => handleMouseEnter(i)}
//             onMouseLeave={() => handleMouseLeave(i)}
//             style={{
//               ...screen.marginStyle,
//               transform: screen.transformStyle,
//               position: "relative",
//               zIndex: hovered[i] ? 200 : 1,
//               // 藍光由 hovered 控制（滑鼠不離開就不消失）
//               boxShadow: hovered[i]
//                 ? "0 0 20px 5px rgba(0, 123, 255, 0.9)"
//                 : "none",
//               transition: "box-shadow 0.3s ease, z-index 0s",
//               cursor: "pointer",
//             }}
//           >
//             <img src={screen.imgSrc} alt={screen.label} style={{ width: screen.widthClamp, display: "block" }} />

//             {/* top.png 跟卡片同壽命：showCard 才顯示 */}
//             {showCard[i] && (
//               <img
//                 src="/top.webp"
//                 alt="trigger base"
//                 style={{
//                   position: "absolute",
//                   bottom: "0.5rem",
//                   right: "0.5rem",
//                   width: "5%",
//                   zIndex: 1001,
//                   pointerEvents: "none",
//                 }}
//               />
//             )}

//             <Card
//               ref={cardRefs.current[i]}
//               className="position-absolute text-white"
//               style={{
//                 bottom: 0,
//                 right: 0,
//                 width: "27%",
//                 backgroundColor: "rgb(51,51,51)",
//                 margin: "1rem",
//                 display: "flex",
//                 flexDirection: "column",
//                 maxHeight: "90%",
//                 zIndex: 1000,
//                 opacity: 0,
//                 pointerEvents: "auto",
//                 fontSize: "0.8rem",
//                 boxShadow: "0 0 12px rgba(255, 255, 255, 0.15)",
//               }}
//             >
//               <Card.Body className="px-3 py-2">
//                 <p className="text-white small mb-0">
//                   {`${screen.label} Profile On`}
//                 </p>
//               </Card.Body>
//             </Card>
//           </div>
//         </div>
//       ))}
      

//     </div>
//      <h1 className="mx-auto text-center text-white fw-bold mb-3 ">Automatic Profile Switching</h1>
//      <p
//        className="mx-auto text-white text-center mb-4"
//        style={{ maxWidth: "1000px" }}
//      >
// The mouse delivers a seamless experience by automatically detecting which application your cursor is on across wide or multi-monitor setups, and instantly switching to the corresponding profile.
//      </p>

//      </div>
//   );
// }

// export default MultiScreen;












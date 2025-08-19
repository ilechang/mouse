import React, { useEffect, useRef, useState } from "react";
import { Card } from "react-bootstrap";
import gsap from "gsap";

function MultiScreen({ setHoveredProfile }) {
  const screens = [
    { label: "Standard", profileKey: "standard", imgSrc: "/google.png", transformStyle: "rotateY(15deg) scale(0.8)", marginStyle: { marginRight: "clamp(-100px, -8vw, -40px)" }, widthClamp: "clamp(600px, 50vw, 700px)" },
    { label: "Photoshop", profileKey: "photoshop", imgSrc: "/ps.jpg", transformStyle: "scale(0.9)", marginStyle: { margin: "0 clamp(4px, 1vw, 12px)" }, widthClamp: "clamp(500px, 37vw, 600px)" },
    { label: "VS Code", profileKey: "vscode", imgSrc: "/vscode.jpg", transformStyle: "rotateY(-15deg) scale(0.8)", marginStyle: { marginLeft: "clamp(-100px, -8vw, -40px)" }, widthClamp: "clamp(600px, 50vw, 700px)" },
  ];

  // 分開控制：hovered 控藍光；showCard 控卡片與 top.png
  const [hovered, setHovered] = useState(() => screens.map(() => false));
  const [showCard, setShowCard] = useState(() => screens.map(() => false));

  const cardRefs = useRef(screens.map(() => React.createRef()));
  const hideTimers = useRef(screens.map(() => null));

  useEffect(() => {
    cardRefs.current.forEach((ref) => {
      gsap.set(ref.current, {
        opacity: 0,
        y: 20,
        x: 20,
        scale: 0.8,
        transformOrigin: "bottom right",
      });
    });
  }, []);

  // 只對卡片做顯示/隱藏動畫
  useEffect(() => {
    showCard.forEach((visible, i) => {
      const ref = cardRefs.current[i];
      if (!ref.current) return;
      gsap.to(ref.current, {
        opacity: visible ? 1 : 0,
        y: visible ? 0 : 20,
        x: visible ? 0 : 20,
        scale: visible ? 1 : 0.8,
        duration: 0.3,
        ease: "power2.out",
      });
    });
  }, [showCard]);

  const clearTimer = (i) => {
    if (hideTimers.current[i]) {
      clearTimeout(hideTimers.current[i]);
      hideTimers.current[i] = null;
    }
  };

  const handleMouseEnter = (i) => {
    // 藍光立刻打開
    setHovered((prev) => prev.map((v, idx) => (idx === i ? true : v)));

    // 卡片立刻顯示，並在 3 秒後自動關閉
    clearTimer(i);
    setShowCard((prev) => prev.map((v, idx) => (idx === i ? true : v)));
    hideTimers.current[i] = setTimeout(() => {
      setShowCard((prev) => prev.map((v, idx) => (idx === i ? false : v)));
    }, 1200);

    if (setHoveredProfile) setHoveredProfile(screens[i].profileKey);
  };

  const handleMouseLeave = (i) => {
    // 藍光關閉
    setHovered((prev) => prev.map((v, idx) => (idx === i ? false : v)));
    // 卡片與 top.png 立刻關閉
    clearTimer(i);
    setShowCard((prev) => prev.map((v, idx) => (idx === i ? false : v)));

    if (setHoveredProfile) setHoveredProfile(null);
  };

  return (
    <div   style={{

      backgroundColor: "rgb(31,31,31)",
      padding: "0rem 0rem 4rem 0rem",
   
    }}>
    <div
      style={{
        position: "relative",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        gap: "0rem",
        backgroundColor: "rgb(31,31,31)",
        padding: "0rem 0rem 0rem 0rem",
        flexWrap: "nowrap",
      }}
    >
      {screens.map((screen, i) => (
        <div key={screen.label} style={{ perspective: "1200px" }}>
          <div
            onMouseEnter={() => handleMouseEnter(i)}
            onMouseLeave={() => handleMouseLeave(i)}
            style={{
              ...screen.marginStyle,
              transform: screen.transformStyle,
              position: "relative",
              zIndex: hovered[i] ? 200 : 1,
              // 藍光由 hovered 控制（滑鼠不離開就不消失）
              boxShadow: hovered[i]
                ? "0 0 20px 5px rgba(0, 123, 255, 0.9)"
                : "none",
              transition: "box-shadow 0.3s ease, z-index 0s",
              cursor: "pointer",
            }}
          >
            <img src={screen.imgSrc} alt={screen.label} style={{ width: screen.widthClamp, display: "block" }} />

            {/* top.png 跟卡片同壽命：showCard 才顯示 */}
            {showCard[i] && (
              <img
                src="/top.png"
                alt="trigger base"
                style={{
                  position: "absolute",
                  bottom: "0.5rem",
                  right: "0.5rem",
                  width: "5%",
                  zIndex: 1001,
                  pointerEvents: "none",
                }}
              />
            )}

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
                pointerEvents: "auto",
                fontSize: "0.8rem",
                boxShadow: "0 0 12px rgba(255, 255, 255, 0.15)",
              }}
            >
              <Card.Body className="px-3 py-2">
                <p className="text-white small mb-0">
                  {`${screen.label} Profile On`}
                </p>
              </Card.Body>
            </Card>
          </div>
        </div>
      ))}
      

    </div>
     <h1 className="mx-auto text-center text-white fw-bold mb-3 ">Automatic Profile Switching</h1>
     <p
       className="mx-auto text-white text-center mb-4"
       style={{ maxWidth: "1000px" }}
     >
The mouse delivers a seamless experience by automatically detecting which application your cursor is on across wide or multi-monitor setups, and instantly switching to the corresponding profile.
     </p>

     </div>
  );
}

export default MultiScreen;
















// import React, { useEffect, useRef, useState } from "react";
// import { Card, Form } from "react-bootstrap";
// import gsap from "gsap";

// function MultiScreen({ setHoveredProfile }) {
//   const screens = [
//     {
//       label: "Standard",
//       profileKey: "standard",
//       imgSrc: "/google.png",
//       transformStyle: "rotateY(15deg) scale(0.8)",
//       // 讓 Google 更貼近左邊（右邊界更負）
//       marginStyle: { marginRight: "clamp(-100px, -8vw, -40px)" }, // ✅ min < preferred < max
//       widthClamp: "clamp(600px, 50vw, 700px)",
//     },
//     {
//       label: "Photoshop",
//       profileKey: "photoshop",
//       imgSrc: "/ps.jpg",
//       transformStyle: "scale(0.9)",
//       // 中間幾乎無縫，兩側只留一點點
//       marginStyle: { margin: "0 clamp(4px, 1vw, 12px)" }, // ✅ 小而正的間距
//       widthClamp: "clamp(500px, 37vw, 600px)",
//     },
//     {
//       label: "VS Code",
//       profileKey: "vscode",
//       imgSrc: "/vscode.jpg",
//       transformStyle: "rotateY(-15deg) scale(0.8)",
//       // 讓 VS Code 更貼近中間（左邊界更負）
//       marginStyle: { marginLeft: "clamp(-100px, -8vw, -40px)" }, // ✅ min < preferred < max
//       widthClamp: "clamp(600px, 50vw, 700px)",
//     },
//   ];

//   const [visible, setVisible] = useState(() => screens.map(() => false));
//   const cardRefs = useRef(screens.map(() => React.createRef()));
//   const timeoutRefs = useRef(screens.map(() => null));

//   // 初始動畫設定
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

//   // 出現動畫
//   useEffect(() => {
//     visible.forEach((isVisible, i) => {
//       const ref = cardRefs.current[i];
//       if (!ref.current) return;

//       gsap.to(ref.current, {
//         opacity: isVisible ? 1 : 0,
//         y: isVisible ? 0 : 20,
//         x: isVisible ? 0 : 20,
//         scale: isVisible ? 1 : 0.8,
//         duration: 0.3,
//         ease: "power2.out",
//       });
//     });
//   }, [visible]);

//   const toggleCard = (index, show) => {
//     clearTimeout(timeoutRefs.current[index]);
//     setVisible((prev) => prev.map((v, i) => (i === index ? show : v)));
//   };

//   const autoHideCard = (index) => {
//     toggleCard(index, true);
//     timeoutRefs.current[index] = setTimeout(() => toggleCard(index, false), 1800);
//   };

//   const handleMouseEnter = (index) => {
//     autoHideCard(index);
//     if (setHoveredProfile) {
//       setHoveredProfile(screens[index].profileKey); // google -> standard
//     }
//   };

//   const handleMouseLeave = (index) => {
//     toggleCard(index, false);
//     if (setHoveredProfile) setHoveredProfile(null);
//   };

//   return (
//     <div
//       style={{
//         position: "relative",
//         display: "flex",                 // 三張 inline 並排
//         justifyContent: "center",
//         alignItems: "center",
//         gap: "0rem",
//         backgroundColor: "rgb(31,31,31)",
//         padding: "0rem 0rem 6rem 0rem", // 上下留空間讓卡片不會被擋住
//         flexWrap: "nowrap",
//       }}
//     >
//       {screens.map((screen, i) => (
//         <div
//           key={screen.label}
//           style={{ perspective: "1200px" }}
//         >
//           <div
//             onMouseEnter={() => handleMouseEnter(i)}
//             onMouseLeave={() => handleMouseLeave(i)}
//             style={{
//               ...screen.marginStyle,
//               transform: screen.transformStyle,
//               position: "relative",
//               // 讓被 hover 的那張整個 wrapper 提到最上層，避免被中間圖擋住（VS Code 卡片消失的元凶）
//               zIndex: visible[i] ? 200 : 1,
//               boxShadow: visible[i]
//                 ? "0 0 20px 5px rgba(0, 123, 255, 0.9)"
//                 : "none",
//               transition: "box-shadow 0.3s ease, z-index 0s",
//               cursor: "pointer",
//             }}
//           >
//             <img
//               src={screen.imgSrc}
//               alt={screen.label}
//               style={{
//                 width: screen.widthClamp,   // 各自的放大尺寸
//                 display: "block",
//               }}
//             />

//             <img
//               src="/top.png"
//               alt="trigger base"
//               style={{
//                 position: "absolute",
//                 bottom: "0.5rem",
//                 right: "0.5rem",
//                 width: "5%",
//                 zIndex: 1001,
//                 pointerEvents: "none",
//               }}
//             />

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
//                 zIndex: 1000,               // 卡片本身再更高一點以保險
//                 opacity: 0,                 // 由 GSAP 控制顯示
//                 pointerEvents: "auto",
//                 fontSize: "0.8rem",         // ✨ 字體縮小
//                 boxShadow: "0 0 12px rgba(255, 255, 255, 0.15)", // ✨ 白色陰影
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
//   );
// }

// export default MultiScreen;



















// import React, { useEffect, useRef, useState } from "react";
// import { Card, Form } from "react-bootstrap";
// import gsap from "gsap";

// function MultiScreen({ setHoveredProfile }) {
//   // 新增 profileKey，讓 Google 對應到 'standard'
//   const screens = [
//     {
//       label: "Photoshop",
//       profileKey: "photoshop",
//       imgSrc: "/ps.jpg",
//       transformStyle: "rotateY(15deg) scale(0.85)",
//       marginStyle: { marginRight: "clamp(-40px, -5vw, -50px)" },
//       zIndex: 1,
//     },
//     {
//       label: "Google",
//       profileKey: "standard",              // ← hover 到它時要變成 standard
//       imgSrc: "/google.png",               // 你說 src="./google.png"；若放 public 建議用絕對路徑 /google.png
//       transformStyle: "none",              // 正的
//       marginStyle: { margin: "0 clamp(8px, 2vw, 24px)" },
//       zIndex: 2,                           // 置中、在上層
//     },
//     {
//       label: "VS Code",
//       profileKey: "vscode",
//       imgSrc: "/vscode.jpg",
//       transformStyle: "rotateY(-15deg) scale(0.85)",
//       marginStyle: { marginLeft: "clamp(-40px, -5vw, -50px)" },
//       zIndex: 1,
//     },
//   ];

//   const [visible, setVisible] = useState(() => screens.map(() => false));
//   const cardRefs = useRef(screens.map(() => React.createRef()));
//   const timeoutRefs = useRef(screens.map(() => null));

//   // 初始動畫設定
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

//   // 出現動畫
//   useEffect(() => {
//     visible.forEach((isVisible, i) => {
//       const ref = cardRefs.current[i];
//       if (!ref.current) return;

//       gsap.to(ref.current, {
//         opacity: isVisible ? 1 : 0,
//         y: isVisible ? 0 : 20,
//         x: isVisible ? 0 : 20,
//         scale: isVisible ? 1 : 0.8,
//         duration: 0.3,
//         ease: "power2.out",
//       });
//     });
//   }, [visible]);

//   const toggleCard = (index, show) => {
//     clearTimeout(timeoutRefs.current[index]);
//     setVisible((prev) => prev.map((v, i) => (i === index ? show : v)));
//   };

//   const autoHideCard = (index) => {
//     toggleCard(index, true);
//     timeoutRefs.current[index] = setTimeout(() => toggleCard(index, false), 1800);
//   };

//   const handleMouseEnter = (index) => {
//     autoHideCard(index);
//     if (setHoveredProfile) {
//       // 用 profileKey（Google → 'standard'）
//       setHoveredProfile(screens[index].profileKey);
//     }
//   };

//   const handleMouseLeave = (index) => {
//     toggleCard(index, false);
//     if (setHoveredProfile) setHoveredProfile(null);
//   };

//   return (
//     <div
//       style={{
//         position: "relative",
//         display: "flex",
//         alignItems: "center",     // 垂直置中
//         justifyContent: "center", // 水平置中
//         gap: "2rem",
//         backgroundColor: "rgb(31,31,31)",
//         padding: "2rem 1rem",
//         flexWrap: "wrap",
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
//               zIndex: screen.zIndex,
//               boxShadow: visible[i]
//                 ? "0 0 20px 5px rgba(0, 123, 255, 0.9)"
//                 : "none",
//               transition: "box-shadow 0.3s ease",
//               cursor: "pointer",
//             }}
//           >
//             <img
//               src={screen.imgSrc}
//               alt={screen.label}
//               style={{
//                 width: "clamp(300px, 38vw, 820px)", // 中間圖也會自適應
//                 display: "block",
//               }}
//             />

//             <img
//               src="/top.png"
//               alt="trigger base"
//               style={{
//                 position: "absolute",
//                 bottom: "0.5rem",
//                 right: "0.5rem",
//                 width: "48px",
//                 zIndex: 999,
//                 pointerEvents: "none",
//               }}
//             />

//             <Card
//               ref={cardRefs.current[i]}
//               className="position-absolute text-white"
//               style={{
//                 bottom: 0,
//                 right: 0,
//                 width: "320px",
//                 backgroundColor: "rgb(51,51,51)",
//                 margin: "1rem",
//                 display: "flex",
//                 flexDirection: "column",
//                 maxHeight: "90%",
//                 zIndex: 100,
//                 opacity: 0,
//                 pointerEvents: "auto",
//               }}
//             >
//               <Card.Header className="bg-secondary py-2 px-3 d-flex justify-content-between align-items-center">
//                 <span className="small">{screen.label} Profile On</span>
//                 <span style={{ cursor: "pointer" }} onClick={() => toggleCard(i, false)}>
//                   ×
//                 </span>
//               </Card.Header>
//               <Card.Body className="px-3 py-2">
//                 <Form.Check
//                   type="checkbox"
//                   id={`dont-show-${screen.label.toLowerCase()}`}
//                   label="Don't show this again"
//                   className="text-white small"
//                 />
//               </Card.Body>
//             </Card>
//           </div>
//         </div>
//       ))}
//     </div>
//   );
// }

// export default MultiScreen;


















// import React, { useEffect, useRef, useState } from "react";
// import { Card, Form } from "react-bootstrap";
// import gsap from "gsap";

// function MultiScreen({ setHoveredProfile }) {
//   const screens = [
//     {
//       label: "Photoshop",
//       imgSrc: "/ps.jpg",
//       transformStyle: "rotateY(15deg) scale(0.85)",
//       marginStyle: { marginRight: "clamp(-40px, -5vw, -50px)" },
//     },
//     {
//       label: "vscode",
//       imgSrc: "/vscode.jpg",
//       transformStyle: "rotateY(-15deg) scale(0.85)",
//       marginStyle: { marginLeft: "clamp(-40px, -5vw, -50px)" },
//     },
//   ];

//   const [visible, setVisible] = useState(() => screens.map(() => false));
//   const cardRefs = useRef(screens.map(() => React.createRef()));
//   const timeoutRefs = useRef(screens.map(() => null));

//   // 初始動畫設定
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

//   // 出現動畫
//   useEffect(() => {
//     visible.forEach((isVisible, i) => {
//       const ref = cardRefs.current[i];
//       if (!ref.current) return;

//       gsap.to(ref.current, {
//         opacity: isVisible ? 1 : 0,
//         y: isVisible ? 0 : 20,
//         x: isVisible ? 0 : 20,
//         scale: isVisible ? 1 : 0.8,
//         duration: 0.3,
//         ease: "power2.out",
//       });
//     });
//   }, [visible]);

//   const toggleCard = (index, show) => {
//     clearTimeout(timeoutRefs.current[index]);
//     setVisible((prev) =>
//       prev.map((v, i) => (i === index ? show : v))
//     );
//   };

//   const autoHideCard = (index) => {
//     toggleCard(index, true);
//     timeoutRefs.current[index] = setTimeout(() => toggleCard(index, false), 1800);
//   };

//   const handleMouseEnter = (index) => {
//     autoHideCard(index);
//     if (setHoveredProfile) {
//       setHoveredProfile(screens[index].label.toLowerCase()); // e.g., 'photoshop'
//     }
//   };

//   const handleMouseLeave = (index) => {
//     toggleCard(index, false);
//     if (setHoveredProfile) {
//       setHoveredProfile(null);
//     }
//   };

//   return (
//     <div
//       style={{
//         position: "relative",
//         display: "flex",
//         justifyContent: "center",
//         gap: "2rem",
//         backgroundColor: "rgb(31,31,31)",
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
//               boxShadow: visible[i]
//                 ? "0 0 20px 5px rgba(0, 123, 255, 0.9)"
//                 : "none",
//               transition: "box-shadow 0.3s ease",
//             }}
//           >
//             <img
//               src={screen.imgSrc}
//               alt={screen.label}
//               style={{
//                 width: "clamp(300px, 48vw, 850px)",
//                 display: "block",
//               }}
//             />
//             <img
//               src="./top.png"
//               alt="trigger base"
//               style={{
//                 position: "absolute",
//                 bottom: "0.5rem",
//                 right: "0.5rem",
//                 width: "48px",
//                 zIndex: 999,
//                 pointerEvents: "none",
//               }}
//             />

//             <Card
//               ref={cardRefs.current[i]}
//               className="position-absolute text-white"
//               style={{
//                 bottom: 0,
//                 right: 0,
//                 width: "320px",
//                 backgroundColor: "rgb(51,51,51)",
//                 margin: "1rem",
//                 display: "flex",
//                 flexDirection: "column",
//                 maxHeight: "90%",
//                 zIndex: 100,
//                 opacity: 0,
//                 pointerEvents: "auto",
//               }}
//             >
//               <Card.Header className="bg-secondary py-2 px-3 d-flex justify-content-between align-items-center">
//                 <span className="small">{screen.label} Profile On</span>
//                 <span
//                   style={{ cursor: "pointer" }}
//                   onClick={() => toggleCard(i, false)}
//                 >
//                   ×
//                 </span>
//               </Card.Header>
//               <Card.Body className="px-3 py-2">
//                 <Form.Check
//                   type="checkbox"
//                   id={`dont-show-${screen.label.toLowerCase()}`}
//                   label="Don't show this again"
//                   className="text-white small"
//                 />
//               </Card.Body>
//             </Card>
//           </div>
//         </div>
//       ))}
//     </div>
//   );
// }

// export default MultiScreen;




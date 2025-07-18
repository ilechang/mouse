// import React, { useRef } from "react";

// function MacroProfile() {
//   const triggerImgRef = useRef(null);

//   return (
//     <div style={{ position: "relative", display: "flex", justifyContent: "center" }}>
//       {/* ✅ 圖片組一 */}
//       <div
//         style={{
//           display: "flex",
//           justifyContent: "center",
//           alignItems: "center",
//           perspective: "1200px",
//           flexWrap: "wrap",
//         }}
//       >
//         <div
//           style={{
//             transform: "rotateY(15deg) scale(0.85)",
//             transformStyle: "preserve-3d",
//             marginRight: "clamp(-40px, -5vw, -50px)",
//           }}
//         >
//           <img
//             src="/ps.jpg"
//             alt="PS"
//             style={{
//               width: "clamp(300px, 48vw, 850px)",
//               display: "block",
//             }}
//           />

//           {/* ✅ 固定在角落的 top.png */}
//           <img
//             ref={triggerImgRef}
//             src="./top.png"
//             alt="trigger base"
//             style={{
//               position: "absolute",
//               bottom: "0.5rem",
//               right: "0.5rem",
//               width: "48px",
//               opacity: 1,
//               zIndex: 999,
//               pointerEvents: "none",
//             }}
//           />
//         </div>
//       </div>


//       {/* ✅ 圖片組二 */}
//       <div
//         style={{
//           display: "flex",
//           justifyContent: "center",
//           alignItems: "center",
//           perspective: "1200px",
//           flexWrap: "wrap",
//         }}
//       >
//         <div
//           style={{
//             transform: "rotateY(-15deg) scale(0.85)",
//             transformStyle: "preserve-3d",
//             marginLeft: "clamp(-40px, -5vw, -50px)",
//           }}
//         >
//           <img
//             src="/rhino.jpg"
//             alt="Rhino"
//             style={{
//               width: "clamp(300px, 48vw, 850px)",
//               display: "block",
//             }}
//           />
//           {/* ✅ 固定在角落的 top.png */}
//           <img
//             ref={triggerImgRef}
//             src="./top.png"
//             alt="trigger base"
//             style={{
//               position: "absolute",
//               bottom: "0.5rem",
//               right: "0.5rem",
//               width: "48px",
//               opacity: 1,
//               zIndex: 999,
//               pointerEvents: "none",
//             }}
//           />
//         </div>
//       </div>


//     </div>
//   );
// }

// export default MacroProfile;




















import React, { useEffect, useRef, useState } from "react";
import { Card, Form } from "react-bootstrap";
import gsap from "gsap";

function MacroProfile() {
  const [showPs, setShowPs] = useState(false);
  const [showRhino, setShowRhino] = useState(false);
  const psCardRef = useRef(null);
  const rhinoCardRef = useRef(null);
  const psTimeout = useRef(null);
  const rhinoTimeout = useRef(null);

  // 初始設定位移與透明
  useEffect(() => {
    gsap.set(psCardRef.current, {
      opacity: 0,
      y: 20,
      x: 20,
      scale: 0.8,
      transformOrigin: "bottom right",
    });
    gsap.set(rhinoCardRef.current, {
      opacity: 0,
      y: 20,
      x: 20,
      scale: 0.8,
      transformOrigin: "bottom right",
    });
  }, []);

  // Photoshop 動畫
  useEffect(() => {
    if (!psCardRef.current) return;
    gsap.to(psCardRef.current, {
      opacity: showPs ? 1 : 0,
      y: showPs ? 0 : 20,
      x: showPs ? 0 : 20,
      scale: showPs ? 1 : 0.8,
      duration: 0.3,
      ease: "power2.out",
    });
  }, [showPs]);

  // Rhino 動畫
  useEffect(() => {
    if (!rhinoCardRef.current) return;
    gsap.to(rhinoCardRef.current, {
      opacity: showRhino ? 1 : 0,
      y: showRhino ? 0 : 20,
      x: showRhino ? 0 : 20,
      scale: showRhino ? 1 : 0.8,
      duration: 0.3,
      ease: "power2.out",
    });
  }, [showRhino]);

  // 共用圖片卡片區塊
  const renderImageBlock = ({
    label,
    imgSrc,
    cardRef,
    show,
    setShow,
    timeoutRef,
    transformStyle,
  }) => (
    <div style={{ perspective: "1200px" }}>
      <div
        onMouseEnter={() => {
          clearTimeout(timeoutRef.current);
          setShow(true);
          timeoutRef.current = setTimeout(() => setShow(false), 1500);
        }}
        onMouseLeave={() => {
          clearTimeout(timeoutRef.current);
          setShow(false);
        }}
        style={{
          transform: transformStyle,
          marginRight: label === "Photoshop" ? "clamp(-40px, -5vw, -50px)" : undefined,
          marginLeft: label === "Rhino" ? "clamp(-40px, -5vw, -50px)" : undefined,
          position: "relative",
          boxShadow: show ? "0 0 20px 5px rgba(0, 123, 255, 0.9)" : "none",
          transition: "box-shadow 0.3s ease",
        }}
      >
        <img
          src={imgSrc}
          alt={label}
          style={{
            width: "clamp(300px, 48vw, 850px)",
            display: "block",
          }}
        />
        <img
          src="./top.png"
          alt="trigger base"
          style={{
            position: "absolute",
            bottom: "0.5rem",
            right: "0.5rem",
            width: "48px",
            zIndex: 999,
            pointerEvents: "none",
          }}
        />

        {/* 卡片 */}
        <Card
          ref={cardRef}
          className="position-absolute text-white"
          style={{
            bottom: 0,
            right: 0,
            width: "320px",
            backgroundColor: "rgb(51,51,51)",
            margin: "1rem",
            display: "flex",
            flexDirection: "column",
            maxHeight: "90%",
            zIndex: 100,
            opacity: 0,
            pointerEvents: "auto",
          }}
        >
          <Card.Header className="bg-secondary py-2 px-3 d-flex justify-content-between align-items-center">
            <span className="small">{label} Profile On</span>
            <span style={{ cursor: "pointer" }} onClick={() => setShow(false)}>×</span>
          </Card.Header>
          <Card.Body className="px-3 py-2">
            <Form.Check
              type="checkbox"
              id={`dont-show-${label.toLowerCase()}`}
              label="Don't show this again"
              className="text-white small"
            />
          </Card.Body>
        </Card>
      </div>
    </div>
  );

  return (
    <div
      style={{
        position: "relative",
        display: "flex",
        justifyContent: "center",
        gap: "2rem",
      }}
    >
      {renderImageBlock({
        label: "Photoshop",
        imgSrc: "/ps.jpg",
        cardRef: psCardRef,
        show: showPs,
        setShow: setShowPs,
        timeoutRef: psTimeout,
        transformStyle: "rotateY(15deg) scale(0.85)",
      })}
      {renderImageBlock({
        label: "Rhino",
        imgSrc: "/rhino.jpg",
        cardRef: rhinoCardRef,
        show: showRhino,
        setShow: setShowRhino,
        timeoutRef: rhinoTimeout,
        transformStyle: "rotateY(-15deg) scale(0.85)",
      })}
    </div>
  );
}

export default MacroProfile;

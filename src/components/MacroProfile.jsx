import React, { useRef } from "react";

function MacroProfile() {
  const triggerImgRef = useRef(null);

  return (
    <div style={{ position: "relative", display: "flex", justifyContent: "center" }}>
      {/* ✅ 圖片組一 */}
      <div
        style={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          perspective: "1200px",
          flexWrap: "wrap",
        }}
      >
        <div
          style={{
            transform: "rotateY(15deg) scale(0.85)",
            transformStyle: "preserve-3d",
            marginRight: "clamp(-40px, -5vw, -50px)",
          }}
        >
          <img
            src="/ps.jpg"
            alt="PS"
            style={{
              width: "clamp(300px, 48vw, 850px)",
              display: "block",
            }}
          />

          {/* ✅ 固定在角落的 top.png */}
          <img
            ref={triggerImgRef}
            src="./top.png"
            alt="trigger base"
            style={{
              position: "absolute",
              bottom: "0.5rem",
              right: "0.5rem",
              width: "48px",
              opacity: 1,
              zIndex: 999,
              pointerEvents: "none",
            }}
          />
        </div>
      </div>

      {/* ✅ 圖片組二 */}
      <div
        style={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          perspective: "1200px",
          flexWrap: "wrap",
        }}
      >
        <div
          style={{
            transform: "rotateY(-15deg) scale(0.85)",
            transformStyle: "preserve-3d",
            marginLeft: "clamp(-40px, -5vw, -50px)",
          }}
        >
          <img
            src="/rhino.jpg"
            alt="Rhino"
            style={{
              width: "clamp(300px, 48vw, 850px)",
              display: "block",
            }}
          />
          {/* ✅ 固定在角落的 top.png */}
          <img
            ref={triggerImgRef}
            src="./top.png"
            alt="trigger base"
            style={{
              position: "absolute",
              bottom: "0.5rem",
              right: "0.5rem",
              width: "48px",
              opacity: 1,
              zIndex: 999,
              pointerEvents: "none",
            }}
          />
        </div>
      </div>


    </div>
  );
}

export default MacroProfile;

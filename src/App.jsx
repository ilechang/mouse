import { useRef, useState, useEffect } from "react";
import Jumbotron from "./components/Jumbotron";
import WorkSection from "./components/WorkSection";
import GameSection from "./components/GameSection";
import MultiScreen from "./components/MultiScreen";
import Research from "./components/Research.jsx";
import R3FViewer from "./components/R3FViewer";
import { AiSimulation } from "./components/AiSimulation";
import '@fortawesome/fontawesome-free/css/all.min.css';
import MouseMacroPage from "./components/MouseMacroPage";
import PhysicalFeatures from "./components/PhysicalFeatures";
import AdjustableWidth from "./components/AdjustableWidth";
import 'bootstrap/dist/css/bootstrap.min.css';

function App() {
  const webgiViewerRef = useRef();

  // 判斷裝置是否為手機/平板
  const [isMobileOrTablet, setIsMobileOrTablet] = useState(false);

  useEffect(() => {
    const checkSize = () => {
      setIsMobileOrTablet(window.innerWidth <= 1150); 
      // 這裡 1150 可依需求調整，通常 < 1024/768 就算平板或手機
    };

    checkSize();
    window.addEventListener("resize", checkSize);
    return () => window.removeEventListener("resize", checkSize);
  }, []);

  const [hoveredProfile, setHoveredProfile] = useState(null);
  const [committedProfile, setCommittedProfile] = useState("lol");

  const handlePreview = () => {
    if (webgiViewerRef.current) {
      webgiViewerRef.current.triggerPreview();
    }
  };

  return (
    <>
      <div className="App">
        <div id="content">
          <Jumbotron />
          <WorkSection />
          <GameSection triggerPreview={handlePreview} />
        </div>

        {/* ✅ 只有在桌機才載入 R3FViewer */}
        {!isMobileOrTablet && (
          <R3FViewer
            ref={webgiViewerRef}
            style={{
              position: "absolute",
              top: 0,
              left: 0,
              width: "100%",
              height: "100%",
              zIndex: 0,
              pointerEvents: "none",
            }}
          />
        )}
      </div>

      <Research />
      <PhysicalFeatures />
      <AdjustableWidth />

      <div style={{ position: "relative", zIndex: 2000 }}>
        <MouseMacroPage
          hoveredProfile={hoveredProfile}
          committedProfile={committedProfile}
        />
        <MultiScreen setHoveredProfile={setHoveredProfile} />
        <AiSimulation />
      </div>
    </>
  );
}

export default App;












// import Jumbotron from "./components/Jumbotron";
// import WorkSection from "./components/WorkSection";
// import GameSection from "./components/GameSection";
// import MultiScreen from "./components/MultiScreen";
// import Research from "./components/Research.jsx";
// import R3FViewer from "./components/R3FViewer";
// import { AiSimulation } from "./components/AiSimulation";

// import MouseMacroPage from "./components/MouseMacroPage";
// import PhysicalFeatures from "./components/PhysicalFeatures";
// import AdjustableWidth from "./components/AdjustableWidth";
// import 'bootstrap/dist/css/bootstrap.min.css';
// import { useRef, useState } from "react";

// function App() {
//   const webgiViewerRef = useRef();

//   // ⬇️ 新增 shared hover state
//   const [hoveredProfile, setHoveredProfile] = useState(null);
//   const [committedProfile, setCommittedProfile] = useState("lol");

//   const handlePreview = () => {
//     webgiViewerRef.current.triggerPreview();
//   };

//   return (
//     <>
//       <div className="App">
//         <div id="content" >
//           <Jumbotron />
//           <WorkSection />
//           <GameSection triggerPreview={handlePreview} />
//         </div>
//         <R3FViewer
//   ref={webgiViewerRef}
//   style={{
//     position: "absolute",
//     top: 0,
//     left: 0,
//     width: "100%",
//     height: "100%",
//     zIndex: 0,
//     pointerEvents: "none"
//   }}
// />
//       </div>

//       <Research />
//       <PhysicalFeatures />
//       <AdjustableWidth />

//       <div style={{ position: "relative", zIndex: 2000 }}>
//         {/* 傳 hoveredProfile 和 setter */}
//         < MouseMacroPage
//         hoveredProfile={hoveredProfile}
//         committedProfile={committedProfile}
//       />
//         <MultiScreen
//           setHoveredProfile={setHoveredProfile}
//         />
//         <AiSimulation />
//       </div>
//     </>
//   );
// }

// export default App;






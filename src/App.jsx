








import Jumbotron from "./components/Jumbotron";
import WorkSection from "./components/WorkSection";
import GameSection from "./components/GameSection";
import MultiScreen from "./components/MultiScreen";
import Research from "./components/Research.jsx";
import R3FViewer from "./components/R3FViewer";
import { AiSimulation } from "./components/AiSimulation";

import MouseMacroPage from "./components/MouseMacroPage";
import PhysicalFeatures from "./components/PhysicalFeatures";
import AdjustableWidth from "./components/AdjustableWidth";
import 'bootstrap/dist/css/bootstrap.min.css';
import { useRef, useState } from "react";

function App() {
  const webgiViewerRef = useRef();

  // ⬇️ 新增 shared hover state
  const [hoveredProfile, setHoveredProfile] = useState(null);
  const [committedProfile, setCommittedProfile] = useState("standard");

  const handlePreview = () => {
    webgiViewerRef.current.triggerPreview();
  };

  return (
    <>
      <div className="App">
        <div id="content">
          <Jumbotron />
          <WorkSection />
          <GameSection triggerPreview={handlePreview} />
        </div>
        <R3FViewer ref={webgiViewerRef} />
      </div>

      <Research />
      <PhysicalFeatures />
      <AdjustableWidth />

      <div style={{ position: "relative", zIndex: 2000 }}>
        {/* 傳 hoveredProfile 和 setter */}
        < MouseMacroPage
        hoveredProfile={hoveredProfile}
        committedProfile={committedProfile}
      />
        <MultiScreen
          setHoveredProfile={setHoveredProfile}
        />
        <AiSimulation />
      </div>
    </>
  );
}

export default App;






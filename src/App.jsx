import Jumbotron from "./components/Jumbotron";
import WorkSection from "./components/WorkSection";
import GameSection from "./components/GameSection";
import MultiScreen from "./components/MultiScreen";
import Research from "./components/Research.jsx";
import R3FViewer from "./components/R3FViewer";
import { AiSimulation } from "./components/AiSimulation";
import { useRef } from "react";
import MouseMacroPage from "./components/MouseMacroPage";
import PhysicalFeatures from "./components/PhysicalFeatures";
import AdjustableWidth from "./components/AdjustableWidth";
import 'bootstrap/dist/css/bootstrap.min.css';


function App() {
  const webgiViewerRef = useRef();


  const handlePreview = () => {
    webgiViewerRef.current.triggerPreview();
  };

  return (<>
    <div className="App">
      <div id="content">
        <Jumbotron />
        <WorkSection />
        {/* <div className="buffer-section" style={{ height: '30vh' }} /> */}
        <GameSection triggerPreview={handlePreview} />
      </div>
      <R3FViewer ref={webgiViewerRef} />
    </div>
    <Research />
    <PhysicalFeatures />
    <AdjustableWidth />

    <MouseMacroPage />

    <MultiScreen />
    <AiSimulation />

  </>
  );
}

export default App;













// import Nav from "./components/Nav";
// import Jumbotron from "./components/Jumbotron";
// import SoundSection from "./components/SoundSection";
// import DisplaySection from "./components/DisplaySection";
// import MouseMacroPage from "./components/MouseMacroPage";
// import MultiScreen from "./components/MultiScreen";
// import R3FViewer from "./components/R3FViewer";
// import { AiSimulation } from "./components/AiSimulation";
// import { useRef } from "react";
// import 'bootstrap/dist/css/bootstrap.min.css';

// function App() {
//   const webgiViewerRef = useRef();


//   const handlePreview = () => {
//     webgiViewerRef.current.triggerPreview();
//   };

//   return (<>


//     <MouseMacroPage />
//     {/* <MultiScreen /> */}
//   </>
//   );
// }

// export default App;





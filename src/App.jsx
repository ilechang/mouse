import Nav from "./components/Nav";
import Jumbotron from "./components/Jumbotron";
import SoundSection from "./components/SoundSection";
import DisplaySection from "./components/DisplaySection";
import MacroProfile from "./components/MacroProfile";
import R3FViewer from "./components/R3FViewer";
import { AiSimulation } from "./components/AiSimulation";
import { useRef } from "react";
import 'bootstrap/dist/css/bootstrap.min.css';

function App() {
  const webgiViewerRef = useRef();
 

  const handlePreview = () => {
    webgiViewerRef.current.triggerPreview();
  };

  return (<>
    <div className="App">
      <div  id="content">
        <Nav />
        <Jumbotron />
        <SoundSection />

        {/* 🔴 新增測試區塊 */}
        {/* <div className="test" style={{ backgroundColor: 'red', height: '100vh' }}>
          <h2 style={{ color: 'white', textAlign: 'center', paddingTop: '40vh' }}>
            這是紅色測試區塊
          </h2>
        </div> */}

        <DisplaySection triggerPreview={handlePreview} />
      </div>
{/* 
      <R3FViewer ref={webgiViewerRef} />  */}
    </div>
    <AiSimulation /> 

        <MacroProfile />   
        </>
  );
}

export default App;





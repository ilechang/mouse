// src/components/R3FViewer.jsx
import React, {
  useRef,
  useEffect,
  useImperativeHandle,
  forwardRef,
  useState,
} from 'react';
import { Canvas } from '@react-three/fiber';
import { OrbitControls, useGLTF, PerspectiveCamera } from '@react-three/drei';
import { ScrollAnimation } from './ScrollAnimation';



//child
const Scene = forwardRef(({ setPreviewMode, isMobile }, ref) => {
  const gltf = useGLTF('/112233.glb');
  const cameraRef = useRef();
  const controlsRef = useRef();

  //設定在jombotron的camera位置
  useImperativeHandle(ref, () => ({
    triggerPreview() {
      setPreviewMode(true);
      cameraRef.current.position.set(13.04, -2, 2.29);
      controlsRef.current.target.set(0.11, 0.0, 0.0);
      controlsRef.current.enabled = false;
      controlsRef.current.update();
    },
    exitPreview() {
      setPreviewMode(false);
      controlsRef.current.enabled = false;
    },
  }
  ));

  return (
    <>
      <PerspectiveCamera
        makeDefault
        ref={cameraRef}
        position={[1.56, 5.0, 0.01]}
        fov={45}
      />
      <OrbitControls ref={controlsRef} enabled={false} enableZoom={false} />
      <primitive object={gltf.scene} />
      <ambientLight intensity={0.4} />
      <directionalLight position={[10, 10, 10]} intensity={1.5} />
      <ScrollAnimation
        cameraRef={cameraRef}
        controlsRef={controlsRef}
        isMobile={isMobile}
      />
    </>
  );
});






//parent

const R3FViewer = forwardRef((props, ref) => {
  const viewerRef = useRef();
  const [previewMode, setPreviewMode] = useState(false);
  const isMobile = typeof window !== 'undefined' && window.innerWidth <= 768;

  useImperativeHandle(ref, () => ({
    triggerPreview: () => viewerRef.current?.triggerPreview(),
    exitPreview: () => viewerRef.current?.exitPreview(),
  }));

  useEffect(() => {
    const timer = setTimeout(() => {
      viewerRef.current?.triggerPreview();
    }, 300);
    return () => clearTimeout(timer);
  }, []);

  return (
    <div
      id="r3f-canvas-container"
      style={{
        pointerEvents: previewMode ? 'all' : 'none',
        position: 'fixed',
        top: 0,
        left: 0,
        width: '100vw',
        height: '100vh',
        zIndex: 0,
      }}
    >
      <Canvas>
        <Scene
          ref={viewerRef}
          setPreviewMode={setPreviewMode}
          isMobile={isMobile}
        />
      </Canvas>
    </div>
  );
});

export default R3FViewer;
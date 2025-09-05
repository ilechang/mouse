
import React, {
  useRef,
  useEffect,
  useImperativeHandle,
  forwardRef,
  useState,
  useMemo,
  Suspense,
} from "react";
import { Canvas } from "@react-three/fiber";
import {
  PerspectiveCamera,
  OrbitControls,
  useGLTF,
  Environment,
  Html,
} from "@react-three/drei";
import { SkeletonUtils } from "three-stdlib";
import { ScrollAnimation } from "./ScrollAnimation";
import "bootstrap/dist/css/bootstrap.min.css";

// ✅ Bootstrap Spinner Loader
const Loader = () => (
  <Html fullscreen>
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
        height: "100%",
       
      }}
    >
      <div
        className="spinner-border text-light"
        role="status"
        style={{ width: "3rem", height: "3rem" }}
      >
        <span className="visually-hidden">Loading...</span>
      </div>
      <p className="mt-3 text-white">Loading...</p>
    </div>
  </Html>
);

// ✅ 工具：深度複製材質
function cloneMaterialsDeep(group) {
  group.traverse((o) => {
    if (o.isMesh) {
      if (Array.isArray(o.material)) {
        o.material = o.material.map((m) => m?.clone());
      } else if (o.material) {
        o.material = o.material.clone();
      }
      const mats = Array.isArray(o.material) ? o.material : [o.material];
      mats.forEach((m) => {
        if (m) m.transparent = true;
      });
    }
  });
}

const Scene = forwardRef(({ setPreviewMode, isMobile }, ref) => {
  const gltf = useGLTF("/123.glb");
  const cameraRef = useRef();
  const controlsRef = useRef();

  const cloneA = useMemo(() => SkeletonUtils.clone(gltf.scene), [gltf.scene]);
  const cloneB = useMemo(() => {
    const c = SkeletonUtils.clone(gltf.scene);
    cloneMaterialsDeep(c);
    return c;
  }, [gltf.scene]);

  const modelRefA = useRef();
  const modelRefB = useRef();

  useImperativeHandle(ref, () => ({
    triggerPreview() {
      setPreviewMode(true);
      controlsRef.current.enabled = false;
      controlsRef.current.update();
    },
    exitPreview() {
      setPreviewMode(false);
      controlsRef.current.enabled = false;
    },
    getModels() {
      return { a: modelRefA.current, b: modelRefB.current };
    },
  }));

  return (
    <>
      <ambientLight intensity={0.3} />
      <PerspectiveCamera
        makeDefault
        ref={cameraRef}
        position={[1.56, 5.0, 0.01]}
        fov={45}
      />
      <OrbitControls ref={controlsRef} enabled={false} enableZoom={false} />

      {/* A：主模型 */}
      <group ref={modelRefA}>
        <primitive object={cloneA} />
      </group>

      {/* B：固定位置與旋轉 */}
      <group
        ref={modelRefB}
        position={[1.8, -0.2, 2.7]}
        rotation={[0.77, 2.49, -0.2]}
        scale={0.9}
      >
        <primitive object={cloneB} />
      </group>

      <Environment files="./quad.hdr" background={false} />
      <directionalLight position={[-10, 5, 5]} intensity={2} />

      <ScrollAnimation
        cameraRef={cameraRef}
        controlsRef={controlsRef}
        isMobile={isMobile}
        modelRef={modelRefA}
        modelRefB={modelRefB}
      />
    </>
  );
});

const R3FViewer = forwardRef((props, ref) => {
  const viewerRef = useRef();
  const [previewMode, setPreviewMode] = useState(false);
  const isMobile = typeof window !== "undefined" && window.innerWidth <= 1025;

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
        pointerEvents: previewMode ? "all" : "none",
        position: "fixed",
        top: isMobile ? 100 : 0,
        left: isMobile ? "-18.5%" : "-50%",
        width: "160vw",
        height: "100vh",
        zIndex: 100,
      }}
    >
      <Canvas>
        <Suspense fallback={<Loader />}>
          <Scene
            ref={viewerRef}
            setPreviewMode={setPreviewMode}
            isMobile={isMobile}
          />
        </Suspense>
      </Canvas>
    </div>
  );
});

export default R3FViewer;



















// // src/components/R3FViewer.jsx
// import React, {
//   useRef,
//   useEffect,
//   useImperativeHandle,
//   forwardRef,
//   useState,
//   useMemo,
// } from 'react';
// import { Canvas } from '@react-three/fiber';
// import {
//   PerspectiveCamera,
//   OrbitControls,
//   useGLTF,
//   Environment,
// } from '@react-three/drei';
// import { SkeletonUtils } from 'three-stdlib';
// import { ScrollAnimation } from './ScrollAnimation';

// // ✅ 工具：深度複製材質
// function cloneMaterialsDeep(group) {
//   group.traverse((o) => {
//     if (o.isMesh) {
//       if (Array.isArray(o.material)) {
//         o.material = o.material.map(m => m?.clone());
//       } else if (o.material) {
//         o.material = o.material.clone();
//       }
//       const mats = Array.isArray(o.material) ? o.material : [o.material];
//       mats.forEach(m => { if (m) m.transparent = true; });
//     }
//   });
// }

// const Scene = forwardRef(({ setPreviewMode, isMobile }, ref) => {

//   const gltf = useGLTF('/123.glb');
//   const cameraRef = useRef();
//   const controlsRef = useRef();

//   const cloneA = useMemo(() => SkeletonUtils.clone(gltf.scene), [gltf.scene]);
//   const cloneB = useMemo(() => {
//     const c = SkeletonUtils.clone(gltf.scene);
//     cloneMaterialsDeep(c);
//     return c;
//   }, [gltf.scene]);

//   const modelRefA = useRef();
//   const modelRefB = useRef();

//   useImperativeHandle(ref, () => ({
//     triggerPreview() {
//       setPreviewMode(true);
//       controlsRef.current.enabled = false;
//       controlsRef.current.update();
//     },
//     exitPreview() {
//       setPreviewMode(false);
//       controlsRef.current.enabled = false;
//     },
//     getModels() {
//       return { a: modelRefA.current, b: modelRefB.current };
//     },
//   }));

//   return (
//     <>
//   <ambientLight intensity={0.3} />
//       <PerspectiveCamera makeDefault ref={cameraRef} position={[1.56, 5.0, 0.01]} fov={45} />
//       <OrbitControls ref={controlsRef} enabled={false} enableZoom={false} />

//       {/* A：主模型 */}
//       <group ref={modelRefA} position={[0, 0, 0]} rotation={[0, 0, 0]} scale={1}>
//         <primitive object={cloneA} />
//       </group>

//       {/* B：硬編位置與旋轉 */}
//       <group
//         ref={modelRefB}
//         position={[1.8, -0.2, 2.7]}     // ✅ 固定位置
//         rotation={[0.77, 2.49, -0.2]}   // ✅ 固定旋轉
//         scale={0.9}
//       >
//         <primitive object={cloneB} />
//       </group>

//       <Environment files="./quad.hdr" background={false} />
//       <directionalLight position={[-10, 5, 5]} intensity={2} />

//       <ScrollAnimation
//         cameraRef={cameraRef}
//         controlsRef={controlsRef}
//         isMobile={isMobile}
//         modelRef={modelRefA}
//         modelRefB={modelRefB}
//       />
//     </>
//   );
// });



// const R3FViewer = forwardRef((props, ref) => {
//   const viewerRef = useRef();
//   const [previewMode, setPreviewMode] = useState(false);
//   const isMobile = typeof window !== 'undefined' && window.innerWidth <= 1025;

//   useImperativeHandle(ref, () => ({
//     triggerPreview: () => viewerRef.current?.triggerPreview(),
//     exitPreview: () => viewerRef.current?.exitPreview(),
//   }));

//   useEffect(() => {
//     const timer = setTimeout(() => {
//       viewerRef.current?.triggerPreview();
//     }, 300);
//     return () => clearTimeout(timer);
//   }, []);

//   return (
// <div
//   id="r3f-canvas-container"
//   style={{
//     pointerEvents: previewMode ? 'all' : 'none',
//     position: 'fixed',
//     top: isMobile ? 100 : 0,   // 
//     left: isMobile ?'-18.5%':'-50%',
//     width: '160vw',
//     height: '100vh',
//     zIndex: 100,
//   }}
// >
//       <Canvas>
//         <Scene ref={viewerRef} setPreviewMode={setPreviewMode} isMobile={isMobile} />
//       </Canvas>
//     </div>
//   );
// });

// export default R3FViewer;










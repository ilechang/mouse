// src/components/R3FViewer.jsx
import React, {
  useRef,
  useEffect,
  useImperativeHandle,
  forwardRef,
  useState,
  useMemo,
} from 'react';
import { Canvas } from '@react-three/fiber';
import {
  PerspectiveCamera,
  OrbitControls,
  useGLTF,
  Environment,
} from '@react-three/drei';
import { SkeletonUtils } from 'three-stdlib';
import { ScrollAnimation } from './ScrollAnimation';

// ✅ 工具：深度複製材質
function cloneMaterialsDeep(group) {
  group.traverse((o) => {
    if (o.isMesh) {
      if (Array.isArray(o.material)) {
        o.material = o.material.map(m => m?.clone());
      } else if (o.material) {
        o.material = o.material.clone();
      }
      const mats = Array.isArray(o.material) ? o.material : [o.material];
      mats.forEach(m => { if (m) m.transparent = true; });
    }
  });
}

const Scene = forwardRef(({ setPreviewMode, isMobile }, ref) => {

  const gltf = useGLTF('/123.glb');
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
      <PerspectiveCamera makeDefault ref={cameraRef} position={[1.56, 5.0, 0.01]} fov={45} />
      <OrbitControls ref={controlsRef} enabled={false} enableZoom={false} />

      {/* A：主模型 */}
      <group ref={modelRefA} position={[0, 0, 0]} rotation={[0, 0, 0]} scale={1}>
        <primitive object={cloneA} />
      </group>

      {/* B：硬編位置與旋轉 */}
      <group
        ref={modelRefB}
        position={[1.8, -0.2, 2.7]}     // ✅ 固定位置
        rotation={[0.77, 2.49, -0.2]}   // ✅ 固定旋轉
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

useGLTF.preload('/1122333.glb');

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
        left: '-50%',
        width: '160vw',
        height: '100vh',
        zIndex: 100,
      }}
    >
      <Canvas>
        <Scene ref={viewerRef} setPreviewMode={setPreviewMode} isMobile={isMobile} />
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
// import { useControls } from 'leva'; // ✅ Leva 控制面板

// // ✅ 工具：深度複製材質，讓 cloneB 可控制透明度等
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
//   const gltf = useGLTF('/1122333.glb');
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

//   // ✅ Leva 控制 cloneB 的位置與旋轉
//   const { posX, posY, posZ, rotX, rotY, rotZ } = useControls('CloneB', {
//     posX: { value: 2, min: -10, max: 10, step: 0.1 },
//     posY: { value: 0, min: -10, max: 10, step: 0.1 },
//     posZ: { value: -1, min: -10, max: 10, step: 0.1 },
//     rotX: { value: 0, min: -Math.PI, max: Math.PI, step: 0.01 },
//     rotY: { value: Math.PI / 6, min: -Math.PI, max: Math.PI, step: 0.01 },
//     rotZ: { value: 0, min: -Math.PI, max: Math.PI, step: 0.01 },
//   });

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
//       <PerspectiveCamera makeDefault ref={cameraRef} position={[1.56, 5.0, 0.01]} fov={45} />
//       <OrbitControls ref={controlsRef} enabled={false} enableZoom={false} />

//       {/* A：主模型 */}
//       <group ref={modelRefA} position={[0, 0, 0]} rotation={[0, 0, 0]} scale={1}>
//         <primitive object={cloneA} />
//       </group>

//       {/* B：可用 Leva 調整位置與旋轉 */}
//       <group
//         ref={modelRefB}
//         position={[posX, posY, posZ]}
//         rotation={[rotX, rotY, rotZ]}
//         scale={0.9}
//       >
//         <primitive object={cloneB} />
//       </group>

//       <Environment files="./quad.hdr" background={false} />
//       <directionalLight position={[-10, 5, 5]} intensity={0.5} />

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

// useGLTF.preload('/1122333.glb');

// const R3FViewer = forwardRef((props, ref) => {
//   const viewerRef = useRef();
//   const [previewMode, setPreviewMode] = useState(false);
//   const isMobile = typeof window !== 'undefined' && window.innerWidth <= 768;

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
//     <div
//       id="r3f-canvas-container"
//       style={{
//         pointerEvents: previewMode ? 'all' : 'none',
//         position: 'fixed',
//         top: 0,
//         left: '-42%',
//         width: '160vw',
//         height: '100vh',
//         zIndex: 100,
//       }}
//     >
//       <Canvas>
//         <Scene ref={viewerRef} setPreviewMode={setPreviewMode} isMobile={isMobile} />
//       </Canvas>
//     </div>
//   );
// });

// export default R3FViewer;

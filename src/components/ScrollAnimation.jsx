import { useEffect, useRef } from 'react';
import { useFrame } from '@react-three/fiber';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import * as THREE from 'three';

gsap.registerPlugin(ScrollTrigger);

export const ScrollAnimation = ({ cameraRef, controlsRef, isMobile, modelRef }) => {
  const cameraGroupRef = useRef();

  // ✅ 固定目標控制
  const targetControls = {
    targetX: 0,
    targetY: 1,
    targetZ: 0,
  };

  // ✅ 固定 Jumbotron camera 初始位置
  const jumbotron = {
    camX: 10, camY: -2, camZ: 0,
    targetX: 0.11, targetY: 0.0, targetZ: 0.0,
    rotX: 0.0, rotY: -0.8, rotZ: 0.0,
  };

  // ✅ 固定 Sound camera 位置
  const sound = {
    camX: -7, camY: -4, camZ: -4,
    targetX: -1, targetY: 0, targetZ: -2,
    rotX: 0, rotY: 0, rotZ: 0,
  };

  // ✅ 固定 Display camera 位置
  const display = {
    camX: isMobile ? 9.36 : -4,
    camY: isMobile ? 10.95 : 5,
    camZ: isMobile ? 0.09 : 0,
    targetX: isMobile ? -1.62 : -1,
    targetY: isMobile ? 0.02 : 0.0,
    targetZ: isMobile ? -0.06 : 0.0,
    rotX: 1.5, rotY: -2.6, rotZ: -0.3,
  };

  // ✅ 固定模型旋轉值
  const modelRotation = {
    x: -0.4,
    y: 0,
    z: -1,
  };

  useEffect(() => {
    if (!cameraRef.current || !controlsRef.current || !cameraGroupRef.current) return;

    cameraRef.current.position.set(jumbotron.camX, jumbotron.camY, jumbotron.camZ);
    controlsRef.current.target.set(jumbotron.targetX, jumbotron.targetY, jumbotron.targetZ);
    cameraGroupRef.current.rotation.set(jumbotron.rotX, jumbotron.rotY, jumbotron.rotZ);
    controlsRef.current.update();

    if (!cameraGroupRef.current.children.includes(cameraRef.current)) {
      cameraGroupRef.current.add(cameraRef.current);
    }

    const axesHelper = new THREE.AxesHelper(5);
    cameraRef.current.parent?.add(axesHelper);

    const labels = ['X', 'Y', 'Z'];
    const positions = [new THREE.Vector3(6, 0, 0), new THREE.Vector3(0, 6, 0), new THREE.Vector3(0, 0, 6)];

    positions.forEach((pos, i) => {
      const canvas = document.createElement('canvas');
      canvas.width = 256;
      canvas.height = 256;
      const ctx = canvas.getContext('2d');
      if (ctx) {
        ctx.fillStyle = 'red';
        ctx.font = '24px Arial';
        ctx.textAlign = 'center';
        ctx.textBaseline = 'middle';
        ctx.fillText(labels[i], 128, 128);
      }
      const texture = new THREE.CanvasTexture(canvas);
      const sprite = new THREE.Sprite(new THREE.SpriteMaterial({ map: texture }));
      sprite.scale.set(1, 1, 1);
      sprite.position.copy(pos);
      axesHelper.add(sprite);
    });

    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: '.jumbotron-section',
        start: 'top top',
        endTrigger: '.display-section',
        end: 'bottom bottom',
        scrub: 1.5,
        immediateRender: false,
      },
    });

    tl.to(cameraRef.current.position, {
      x: sound.camX, y: sound.camY, z: sound.camZ,
      onUpdate: () => controlsRef.current.update()
    });
    tl.to(controlsRef.current.target, {
      x: sound.targetX, y: sound.targetY, z: sound.targetZ,
      onUpdate: () => controlsRef.current.update()
    }, '<');
    tl.to(cameraGroupRef.current.rotation, {
      x: sound.rotX, y: sound.rotY, z: sound.rotZ
    }, '<');

    tl.to('.jumbotron-section', { opacity: 0 }, '<');
    tl.to('.sound-section-content', { opacity: 1 }, '<');
    tl.to('#r3f-canvas-container', { left: '-0%' }, '<');

    tl.to(cameraRef.current.position, {
      x: display.camX, y: display.camY, z: display.camZ,
      onUpdate: () => controlsRef.current.update()
    });
    tl.to(controlsRef.current.target, {
      x: display.targetX, y: display.targetY, z: display.targetZ,
      onUpdate: () => controlsRef.current.update()
    }, '<');
    tl.to(cameraGroupRef.current.rotation, {
      x: display.rotX, y: display.rotY, z: display.rotZ
    }, '<');

    tl.to('.display-section', { opacity: 1 }, '<');
    tl.to('#r3f-canvas-container', { left: '-50%' }, '<');
    gsap.timeline({
      scrollTrigger: {
        trigger: '.research',
        start: 'top+=250 bottom', // 當 .research 的 top 比 viewport 底部還低 100px 時觸發
        toggleActions: 'play none none reverse', // 或你原本的設定
      }
    }).to('#r3f-canvas-container', { opacity: 0, duration: 0.5 });
    
    
    if (modelRef?.current) {
      tl.to(modelRef.current.rotation, {
        x: modelRotation.x,
        y: modelRotation.y,
        z: modelRotation.z,
        duration: 0.5
      }, '<');
    }

    return () => {
      tl.kill();
      ScrollTrigger.getAll().forEach(t => t.kill());
      axesHelper.removeFromParent();
    };
  }, [cameraRef, controlsRef, isMobile, modelRef]);

  useFrame(() => {
    if (controlsRef.current) {
      controlsRef.current.target.set(
        targetControls.targetX,
        targetControls.targetY,
        targetControls.targetZ
      );
      controlsRef.current.update();
    }
  });

  return <group ref={cameraGroupRef} />;
};


















// import { useEffect, useRef } from 'react';
// import { useFrame } from '@react-three/fiber';
// import gsap from 'gsap';
// import { ScrollTrigger } from 'gsap/ScrollTrigger';
// import { useControls } from 'leva';
// import * as THREE from 'three';

// gsap.registerPlugin(ScrollTrigger);

// export const ScrollAnimation = ({ cameraRef, controlsRef, isMobile, modelRef }) => {
//   const cameraGroupRef = useRef();

//   const targetControls = useControls('Camera Target', {
//     targetX: { value: 0, min: -10, max: 10 },
//     targetY: { value: 1, min: -10, max: 10 },
//     targetZ: { value: 0, min: -10, max: 10 },
//   });

//   const jumbotron = useControls('Jumbotron', {
//     camX: 10, camY: -2, camZ: 0,
//     targetX: 0.11, targetY: 0.0, targetZ: 0.0,
//     rotX: 0.0, rotY: -0.8, rotZ: 0.0,
//   });

//   const sound = useControls('Sound', {
//     camX: -7, camY: -4, camZ: -4,
//     targetX: -1, targetY: 0, targetZ: -2,
//     rotX: 0, rotY: 0, rotZ: 0,
//   });

//   const display = useControls('Display', {
//     camX: isMobile ? 9.36 : -4,
//     camY: isMobile ? 10.95 : 5,
//     camZ: isMobile ? 0.09 : 0,
//     targetX: isMobile ? -1.62 : -1,
//     targetY: isMobile ? 0.02 : 0.0,
//     targetZ: isMobile ? -0.06 : 0.0,
//     rotX: 1.5, rotY: -2.6, rotZ: -0.3,
//   });

//   const modelRotation = useControls('Model Rotation', {
//     x: { value: -0.4, min: -Math.PI, max: Math.PI },
//     y: { value: 0, min: -Math.PI, max: Math.PI },
//     z: { value: -1, min: -Math.PI, max: Math.PI },
//   });

//   useEffect(() => {
//     if (!cameraRef.current || !controlsRef.current || !cameraGroupRef.current) return;

//     cameraRef.current.position.set(jumbotron.camX, jumbotron.camY, jumbotron.camZ);
//     controlsRef.current.target.set(jumbotron.targetX, jumbotron.targetY, jumbotron.targetZ);
//     cameraGroupRef.current.rotation.set(jumbotron.rotX, jumbotron.rotY, jumbotron.rotZ);
//     controlsRef.current.update();

//     if (!cameraGroupRef.current.children.includes(cameraRef.current)) {
//       cameraGroupRef.current.add(cameraRef.current);
//     }

//     const axesHelper = new THREE.AxesHelper(5);
//     cameraRef.current.parent?.add(axesHelper);

//     const labels = ['X', 'Y', 'Z'];
//     const positions = [new THREE.Vector3(6, 0, 0), new THREE.Vector3(0, 6, 0), new THREE.Vector3(0, 0, 6)];

//     positions.forEach((pos, i) => {
//       const canvas = document.createElement('canvas');
//       canvas.width = 256;
//       canvas.height = 256;
//       const ctx = canvas.getContext('2d');
//       if (ctx) {
//         ctx.fillStyle = 'red';
//         ctx.font = '24px Arial';
//         ctx.textAlign = 'center';
//         ctx.textBaseline = 'middle';
//         ctx.fillText(labels[i], 128, 128);
//       }
//       const texture = new THREE.CanvasTexture(canvas);
//       const sprite = new THREE.Sprite(new THREE.SpriteMaterial({ map: texture }));
//       sprite.scale.set(1, 1, 1);
//       sprite.position.copy(pos);
//       axesHelper.add(sprite);
//     });

//     const tl = gsap.timeline({
//       scrollTrigger: {
//         trigger: '.jumbotron-section',
//         start: 'top top',
//         endTrigger: '.display-section',
//         end: 'bottom bottom',
//         scrub: 1.5,
//         immediateRender: false,
//       },
//     });

//     tl.to(cameraRef.current.position, {
//       x: sound.camX, y: sound.camY, z: sound.camZ,
//       onUpdate: () => controlsRef.current.update()
//     });
//     tl.to(controlsRef.current.target, {
//       x: sound.targetX, y: sound.targetY, z: sound.targetZ,
//       onUpdate: () => controlsRef.current.update()
//     }, '<');
//     tl.to(cameraGroupRef.current.rotation, {
//       x: sound.rotX, y: sound.rotY, z: sound.rotZ
//     }, '<');

//     tl.to('.jumbotron-section', { opacity: 0 }, '<');
//     tl.to('.sound-section-content', { opacity: 1 }, '<');
//     tl.to('#r3f-canvas-container', { left: '-10%' }, '<');

//     tl.to(cameraRef.current.position, {
//       x: display.camX, y: display.camY, z: display.camZ,
//       onUpdate: () => controlsRef.current.update()
//     });
//     tl.to(controlsRef.current.target, {
//       x: display.targetX, y: display.targetY, z: display.targetZ,
//       onUpdate: () => controlsRef.current.update()
//     }, '<');
//     tl.to(cameraGroupRef.current.rotation, {
//       x: display.rotX, y: display.rotY, z: display.rotZ
//     }, '<');

//     tl.to('.display-section', { opacity: 1 }, '<');
//     tl.to('#r3f-canvas-container', { left: '-50%' }, '<');

//     if (modelRef?.current) {
//       tl.to(modelRef.current.rotation, {
//         x: modelRotation.x,
//         y: modelRotation.y,
//         z: modelRotation.z,
//         duration: 0.5
//       }, '<');

//     }

    

//     return () => {
//       tl.kill();
//       ScrollTrigger.getAll().forEach(t => t.kill());
//       axesHelper.removeFromParent();
//     };
//   }, [cameraRef, controlsRef, isMobile, jumbotron, sound, display, modelRef, modelRotation]);

//   useFrame(() => {
//     if (controlsRef.current) {
//       controlsRef.current.target.set(
//         targetControls.targetX,
//         targetControls.targetY,
//         targetControls.targetZ
//       );
//       controlsRef.current.update();
//     }
//   });

//   return <group ref={cameraGroupRef} />;
// };


























// import { useEffect, useRef } from 'react';
// import { useFrame } from '@react-three/fiber';
// import gsap from 'gsap';
// import { ScrollTrigger } from 'gsap/ScrollTrigger';
// import { useControls } from 'leva';
// import * as THREE from 'three';

// gsap.registerPlugin(ScrollTrigger);

// export const ScrollAnimation = ({ cameraRef, controlsRef, isMobile, modelRef }) => {
//   const cameraGroupRef = useRef();

//   const targetControls = useControls('Camera Target', {
//     targetX: { value: 0, min: -10, max: 10 },
//     targetY: { value: 1, min: -10, max: 10 },
//     targetZ: { value: 0, min: -10, max: 10 },
//   });

//   const jumbotron = useControls('Jumbotron', {
//     camX: 10, camY: -2, camZ: 0,
//     targetX: 0.11, targetY: 0.0, targetZ: 0.0,
//     rotX: 0.0, rotY: -0.8, rotZ: 0.0,
//   });

//   const sound = useControls('Sound', {
//     camX: -7, camY: -4, camZ: -4,
//     targetX: -1, targetY: 0, targetZ: -2,
//     rotX: 0, rotY: 0., rotZ: 0,
//   });

//   const display = useControls('Display', {
//     camX: isMobile ? 9.36 : -4,
//     camY: isMobile ? 10.95 : 5,
//     camZ: isMobile ? 0.09 : 0,
//     targetX: isMobile ? -1.62 : -1,
//     targetY: isMobile ? 0.02 : 0.0,
//     targetZ: isMobile ? -0.06 : 0.0,
//     rotX: 1.5, rotY: -2.6, rotZ: -0.3,
//   });

//   const modelRotation = useControls('Model Rotation', {
//     x: { value: -0.4, min: -Math.PI, max: Math.PI },
//     y: { value: 0, min: -Math.PI, max: Math.PI },
//     z: { value: -1, min: -Math.PI, max: Math.PI },
//   });

//   useEffect(() => {
//     if (!cameraRef.current || !controlsRef.current || !cameraGroupRef.current) return;

//     cameraRef.current.position.set(jumbotron.camX, jumbotron.camY, jumbotron.camZ);
//     controlsRef.current.target.set(jumbotron.targetX, jumbotron.targetY, jumbotron.targetZ);
//     cameraGroupRef.current.rotation.set(jumbotron.rotX, jumbotron.rotY, jumbotron.rotZ);
//     controlsRef.current.update();

//     if (!cameraGroupRef.current.children.includes(cameraRef.current)) {
//       cameraGroupRef.current.add(cameraRef.current);
//     }

//     const axesHelper = new THREE.AxesHelper(5);
//     cameraRef.current.parent?.add(axesHelper);

//     const labels = ['X', 'Y', 'Z'];
//     const positions = [new THREE.Vector3(6, 0, 0), new THREE.Vector3(0, 6, 0), new THREE.Vector3(0, 0, 6)];

//     positions.forEach((pos, i) => {
//       const canvas = document.createElement('canvas');
//       canvas.width = 256;
//       canvas.height = 256;
//       const ctx = canvas.getContext('2d');
//       if (ctx) {
//         ctx.fillStyle = 'red';
//         ctx.font = '24px Arial';
//         ctx.textAlign = 'center';
//         ctx.textBaseline = 'middle';
//         ctx.fillText(labels[i], 128, 128);
//       }
//       const texture = new THREE.CanvasTexture(canvas);
//       const sprite = new THREE.Sprite(new THREE.SpriteMaterial({ map: texture }));
//       sprite.scale.set(1, 1, 1);
//       sprite.position.copy(pos);
//       axesHelper.add(sprite);
//     });

//     const tl = gsap.timeline({
//       scrollTrigger: {
//         trigger: '.jumbotron-section',
//         start: 'top top',
//         endTrigger: '.display-section',
//         end: 'bottom bottom',
//         scrub: 1.5,
//         immediateRender: false,
//       },
//     });

//     // Phase 1: jumbotron → sound
//     tl.to(cameraRef.current.position, {
//       x: sound.camX,
//       y: sound.camY,
//       z: sound.camZ,
//       onUpdate: () => controlsRef.current.update(),
//     });
//     tl.to(controlsRef.current.target, {
//       x: sound.targetX,
//       y: sound.targetY,
//       z: sound.targetZ,
//       onUpdate: () => controlsRef.current.update(),
//     }, '<');
//     tl.to(cameraGroupRef.current.rotation, {
//       x: sound.rotX,
//       y: sound.rotY,
//       z: sound.rotZ,
//     }, '<');

//     tl.to('.jumbotron-section', { opacity: 0 }, '<');
//     tl.to('.sound-section-content', { opacity: 1 }, '<');
//     tl.to('#r3f-canvas-container', { left: '-10%' }, '<');

//     // ✅ Phase 1.5: zoom-in（貼臉感，延後進入）
//     tl.to(cameraRef.current.position, {
//       x: sound.camX +5.5,
//       y: sound.camY + 0.5,
//       z: sound.camZ - 1.2,
//       duration: 0.5,
//       ease: 'power2.out',
//       onUpdate: () => controlsRef.current.update(),
//     }, '+=0.2'); // 延後 0.2 timeline 進度觸發（等效約 100px 差距）

//     // Phase 2: sound → display
//     tl.to(cameraRef.current.position, {
//       x: display.camX,
//       y: display.camY,
//       z: display.camZ,
//       duration: 1.2,
//       onUpdate: () => controlsRef.current.update(),
//     });
//     tl.to(controlsRef.current.target, {
//       x: display.targetX,
//       y: display.targetY,
//       z: display.targetZ,
//       onUpdate: () => controlsRef.current.update(),
//     }, '<');
//     tl.to(cameraGroupRef.current.rotation, {
//       x: display.rotX,
//       y: display.rotY,
//       z: display.rotZ,
//     }, '<');

//     tl.to('.display-section', { opacity: 1 }, '<');
//     tl.to('#r3f-canvas-container', { left: '-50%' }, '<');

//     if (modelRef?.current) {
//       tl.to(modelRef.current.rotation, {
//         x: modelRotation.x,
//         y: modelRotation.y,
//         z: modelRotation.z,
//         duration: 0.5,
//       }, '<');
//     }

//     return () => {
//       tl.kill();
//       ScrollTrigger.getAll().forEach(t => t.kill());
//       axesHelper.removeFromParent();
//     };
//   }, [cameraRef, controlsRef, isMobile, jumbotron, sound, display, modelRef, modelRotation]);

//   useFrame(() => {
//     if (controlsRef.current) {
//       controlsRef.current.target.set(
//         targetControls.targetX,
//         targetControls.targetY,
//         targetControls.targetZ
//       );
//       controlsRef.current.update();
//     }
//   });

//   return <group ref={cameraGroupRef} />;
// };
















// import { useEffect, useRef } from 'react';
// import { useFrame } from '@react-three/fiber';
// import gsap from 'gsap';
// import { ScrollTrigger } from 'gsap/ScrollTrigger';
// import { useControls } from 'leva';
// import * as THREE from 'three';

// gsap.registerPlugin(ScrollTrigger);

// export const ScrollAnimation = ({ cameraRef, controlsRef, isMobile, modelRef }) => {
//   const cameraGroupRef = useRef();

//   const targetControls = useControls('Camera Target', {
//     targetX: { value: 0, min: -10, max: 10 },
//     targetY: { value: 1, min: -10, max: 10 },
//     targetZ: { value: 0, min: -10, max: 10 },
//   });

//   const jumbotron = useControls('Jumbotron', {
//     camX: 10, camY: -2, camZ: 0,
//     targetX: 0.11, targetY: 0.0, targetZ: 0.0,
//     rotX: 0.0, rotY: -0.8, rotZ: 0.0,
//   });

//   const sound = useControls('Sound', {
//     camX: -7, camY: -4, camZ: -4,
//     targetX: -1, targetY: 0, targetZ: -2,
//     rotX: 0, rotY: 0, rotZ: 0,
//   });

//   const display = useControls('Display', {
//     camX: isMobile ? 9.36 : -4,
//     camY: isMobile ? 10.95 : 5,
//     camZ: isMobile ? 0.09 : 0,
//     targetX: isMobile ? -1.62 : -1,
//     targetY: isMobile ? 0.02 : 0.0,
//     targetZ: isMobile ? -0.06 : 0.0,
//     rotX: 1.5, rotY: -2.6, rotZ: -0.3,
//   });

//   const modelRotation = useControls('Model Rotation', {
//     x: { value: -0.4, min: -Math.PI, max: Math.PI },
//     y: { value: 0, min: -Math.PI, max: Math.PI },
//     z: { value: -1, min: -Math.PI, max: Math.PI },
//   });

//   useEffect(() => {
//     if (!cameraRef.current || !controlsRef.current || !cameraGroupRef.current) return;

//     cameraRef.current.position.set(jumbotron.camX, jumbotron.camY, jumbotron.camZ);
//     controlsRef.current.target.set(jumbotron.targetX, jumbotron.targetY, jumbotron.targetZ);
//     cameraGroupRef.current.rotation.set(jumbotron.rotX, jumbotron.rotY, jumbotron.rotZ);
//     controlsRef.current.update();

//     if (!cameraGroupRef.current.children.includes(cameraRef.current)) {
//       cameraGroupRef.current.add(cameraRef.current);
//     }

//     const axesHelper = new THREE.AxesHelper(5);
//     cameraRef.current.parent?.add(axesHelper);

//     const labels = ['X', 'Y', 'Z'];
//     const positions = [new THREE.Vector3(6, 0, 0), new THREE.Vector3(0, 6, 0), new THREE.Vector3(0, 0, 6)];

//     positions.forEach((pos, i) => {
//       const canvas = document.createElement('canvas');
//       canvas.width = 256;
//       canvas.height = 256;
//       const ctx = canvas.getContext('2d');
//       if (ctx) {
//         ctx.fillStyle = 'red';
//         ctx.font = '24px Arial';
//         ctx.textAlign = 'center';
//         ctx.textBaseline = 'middle';
//         ctx.fillText(labels[i], 128, 128);
//       }
//       const texture = new THREE.CanvasTexture(canvas);
//       const sprite = new THREE.Sprite(new THREE.SpriteMaterial({ map: texture }));
//       sprite.scale.set(1, 1, 1);
//       sprite.position.copy(pos);
//       axesHelper.add(sprite);
//     });

//     const tl = gsap.timeline({
//       scrollTrigger: {
//         trigger: '.jumbotron-section',
//         start: 'top top',
//         endTrigger: '.display-section',
//         end: 'bottom bottom',
//         scrub: 1.5,
//         immediateRender: false,
//       },
//     });

//     tl.to(cameraRef.current.position, {
//       x: sound.camX, y: sound.camY, z: sound.camZ,
//       onUpdate: () => controlsRef.current.update()
//     });
//     tl.to(controlsRef.current.target, {
//       x: sound.targetX, y: sound.targetY, z: sound.targetZ,
//       onUpdate: () => controlsRef.current.update()
//     }, '<');
//     tl.to(cameraGroupRef.current.rotation, {
//       x: sound.rotX, y: sound.rotY, z: sound.rotZ
//     }, '<');

//     tl.to('.jumbotron-section', { opacity: 0 }, '<');
//     tl.to('.sound-section-content', { opacity: 1 }, '<');
//     tl.to('#r3f-canvas-container', { left: '-10%' }, '<');

//     tl.to(cameraRef.current.position, {
//       x: display.camX, y: display.camY, z: display.camZ,
//       onUpdate: () => controlsRef.current.update()
//     });
//     tl.to(controlsRef.current.target, {
//       x: display.targetX, y: display.targetY, z: display.targetZ,
//       onUpdate: () => controlsRef.current.update()
//     }, '<');
//     tl.to(cameraGroupRef.current.rotation, {
//       x: display.rotX, y: display.rotY, z: display.rotZ
//     }, '<');

//     tl.to('.display-section', { opacity: 1 }, '<');
//     tl.to('#r3f-canvas-container', { left: '-50%' }, '<');

//     if (modelRef?.current) {
//       tl.to(modelRef.current.rotation, {
//         x: modelRotation.x,
//         y: modelRotation.y,
//         z: modelRotation.z,
//         duration: 0.5
//       }, '<');

//     }

    

//     return () => {
//       tl.kill();
//       ScrollTrigger.getAll().forEach(t => t.kill());
//       axesHelper.removeFromParent();
//     };
//   }, [cameraRef, controlsRef, isMobile, jumbotron, sound, display, modelRef, modelRotation]);

//   useFrame(() => {
//     if (controlsRef.current) {
//       controlsRef.current.target.set(
//         targetControls.targetX,
//         targetControls.targetY,
//         targetControls.targetZ
//       );
//       controlsRef.current.update();
//     }
//   });

//   return <group ref={cameraGroupRef} />;
// };













// import { useEffect, useRef } from 'react';
// import gsap from 'gsap';
// import { ScrollTrigger } from 'gsap/ScrollTrigger';
// import { useControls } from 'leva';
// import * as THREE from 'three';

// gsap.registerPlugin(ScrollTrigger);

// export const ScrollAnimation = ({ cameraRef, controlsRef, isMobile }) => {
//   const cameraGroupRef = useRef();

//   const jumbotron = useControls('Jumbotron', {
//     camX: { value: 8, min: -50, max: 50 },
//     camY: { value: -2, min: -50, max: 50 },
//     camZ: { value: 0, min: -50, max: 50 },
//     targetX: { value: 0.11, min: -50, max: 50 },
//     targetY: { value: 0.0, min: -50, max: 50 },
//     targetZ: { value: 0.0, min: -50, max: 50 },
//     rotX: { value: 0.0, min: -Math.PI, max: Math.PI },
//     rotY: { value: -0.8, min: -Math.PI, max: Math.PI },
//     rotZ: { value: 0.0, min: -Math.PI, max: Math.PI },
//   });

//   const sound = useControls('Sound', {
//     camX: { value: -7, min: -50, max: 50 },
//     camY: { value: -4, min: -50, max: 50 },
//     camZ: { value: -4, min: -50, max: 50 },
//     targetX: { value: -1, min: -50, max: 50 },
//     targetY: { value: 0, min: -50, max: 50 },
//     targetZ: { value: -2, min: -50, max: 50 },
//     rotX: { value: 0, min: -Math.PI, max: Math.PI },
//     rotY: { value: 0, min: -Math.PI, max: Math.PI },
//     rotZ: { value: 0, min: -Math.PI, max: Math.PI },
//   });

//   const display = useControls('Display', {
//     camX: { value: isMobile ? 9.36 : -4, min: -50, max: 50 },
//     camY: { value: isMobile ? 10.95 : 5, min: -50, max: 50 },
//     camZ: { value: isMobile ? 0.09 : 0, min: -50, max: 50 },
//     targetX: { value: isMobile ? -1.62 : -1, min: -50, max: 50 },
//     targetY: { value: isMobile ? 0.02 : 0.0, min: -50, max: 50 },
//     targetZ: { value: isMobile ? -0.06 : 0.0, min: -50, max: 50 },
//     rotX: { value: 1.5, min: -Math.PI, max: Math.PI },
//     rotY: { value: -2.6, min: -Math.PI, max: Math.PI },
//     rotZ: { value: -0.3, min: -Math.PI, max: Math.PI },
//   });

//   useEffect(() => {
//     if (!cameraRef.current || !controlsRef.current || !cameraGroupRef.current) return;

//     // ✅ 避免重複加入攝影機
//     if (!cameraGroupRef.current.children.includes(cameraRef.current)) {
//       cameraGroupRef.current.add(cameraRef.current);
//     }

//     const axesHelper = new THREE.AxesHelper(5);
//     cameraRef.current.parent?.add(axesHelper);

//     const labels = ['X', 'Y', 'Z'];
//     const positions = [
//       new THREE.Vector3(6, 0, 0),
//       new THREE.Vector3(0, 6, 0),
//       new THREE.Vector3(0, 0, 6),
//     ];

//     positions.forEach((pos, i) => {
//       const canvas = document.createElement('canvas');
//       canvas.width = 256;
//       canvas.height = 256;
//       const ctx = canvas.getContext('2d');
//       if (ctx) {
//         ctx.fillStyle = 'red';
//         ctx.font = '24px Arial';
//         ctx.textAlign = 'center';
//         ctx.textBaseline = 'middle';
//         ctx.fillText(labels[i], 128, 128);
//       }
//       const texture = new THREE.CanvasTexture(canvas);
//       const sprite = new THREE.Sprite(new THREE.SpriteMaterial({ map: texture }));
//       sprite.scale.set(1, 1, 1);
//       sprite.position.copy(pos);
//       axesHelper.add(sprite);
//     });

//     const tl = gsap.timeline({
//       scrollTrigger: {
//         trigger: '.jumbotron-section',
//         start: 'top top',
//         endTrigger: '.display-section',
//         end: 'bottom bottom',
//         scrub: 1.5,
//         immediateRender: false,
//       },
//     });

//     tl.fromTo(cameraRef.current.position,
//       { x: jumbotron.camX, y: jumbotron.camY, z: jumbotron.camZ },
//       {
//         x: sound.camX, y: sound.camY, z: sound.camZ,
//         onUpdate: () => controlsRef.current.update()
//       }
//     );

//     tl.fromTo(controlsRef.current.target,
//       { x: jumbotron.targetX, y: jumbotron.targetY, z: jumbotron.targetZ },
//       {
//         x: sound.targetX, y: sound.targetY, z: sound.targetZ,
//         onUpdate: () => controlsRef.current.update()
//       }, '<');

//     tl.fromTo(cameraGroupRef.current.rotation,
//       { x: jumbotron.rotX, y: jumbotron.rotY, z: jumbotron.rotZ },
//       { x: sound.rotX, y: sound.rotY, z: sound.rotZ },
//       '<'
//     );

//     tl.to('.jumbotron-section', { opacity: 0 }, '<');
//     tl.to('.sound-section-content', { opacity: 1 }, '<');
//     tl.to('#r3f-canvas-container', { left: '-20%' }, '<');

//     tl.to(cameraRef.current.position, {
//       x: display.camX, y: display.camY, z: display.camZ,
//       onUpdate: () => controlsRef.current.update()
//     });

//     tl.to(controlsRef.current.target, {
//       x: display.targetX, y: display.targetY, z: display.targetZ,
//       onUpdate: () => controlsRef.current.update()
//     }, '<');

//     tl.to(cameraGroupRef.current.rotation, {
//       x: display.rotX, y: display.rotY, z: display.rotZ
//     }, '<');

//     tl.to('.display-section', { opacity: 1 }, '<');
//     tl.to('#r3f-canvas-container', { left: '-50%' }, '<');

//     return () => {
//       tl.kill();
//       ScrollTrigger.getAll().forEach(t => t.kill());
//       axesHelper.removeFromParent();
//     };
//   }, [cameraRef, controlsRef, isMobile, jumbotron, sound, display]);

//   return <group ref={cameraGroupRef} />;
// };




















// import { useEffect, useRef } from 'react';
// import gsap from 'gsap';
// import { ScrollTrigger } from 'gsap/ScrollTrigger';
// import { useControls } from 'leva';
// import * as THREE from 'three';

// gsap.registerPlugin(ScrollTrigger);

// export const ScrollAnimation = ({ cameraRef, controlsRef, isMobile }) => {
//   const cameraGroupRef = useRef();

//   const jumbotron = useControls('Jumbotron', {
//     camX: { value: 13.04, min: -50, max: 50 },
//     camY: { value: -2, min: -50, max: 50 },
//     camZ: { value: 2.29, min: -50, max: 50 },
//     targetX: { value: 0.11, min: -50, max: 50 },
//     targetY: { value: 0.0, min: -50, max: 50 },
//     targetZ: { value: 0.0, min: -50, max: 50 },
//     rotX: { value: 0, min: -Math.PI, max: Math.PI },
//     rotY: { value: 0, min: -Math.PI, max: Math.PI },
//     rotZ: { value: 0, min: -Math.PI, max: Math.PI },
//   });

//   const sound = useControls('Sound', {
//     camX: { value: -7, min: -50, max: 50 },
//     camY: { value: -4, min: -50, max: 50 },
//     camZ: { value: -4, min: -50, max: 50 },
//     targetX: { value: -1, min: -50, max: 50 },
//     targetY: { value: 0, min: -50, max: 50 },
//     targetZ: { value: -2, min: -50, max: 50 },
//     rotX: { value: 0, min: -Math.PI, max: Math.PI },
//     rotY: { value: 0, min: -Math.PI, max: Math.PI },
//     rotZ: { value: 0, min: -Math.PI, max: Math.PI },
//   });

//   const display = useControls('Display', {
//     camX: { value: isMobile ? 9.36 : -4, min: -50, max: 50 },
//     camY: { value: isMobile ? 10.95 : 5, min: -50, max: 50 },
//     camZ: { value: isMobile ? 0.09 : 0, min: -50, max: 50 },
//     targetX: { value: isMobile ? -1.62 : -1, min: -50, max: 50 },
//     targetY: { value: isMobile ? 0.02 : 0.0, min: -50, max: 50 },
//     targetZ: { value: isMobile ? -0.06 : 0.0, min: -50, max: 50 },
//     rotX: { value: 1.5, min: -Math.PI, max: Math.PI },
//     rotY: { value: -2.6, min: -Math.PI, max: Math.PI },
//     rotZ: { value: -0.3, min: -Math.PI, max: Math.PI },
//   });

//   useEffect(() => {
//     if (!cameraRef.current || !controlsRef.current || !cameraGroupRef.current) return;

//     // 將攝影機加入群組以實現旋轉
//     cameraGroupRef.current.add(cameraRef.current);

//     // 可選：加上軸輔助工具
//     const axesHelper = new THREE.AxesHelper(5);
//     cameraRef.current.parent?.add(axesHelper);

//     const labels = ['X', 'Y', 'Z'];
//     const positions = [
//       new THREE.Vector3(6, 0, 0),
//       new THREE.Vector3(0, 6, 0),
//       new THREE.Vector3(0, 0, 6),
//     ];

//     positions.forEach((pos, i) => {
//       const canvas = document.createElement('canvas');
//       canvas.width = 256;
//       canvas.height = 256;
//       const ctx = canvas.getContext('2d');
//       ctx.fillStyle = 'red';
//       ctx.font = '24px Arial';
//       ctx.textAlign = 'center';
//       ctx.textBaseline = 'middle';
//       ctx.fillText(labels[i], 128, 128);
//       const texture = new THREE.CanvasTexture(canvas);
//       const sprite = new THREE.Sprite(new THREE.SpriteMaterial({ map: texture }));
//       sprite.scale.set(1, 1, 1);
//       sprite.position.copy(pos);
//       axesHelper.add(sprite);
//     });

//     const tl = gsap.timeline({
//       scrollTrigger: {
//         trigger: '.jumbotron-section',
//         start: 'top top',
//         endTrigger: '.display-section',
//         end: 'bottom bottom',
//         scrub: 1.5,
//         immediateRender: false,
//       },
//     });

//     // Position animation
//     tl.fromTo(cameraRef.current.position,
//       { x: jumbotron.camX, y: jumbotron.camY, z: jumbotron.camZ },
//       {
//         x: sound.camX, y: sound.camY, z: sound.camZ,
//         onUpdate: () => controlsRef.current.update()
//       }
//     );

//     // Target animation
//     tl.fromTo(controlsRef.current.target,
//       { x: jumbotron.targetX, y: jumbotron.targetY, z: jumbotron.targetZ },
//       {
//         x: sound.targetX, y: sound.targetY, z: sound.targetZ,
//         onUpdate: () => controlsRef.current.update()
//       }, '<');

//     // Rotation animation
//     tl.fromTo(cameraGroupRef.current.rotation,
//       { x: jumbotron.rotX, y: jumbotron.rotY, z: jumbotron.rotZ },
//       { x: sound.rotX, y: sound.rotY, z: sound.rotZ },
//       '<'
//     );

//     // Mid-scroll changes
//     tl.to('.jumbotron-section', { opacity: 0 }, '<');
//     tl.to('.sound-section-content', { opacity: 1 }, '<');
//     tl.to('#r3f-canvas-container', { left: '-20%' }, '<');

//     // Final section camera position
//     tl.to(cameraRef.current.position, {
//       x: display.camX, y: display.camY, z: display.camZ,
//       onUpdate: () => controlsRef.current.update()
//     });

//     tl.to(controlsRef.current.target, {
//       x: display.targetX, y: display.targetY, z: display.targetZ,
//       onUpdate: () => controlsRef.current.update()
//     }, '<');

//     tl.to(cameraGroupRef.current.rotation, {
//       x: display.rotX, y: display.rotY, z: display.rotZ
//     }, '<');

//     tl.to('.display-section', { opacity: 1 }, '<');
//     tl.to('#r3f-canvas-container', { left: '-50%' }, '<');

//     return () => {
//       ScrollTrigger.getAll().forEach(t => t.kill());
//       axesHelper.removeFromParent();
//     };
//   }, [cameraRef, controlsRef, isMobile, jumbotron, sound, display]);



//   // ✅ 將 cameraGroupRef 傳到父層包住攝影機
//   return <group ref={cameraGroupRef} />;
// };

























// import { useEffect } from 'react';
// import gsap from 'gsap';
// import { ScrollTrigger } from 'gsap/ScrollTrigger';
// import { useControls } from 'leva';
// import * as THREE from 'three';

// gsap.registerPlugin(ScrollTrigger);


// export const ScrollAnimation = ({ cameraRef, controlsRef, isMobile }) => {
//   const jumbotron = useControls('Jumbotron', {
//     camX: { value: 13.04, min: -50, max: 50 },
//     camY: { value: -2, min: -50, max: 50 },
//     camZ: { value: 2.29, min: -50, max: 50 },
//     targetX: { value: 0.11, min: -50, max: 50 },
//     targetY: { value: 0.0, min: -50, max: 50 },
//     targetZ: { value: 0.0, min: -50, max: 50 },
//   });

//   const sound = useControls('Sound', {
//     camX: { value: -7, min: -50, max: 50 },
//     camY: { value: -2, min: -50, max: 50 },
//     camZ: { value: -4, min: -50, max: 50 },
//     targetX: { value: -1, min: -50, max: 50 },
//     targetY: { value: 0, min: -50, max: 50 },
//     targetZ: { value: -2, min: -50, max: 50 },
//   });

//   const display = useControls('Display', {
//     camX: { value: isMobile ? 9.36 : 1.56, min: -50, max: 50 },
//     camY: { value: isMobile ? 10.95 : 5.0, min: -50, max: 50 },
//     camZ: { value: isMobile ? 0.09 : 0.01, min: -50, max: 50 },
//     targetX: { value: isMobile ? -1.62 : -0.55, min: -50, max: 50 },
//     targetY: { value: isMobile ? 0.02 : 0.32, min: -50, max: 50 },
//     targetZ: { value: isMobile ? -0.06 : 0.0, min: -50, max: 50 },
//   });

  
//   useEffect(() => {
//     if (!cameraRef.current || !controlsRef.current) return;

//     const axesHelper = new THREE.AxesHelper(5);
//     cameraRef.current.parent?.add(axesHelper);

//     const labels = ['X', 'Y', 'Z'];
//     const positions = [
//       new THREE.Vector3(6, 0, 0),
//       new THREE.Vector3(0, 6, 0),
//       new THREE.Vector3(0, 0, 6),
//     ];

//     const sprites = labels.map((text, i) => {
//       const canvas = document.createElement('canvas');
//       const size = 256;
//       canvas.width = size;
//       canvas.height = size;
//       const context = canvas.getContext('2d');
//       context.fillStyle = 'red';
//       context.font = '10px Arial';
//       context.textAlign = 'center';
//       context.textBaseline = 'middle';
//       context.fillText(text, size / 2, size / 2);

//       const texture = new THREE.CanvasTexture(canvas);
//       const material = new THREE.SpriteMaterial({ map: texture, depthTest: false, sizeAttenuation: false });
//       const sprite = new THREE.Sprite(material);
//       sprite.scale.set(1, 1, 1);
//       sprite.position.copy(positions[i]);

//       axesHelper.add(sprite);
//       return sprite;
//     });

//     const tl = gsap.timeline({
//       scrollTrigger: {
//         trigger: '.jumbotron-section',
//         start: 'top top',
//         endTrigger: '.display-section',
//         end: 'bottom bottom',
//         scrub: 1.5,
//         immediateRender: false,
//       },
//     });

//     tl.fromTo(cameraRef.current.position,
//       { x: jumbotron.camX, y: jumbotron.camY, z: jumbotron.camZ },
//       {
//         x: sound.camX, y: sound.camY, z: sound.camZ,
//         onUpdate: () => controlsRef.current.update()
//       }
//     );

//     tl.fromTo(controlsRef.current.target,
//       { x: jumbotron.targetX, y: jumbotron.targetY, z: jumbotron.targetZ },
//       {
//         x: sound.targetX, y: sound.targetY, z: sound.targetZ,
//         onUpdate: () => controlsRef.current.update()
//       }, '<');

//     tl.to('.jumbotron-section', { opacity: 0 }, '<');
//     tl.to('.sound-section-content', { opacity: 1 }, '<');
//     tl.to('#r3f-canvas-container', { left: '-20%' }, '<');

//     tl.to(cameraRef.current.position, {
//       x: display.camX, y: display.camY, z: display.camZ,
//       onUpdate: () => controlsRef.current.update()
//     });

//     tl.to(controlsRef.current.target, {
//       x: display.targetX, y: display.targetY, z: display.targetZ,
//       onUpdate: () => controlsRef.current.update()
//     }, '<');

//     tl.to('.display-section', { opacity: 1 }, '<');
//     tl.to('#r3f-canvas-container', { left: '-40%' }, '<');

//     return () => {
//       ScrollTrigger.getAll().forEach(t => t.kill());
//       axesHelper.removeFromParent();
//     };
//   }, [cameraRef, controlsRef, isMobile, jumbotron, sound, display]);

//   return null;
// };










// // src/components/ScrollAnimation.jsx
// import { useEffect } from 'react';
// import gsap from 'gsap';
// import { ScrollTrigger } from 'gsap/ScrollTrigger';

// gsap.registerPlugin(ScrollTrigger);

// export const ScrollAnimation = ({ cameraRef, controlsRef, isMobile }) => {
//   useEffect(() => {
//     if (!cameraRef.current || !controlsRef.current) return;

//     // ✅ 固定 jumbotron 起始攝影機位置與目標（不要 clone，直接指定）
//     const jumbotronCamPos = {
//       x: 13.04,
//       y: -2,
//       z: 2.29,
//     };
//     const jumbotronTarget = {
//       x: 0.11,
//       y: 0.0,
//       z: 0.0,
//     };

//     // ✅ 中間位置（sound-section）
//     const soundCamPos = {
//       x: isMobile ? -7.0 : -3.38,
//       y: isMobile ? -12.2 : -10.74,
//       z: isMobile ? -6.0 : -5.93,
//     };
//     const soundTarget = {
//       x: isMobile ? 0.7 : 1.52,
//       y: isMobile ? 1.9 : 0.77,
//       z: isMobile ? 0.7 : -1.08,
//     };

//     // ✅ 最後位置（display-section）
//     const displayCamPos = {
//       x: isMobile ? 9.36 : 1.56,
//       y: isMobile ? 10.95 : 5.0,
//       z: isMobile ? 0.09 : 0.01,
//     };
//     const displayTarget = {
//       x: isMobile ? -1.62 : -0.55,
//       y: isMobile ? 0.02 : 0.32,
//       z: isMobile ? -0.06 : 0.0,
//     };

//     const tl = gsap.timeline({
//       scrollTrigger: {
//         trigger: '.jumbotron-section',
//         start: 'top top',
//         endTrigger: '.display-section',
//         end: 'bottom bottom',
//         scrub: 1.5,
//         immediateRender: false,
//       },
//     });

//     // 🎯 第1段：jumbotron → sound
//     tl.fromTo(cameraRef.current.position, jumbotronCamPos, {
//       ...soundCamPos,
//       onUpdate: () => controlsRef.current.update(),
//     });

//     tl.fromTo(controlsRef.current.target, jumbotronTarget, {
//       ...soundTarget,
//       onUpdate: () => controlsRef.current.update(),
//     }, '<');

//     tl.to('.jumbotron-section', { opacity: 0 }, '<');
//     tl.to('.sound-section-content', { opacity: 1 }, '<');

//     // 🎯 第2段：sound → display
//     tl.to(cameraRef.current.position, {
//       ...displayCamPos,
//       onUpdate: () => controlsRef.current.update(),
//     });

//     tl.to(controlsRef.current.target, {
//       ...displayTarget,
//       onUpdate: () => controlsRef.current.update(),
//     }, '<');

//     tl.to('.display-section', { opacity: 1 }, '<');

//     return () => {
//       ScrollTrigger.getAll().forEach(t => t.kill());
//     };
//   }, [cameraRef, controlsRef, isMobile]);

//   return null;
// };






































// // src/components/ScrollAnimation.jsx
// import { useEffect } from 'react';
// import gsap from 'gsap';
// import { ScrollTrigger } from 'gsap/ScrollTrigger';

// gsap.registerPlugin(ScrollTrigger);

// export const ScrollAnimation = ({ cameraRef, controlsRef, isMobile }) => {
//   useEffect(() => {
//     if (!cameraRef.current || !controlsRef.current) return;

//     // ✅ 初始位置（jumbotron）
//     const jumbotronCamPos = cameraRef.current.position.clone();
//     const jumbotronTarget = controlsRef.current.target.clone();

//     // ✅ 中間位置（sound-section）
//     const soundCamPos = {
//       x: isMobile ? -7.0 : -3.38,
//       y: isMobile ? -12.2 : -10.74,
//       z: isMobile ? -6.0 : -5.93,
//     };
//     const soundTarget = {
//       x: isMobile ? 0.7 : 1.52,
//       y: isMobile ? 1.9 : 0.77,
//       z: isMobile ? 0.7 : -1.08,
//     };

//     // ✅ 最後位置（display-section）
//     const displayCamPos = {
//       x: isMobile ? 9.36 : 1.56,
//       y: isMobile ? 10.95 : 5.0,
//       z: isMobile ? 0.09 : 0.01,
//     };
//     const displayTarget = {
//       x: isMobile ? -1.62 : -0.55,
//       y: isMobile ? 0.02 : 0.32,
//       z: isMobile ? -0.06 : 0.0,
//     };

//     const tl = gsap.timeline({
//       scrollTrigger: {
//         trigger: '.jumbotron-section',
//         start: 'top top',
//         endTrigger: '.display-section',
//         end: 'bottom bottom',
//         scrub: 1.5,
//         immediateRender: false,
//       },
//     });

//     // 🎯 第1段：jumbotron → sound
//     tl.fromTo(cameraRef.current.position, jumbotronCamPos, {
//       ...soundCamPos,
//       onUpdate: () => controlsRef.current.update(),
//     });

//     tl.fromTo(controlsRef.current.target, jumbotronTarget, {
//       ...soundTarget,
//       onUpdate: () => controlsRef.current.update(),
//     }, '<');

//     tl.to('.jumbotron-section', { opacity: 0 }, '<');
//     tl.to('.sound-section-content', { opacity: 1 }, '<');

//     // 🎯 第2段：sound → display
//     tl.to(cameraRef.current.position, {
//       ...displayCamPos,
//       onUpdate: () => controlsRef.current.update(),
//     });

//     tl.to(controlsRef.current.target, {
//       ...displayTarget,
//       onUpdate: () => controlsRef.current.update(),
//     }, '<');

//     tl.to('.display-section', { opacity: 1 }, '<');

//     // 🎯 可選：如果你有 `.test-section`，可以在這裡接續

//     return () => {
//       ScrollTrigger.getAll().forEach(t => t.kill());
//     };
//   }, [cameraRef, controlsRef, isMobile]);

//   return null;
// };


















// // src/components/ScrollAnimation.jsx
// import { useEffect } from 'react';
// import gsap from 'gsap';
// import { ScrollTrigger } from 'gsap/ScrollTrigger';

// gsap.registerPlugin(ScrollTrigger);

// export const ScrollAnimation = ({ cameraRef, controlsRef, isMobile }) => {
//   useEffect(() => {
//     if (!cameraRef.current || !controlsRef.current) return;

//     // ✅ 儲存 jumbotron 初始位置
//     const jumbotronCamPos = cameraRef.current.position.clone();
//     const jumbotronTarget = controlsRef.current.target.clone();

//     const tl = gsap.timeline({
//       scrollTrigger: {
//         trigger: '.sound-section',
//         start: 'top bottom',
//         endTrigger: '.display-section',
//         end: 'bottom bottom',
//         scrub: 1.5,
//         immediateRender: false,
//       },
//     });

//     // ✅ 第一段 from jumbotron → sound-section camera
//     tl.fromTo(cameraRef.current.position, {
//       x: jumbotronCamPos.x,
//       y: jumbotronCamPos.y,
//       z: jumbotronCamPos.z,
//     }, {
//       x: isMobile ? -7.0 : -3.38,
//       y: isMobile ? -12.2 : -10.74,
//       z: isMobile ? -6.0 : -5.93,
//       onUpdate: () => controlsRef.current.update(),
//     });

//     tl.fromTo(controlsRef.current.target, {
//       x: jumbotronTarget.x,
//       y: jumbotronTarget.y,
//       z: jumbotronTarget.z,
//     }, {
//       x: isMobile ? 0.7 : 1.52,
//       y: isMobile ? 1.9 : 0.77,
//       z: isMobile ? 0.7 : -1.08,
//       onUpdate: () => controlsRef.current.update(),
//     }, '<'); // 同步

//     // jumbotron-section 淡出
//     tl.to('.jumbotron-section', { opacity: 0 }, '<');
//     // sound-section-content 淡入
//     tl.to('.sound-section-content', { opacity: 1 }, '<');

//     // ✅ 第二段 camera position → display-section
//     tl.to(cameraRef.current.position, {
//       x: isMobile ? 9.36 : 1.56,
//       y: isMobile ? 10.95 : 5.0,
//       z: isMobile ? 0.09 : 0.01,
//       onUpdate: () => controlsRef.current.update(),
//     });

//     tl.to(controlsRef.current.target, {
//       x: isMobile ? -1.62 : -0.55,
//       y: isMobile ? 0.02 : 0.32,
//       z: isMobile ? -0.06 : 0.0,
//       onUpdate: () => controlsRef.current.update(),
//     }, '<'); // 同步

//     // display-section 淡入
//     tl.to('.display-section', { opacity: 1 }, '<');

//     return () => {
//       ScrollTrigger.getAll().forEach(t => t.kill());
//     };
//   }, [cameraRef, controlsRef, isMobile]);

//   return null;
// };






















// // src/components/ScrollAnimation.jsx
// import { useEffect } from 'react';
// import gsap from 'gsap';
// import { ScrollTrigger } from 'gsap/ScrollTrigger';

// gsap.registerPlugin(ScrollTrigger);

// export const ScrollAnimation = ({ cameraRef, controlsRef, isMobile }) => {
//   useEffect(() => {
//     const tl = gsap.timeline({
//       scrollTrigger: {
//         trigger: '.sound-section',
//         start: 'top bottom',
//         endTrigger: '.display-section',
//         end: 'bottom bottom',
//         scrub: 1.5,
//         immediateRender: false,
//       },
//     });

//     // 第一段 camera position
//     tl.to(cameraRef.current.position, {
//       x: isMobile ? -7.0 : -3.38,
//       y: isMobile ? -12.2 : -10.74,
//       z: isMobile ? -6.0 : -5.93,
//       onUpdate: () => controlsRef.current.update(),
//     });

//     // 第一段 camera target
//     tl.to(controlsRef.current.target, {
//       x: isMobile ? 0.7 : 1.52,
//       y: isMobile ? 1.9 : 0.77,
//       z: isMobile ? 0.7 : -1.08,
//       onUpdate: () => controlsRef.current.update(),
//     }, '<'); // 同時進行

//     // jumbotron 淡出
//     tl.to('.jumbotron-section', {
//       opacity: 0,
//     }, '<'); // 同步淡出

//     // sound-section-content 淡入
//     tl.to('.sound-section-content', {
//       opacity: 1,
//     }, '<'); // 同步淡入

//     // 第二段 camera position
//     tl.to(cameraRef.current.position, {
//       x: isMobile ? 9.36 : 1.56,
//       y: isMobile ? 10.95 : 5.0,
//       z: isMobile ? 0.09 : 0.01,
//       onUpdate: () => controlsRef.current.update(),
//     });

//     // 第二段 camera target
//     tl.to(controlsRef.current.target, {
//       x: isMobile ? -1.62 : -0.55,
//       y: isMobile ? 0.02 : 0.32,
//       z: isMobile ? -0.06 : 0.0,
//       onUpdate: () => controlsRef.current.update(),
//     }, '<'); // 同時進行

//     // display-section 淡入
//     tl.to('.display-section', {
//       opacity: 1,
//     }, '<'); // 同步淡入

//     return () => {
//       ScrollTrigger.getAll().forEach((t) => t.kill());
//     };
//   }, [cameraRef, controlsRef, isMobile]);

//   return null;
// };



















// // src/components/ScrollAnimation.jsx
// import { useEffect } from 'react';
// import gsap from 'gsap';
// import { ScrollTrigger } from 'gsap/ScrollTrigger';
// import { useMemo } from 'react';


// gsap.registerPlugin(ScrollTrigger);

// export const ScrollAnimation = ({ cameraRef, controlsRef, isMobile }) => {
//   useEffect(() => {
//     const tl = gsap.timeline();

//     tl.to(cameraRef.current.position, {
//       x: isMobile ? -7.0 : -3.38,
//       y: isMobile ? -12.2 : -10.74,
//       z: isMobile ? -6.0 : -5.93,
//       scrollTrigger: {
//         trigger: '.sound-section',
//         start: 'top bottom',
//         end: 'top top',
//         scrub: 1.5,
//         immediateRender: false,
//       },
//       onUpdate: () => controlsRef.current.update(),
//     });

//     tl.to(
//       controlsRef.current.target,
//       {
//         x: isMobile ? 0.7 : 1.52,
//         y: isMobile ? 1.9 : 0.77,
//         z: isMobile ? 0.7 : -1.08,
//         scrollTrigger: {
//           trigger: '.sound-section',
//           start: 'top bottom',
//           end: 'top top',
//           scrub: 1.5,
//           immediateRender: false,
//         },
//         onUpdate: () => controlsRef.current.update(),
//       },
//       '<'
//     );

//     tl.to('.jumbotron-section', {
//       opacity: 0,
//       scrollTrigger: {
//         trigger: '.sound-section',
//         start: 'top bottom',
//         end: 'top top',
//         scrub: 1.5,
//         immediateRender: false,
//       },
//     });

//     tl.to('.sound-section-content', {
//       opacity: 1,
//       scrollTrigger: {
//         trigger: '.sound-section',
//         start: 'top bottom',
//         end: 'top top',
//         scrub: 1.5,
//         immediateRender: false,
//       },
//     });
    





//     tl.to(cameraRef.current.position, {
//       x: isMobile ? 9.36 : 1.56,
//       y: isMobile ? 10.95 : 5.0,
//       z: isMobile ? 0.09 : 0.01,
//       scrollTrigger: {
//         trigger: '.display-section',
//         start: 'top bottom',
//         end: 'top top',
//         scrub: 1.5,
//         immediateRender: false,
//       },
//       onUpdate: () => controlsRef.current.update(),
//     });

//     tl.to(
//       controlsRef.current.target,
//       {
//         x: isMobile ? -1.62 : -0.55,
//         y: isMobile ? 0.02 : 0.32,
//         z: isMobile ? -0.06 : 0.0,
//         scrollTrigger: {
//           trigger: '.display-section',
//           start: 'top bottom',
//           end: 'top top',
//           scrub: 1.5,
//           immediateRender: false,
//         },
//         onUpdate: () => controlsRef.current.update(),
//       },
//       '<'
//     );

//     tl.to('.display-section', {
//       opacity: 1,
//       scrollTrigger: {
//         trigger: '.display-section',
//         start: 'top bottom',
//         end: 'top top',
//         scrub: 1.5,
//         immediateRender: false,
//       },
//     });







//     // test
//     // tl.to(cameraRef.current.position, {
//     //   x: isMobile ? -5.0 : 13.04,
//     //   y: isMobile ? -5.2 : -2,
//     //   z: isMobile ? -7.0 : 2.29,
//     //   scrollTrigger: {
//     //     trigger: '.test',
//     //     start: 'top bottom',
//     //     end: 'top top',
//     //     scrub: 1.5,
//     //     immediateRender: false,
//     //   },
//     //   onUpdate: () => controlsRef.current.update(),
//     // });

//     // tl.to(
//     //   controlsRef.current.target,
//     //   {
//     //     x: isMobile ? 0.9 : 0.11,
//     //     y: isMobile ? 1.9 : 0,
//     //     z: isMobile ? 0.7 : 0,
//     //     scrollTrigger: {
//     //       trigger: '.test',
//     //       start: 'top bottom',
//     //       end: 'top top',
//     //       scrub: 1.5,
//     //       immediateRender: false,
//     //     },
//     //     onUpdate: () => controlsRef.current.update(),
//     //   },
//     //   '<'
//     // );




    

//     return () => {
//       ScrollTrigger.getAll().forEach((t) => t.kill());
//     };
//   }, [cameraRef, controlsRef, isMobile]);

//   return null;
// };

















// // src/components/ScrollAnimation.jsx
// import { useEffect } from 'react';
// import gsap from 'gsap';
// import { ScrollTrigger } from 'gsap/ScrollTrigger';
// import { useControls, folder } from 'leva';
// import { useThree } from '@react-three/fiber';
// import { useMemo } from 'react';
// import * as THREE from 'three';

// // 加入軸末端標籤
// function createAxisLabel(text, position, color) {
//   const canvas = document.createElement('canvas');
//   canvas.width = 256;
//   canvas.height = 64;
//   const ctx = canvas.getContext('2d');
//   ctx.fillStyle = color;
//   ctx.font = 'bold 48px sans-serif';
//   ctx.textAlign = 'center';
//   ctx.textBaseline = 'middle';
//   ctx.fillText(text, canvas.width / 2, canvas.height / 2);

//   const texture = new THREE.CanvasTexture(canvas);
//   const material = new THREE.SpriteMaterial({ map: texture });
//   const sprite = new THREE.Sprite(material);
//   sprite.scale.set(2, 0.5, 1);
//   sprite.position.copy(position);
//   return sprite;
// }

// gsap.registerPlugin(ScrollTrigger);

// export const ScrollAnimation = ({ cameraRef, controlsRef }) => {
//   const { scene } = useThree();

//   useMemo(() => {
//     const axesHelper = new THREE.AxesHelper(5);
//     scene.add(axesHelper);

//     const labelX = createAxisLabel('X', new THREE.Vector3(5, 0, 0), 'red');
//     const labelY = createAxisLabel('Y', new THREE.Vector3(0, 5, 0), 'green');
//     const labelZ = createAxisLabel('Z', new THREE.Vector3(0, 0, 5), 'blue');
//     scene.add(labelX);
//     scene.add(labelY);
//     scene.add(labelZ);

//     return () => {
//       scene.remove(axesHelper);
//       scene.remove(labelX);
//       scene.remove(labelY);
//       scene.remove(labelZ);
//     };
//   }, [scene]);

//   const controlValues = useControls('Scroll Camera', {
//     jumbotron: folder({
//       jumbotronPosX: { value: 3.38, min: -20, max: 20 },
//       jumbotronPosY: { value: -10.74, min: -20, max: 20 },
//       jumbotronPosZ: { value: -5.93, min: -20, max: 20 },
//       jumbotronTargetX: { value: 1.52, min: -10, max: 10 },
//       jumbotronTargetY: { value: 0.77, min: -10, max: 10 },
//       jumbotronTargetZ: { value: -1.08, min: -10, max: 10 },
//     }),
//     sound: folder({
//       soundPosX: { value: 11.56, min: -20, max: 20 },
//       soundPosY: { value: 15.0, min: -20, max: 20 },
//       soundPosZ: { value: 0.01, min: -20, max: 20 },
//       soundTargetX: { value: -0.55, min: -10, max: 10 },
//       soundTargetY: { value: 0.32, min: -10, max: 10 },
//       soundTargetZ: { value: 0.0, min: -10, max: 10 },
//     }),
//     display: folder({
//       displayPosX: { value: 9.36, min: -20, max: 20 },
//       displayPosY: { value: 10.95, min: -20, max: 20 },
//       displayPosZ: { value: 0.09, min: -20, max: 20 },
//       displayTargetX: { value: -1.62, min: -10, max: 10 },
//       displayTargetY: { value: 0.02, min: -10, max: 10 },
//       displayTargetZ: { value: -0.06, min: -10, max: 10 },
//     })
//   });

//   useEffect(() => {
//     const tl = gsap.timeline();

//     tl.to(cameraRef.current.position, {
//       x: controlValues.jumbotronPosX,
//       y: controlValues.jumbotronPosY,
//       z: controlValues.jumbotronPosZ,
//       scrollTrigger: {
//         trigger: '.sound-section',
//         start: 'top bottom',
//         end: 'top top',
//         scrub: 2,
//         immediateRender: false,
//       },
//       onUpdate: () => controlsRef.current.update(),
//     });

//     tl.to(controlsRef.current.target, {
//       x: controlValues.jumbotronTargetX,
//       y: controlValues.jumbotronTargetY,
//       z: controlValues.jumbotronTargetZ,
//       scrollTrigger: {
//         trigger: '.sound-section',
//         start: 'top bottom',
//         end: 'top top',
//         scrub: 2,
//         immediateRender: false,
//       },
//       onUpdate: () => controlsRef.current.update(),
//     }, '<');

//     tl.to('.jumbotron-section', {
//       opacity: 0,
//       scrollTrigger: {
//         trigger: '.sound-section',
//         start: 'top bottom',
//         end: 'top top',
//         scrub: 2,
//         immediateRender: false,
//       },
//     });

//     tl.to('.sound-section-content', {
//       opacity: 1,
//       scrollTrigger: {
//         trigger: '.sound-section',
//         start: 'top bottom',
//         end: 'top top',
//         scrub: 2,
//         immediateRender: false,
//       },
//     });

//     tl.to(cameraRef.current.position, {
//       x: controlValues.displayPosX,
//       y: controlValues.displayPosY,
//       z: controlValues.displayPosZ,
//       scrollTrigger: {
//         trigger: '.display-section',
//         start: 'top bottom',
//         end: 'top top',
//         scrub: 2,
//         immediateRender: false,
//       },
//       onUpdate: () => controlsRef.current.update(),
//     });

//     tl.to(controlsRef.current.target, {
//       x: controlValues.displayTargetX,
//       y: controlValues.displayTargetY,
//       z: controlValues.displayTargetZ,
//       scrollTrigger: {
//         trigger: '.display-section',
//         start: 'top bottom',
//         end: 'top top',
//         scrub: 2,
//         immediateRender: false,
//       },
//       onUpdate: () => controlsRef.current.update(),
//     }, '<');

//     tl.to('.display-section', {
//       opacity: 1,
//       scrollTrigger: {
//         trigger: '.display-section',
//         start: 'top bottom',
//         end: 'top top',
//         scrub: 2,
//         immediateRender: false,
//       },
//     });

//     return () => {
//       ScrollTrigger.getAll().forEach((t) => t.kill());
//     };
//   }, [cameraRef, controlsRef, controlValues]);

//   return null;
// };
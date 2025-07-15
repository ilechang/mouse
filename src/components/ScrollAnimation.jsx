// src/components/ScrollAnimation.jsx
import { useEffect } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

export const ScrollAnimation = ({ cameraRef, controlsRef, isMobile }) => {
  useEffect(() => {
    if (!cameraRef.current || !controlsRef.current) return;

    // ✅ 固定 jumbotron 起始攝影機位置與目標（不要 clone，直接指定）
    const jumbotronCamPos = {
      x: 13.04,
      y: -2,
      z: 2.29,
    };
    const jumbotronTarget = {
      x: 0.11,
      y: 0.0,
      z: 0.0,
    };

    // ✅ 中間位置（sound-section）
    const soundCamPos = {
      x: isMobile ? -7.0 : -3.38,
      y: isMobile ? -12.2 : -10.74,
      z: isMobile ? -6.0 : -5.93,
    };
    const soundTarget = {
      x: isMobile ? 0.7 : 1.52,
      y: isMobile ? 1.9 : 0.77,
      z: isMobile ? 0.7 : -1.08,
    };

    // ✅ 最後位置（display-section）
    const displayCamPos = {
      x: isMobile ? 9.36 : 1.56,
      y: isMobile ? 10.95 : 5.0,
      z: isMobile ? 0.09 : 0.01,
    };
    const displayTarget = {
      x: isMobile ? -1.62 : -0.55,
      y: isMobile ? 0.02 : 0.32,
      z: isMobile ? -0.06 : 0.0,
    };

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

    // 🎯 第1段：jumbotron → sound
    tl.fromTo(cameraRef.current.position, jumbotronCamPos, {
      ...soundCamPos,
      onUpdate: () => controlsRef.current.update(),
    });

    tl.fromTo(controlsRef.current.target, jumbotronTarget, {
      ...soundTarget,
      onUpdate: () => controlsRef.current.update(),
    }, '<');

    tl.to('.jumbotron-section', { opacity: 0 }, '<');
    tl.to('.sound-section-content', { opacity: 1 }, '<');

    // 🎯 第2段：sound → display
    tl.to(cameraRef.current.position, {
      ...displayCamPos,
      onUpdate: () => controlsRef.current.update(),
    });

    tl.to(controlsRef.current.target, {
      ...displayTarget,
      onUpdate: () => controlsRef.current.update(),
    }, '<');

    tl.to('.display-section', { opacity: 1 }, '<');

    return () => {
      ScrollTrigger.getAll().forEach(t => t.kill());
    };
  }, [cameraRef, controlsRef, isMobile]);

  return null;
};












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
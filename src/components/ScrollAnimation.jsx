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

    // const axesHelper = new THREE.AxesHelper(5);
    // cameraRef.current.parent?.add(axesHelper);

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
      // axesHelper.add(sprite);
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
      // axesHelper.removeFromParent();
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







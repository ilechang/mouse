import { useEffect, useRef } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

export default function PhysicalFeatures() {
  const containerRef = useRef(null)
  const imageRef = useRef(null)

  useEffect(() => {
    const ctx = gsap.context(() => {
      // 滑鼠圖片動畫
      gsap.fromTo(
        imageRef.current,
        {
          opacity: 0,
          x: '-60vw',
        },
        {
          opacity: 1,
          x: 0,
          duration: 1,
          ease: 'power2.out',
          scrollTrigger: {
            trigger: containerRef.current,
            start: 'top bottom-=300',
            toggleActions: 'play none none none',
          },
        }
      );

      // features 標題逐字動畫
      gsap.to('.feature-letter', {
        opacity: 1,
        y: 0,
        stagger: 0.03,
        duration: 0.6,
        ease: 'power2.out',
        scrollTrigger: {
          trigger: containerRef.current,
          start: 'top bottom-=300',
          toggleActions: 'play none none none',
        },
      });
    }, containerRef); // ✅ wrap everything inside one context

    return () => ctx.revert();
  }, []);


  return (
    <div
      ref={containerRef}
      style={{
        height: '100vh',
        background: 'linear-gradient(to bottom, white 20%, rgb(31, 31, 31) 20%)',
        position: 'relative',
        overflow: 'hidden',
      }}
    >
      <h1
        style={{
          fontSize: '6vw',
          color: 'black',
          margin: 0,
          display: 'flex',
          gap: '0.1em',
          position: 'absolute',
          top: '5%',
          left: '40%',
          transform: 'translateX(-50%)',
        }}
      >
        {'Final Design'.split('').map((char, index) => (
          <span
            key={index}
            className="feature-letter"
            style={{
              opacity: 0,
              transform: 'translateY(20px)',
              display: 'inline-block',
            }}
          >
            {char}
          </span>
        ))}
      </h1>

      <img
        ref={imageRef}
        src="./perspective.png"
        alt="Mouse"
        style={{
          position: 'absolute',
          top: '0%',
          right: '10%',
          width: '40vw',
          maxWidth: '500px',
        }}
      />
    </div>
  )
}

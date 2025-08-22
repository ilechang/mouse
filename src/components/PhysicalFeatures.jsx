import { useEffect, useRef, useState } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

export default function PhysicalFeatures() {
  const containerRef = useRef(null)
  const imageRef = useRef(null)
  const [isMobile, setIsMobile] = useState(false)

  useEffect(() => {
    const checkSize = () => setIsMobile((window.visualViewport?.width || window.innerWidth) <= 1150)
    checkSize()
    window.visualViewport?.addEventListener('resize', checkSize)
    window.addEventListener('resize', checkSize)

    const ctx = gsap.context(() => {
      // 滑鼠圖片動畫
      gsap.fromTo(
        imageRef.current,
        { opacity: 0, x: '-60vw' },
        {
          opacity: 1,
          x: 0,
          duration: 1.1,
          ease: 'power2.out',
          scrollTrigger: {
            trigger: containerRef.current,
            start: 'top bottom-=300',
            toggleActions: 'play none none none',
          },
        }
      )

      // 標題逐字動畫
      gsap.to('.feature-letter', {
        opacity: 1,
        y: 0,
        stagger: 0.06,
        duration: 0.6,
        ease: 'power2.out',
        scrollTrigger: {
          trigger: containerRef.current,
          start: 'top bottom-=300',
          toggleActions: 'play none none none',
        },
      })
    }, containerRef)

    return () => {
      ctx.revert()
      window.visualViewport?.removeEventListener('resize', checkSize)
      window.removeEventListener('resize', checkSize)
    }
  }, [])

  return (
    <div
      ref={containerRef}
      style={{
        minHeight: '120vh',
        display: 'flex',
        flexDirection: 'column',
        position: 'relative',
        overflow: 'hidden',
        paddingBottom: '80px',
        backgroundImage:
          'linear-gradient(to bottom, white 0%, white 20%, rgba(255,255,255,0) 20%), url("./hex.webp")',
        backgroundSize: '100% 100%, cover',
        backgroundPosition: 'top left, center',
        backgroundRepeat: 'no-repeat, no-repeat',
        backgroundAttachment: 'scroll, fixed',
      }}
    >
      {/* ===== 上方標題與大圖 ===== */}
      <div style={{ flex: '0 0 auto', position: 'relative' }}>
        <h1
          style={{
            fontSize: '6vw',
            color: 'black',
            margin: 0,
            display: 'flex',
            gap: '0.1em',
            position: 'absolute',
            top: '50px',
            left: '48%',
            transform: 'translateX(-50%)',
          }}
          className="p-5"
        >
          <div style={{ display: 'flex', gap: '0px' }}>
            {'Final Design'.split('').map((char, index) =>
              char === ' ' ? (
                <span key={index} style={{ display: 'inline-block', width: '0.2em' }} />
              ) : (
                <span
                  key={index}
                  className="feature-letter fw-bold"
                  style={{
                    opacity: 0,
                    transform: 'translateY(20px)',
                    display: 'inline-block',
                  }}
                >
                  {char}
                </span>
              )
            )}
          </div>
        </h1>

        <img
          ref={imageRef}
          src="./perspective.png"
          alt="Mouse"
          style={{
            position: 'absolute',
            top: '0px',
            right: '5%',
            width: '35vw',
            maxWidth: '700px',
          }}
        />
      </div>

      {/* ===== Forepalm Support（深色區） ===== */}
      <div style={{ flex: 1, display: 'flex', flexDirection: 'column', justifyContent: 'flex-start', marginTop: '30px' }}>
        <div
          style={{
            display: 'flex',
            flexWrap: 'wrap',
            justifyContent: 'center',
            alignItems: 'center',
            gap: '3rem',
            padding: '2rem',
            marginTop: '50vh',
            color: '#fff',
            // 👉 手機/平板時往左偏移一點點
            transform: isMobile ? 'translateX(-4vw)' : 'none',
            transition: 'transform 0.25s ease',
          }}
          className="mx-auto"
        >
          <div style={{ flex: '0 0 auto', textAlign: 'center' }}>
            <img src="./vent.webp" alt="Dual-Layer Design" style={{ width: '550px', maxWidth: '90vw', height: 'auto' }} />
          </div>
          <div style={{ flex: '0 0 auto', textAlign: 'center' }}>
            <img src="./grip.webp" alt="Wrist & Forepalm Support" style={{ width: '300px', maxWidth: '60vw', height: 'auto' }} />
          </div>
        </div>

        <h1 className="display-6 fw-bold mb-3 mt-4 text-center mx-auto">
          Forepalm Support with Maximum Ventilation
        </h1>

        <span className="text-center mx-auto" style={{ maxWidth: '1000px' }}>
          The mouse supports the user’s forepalm, allowing the wrist to rest naturally on the desk
          while leaving a gap in the palm for airflow. Combined with a dual-layer structure and
          ventilation ports, it enhances overall breathability and comfort, keeping the hand dry
          even during extended use.
        </span>
      </div>
    </div>
  )
}














// import { useEffect, useRef } from 'react'
// import gsap from 'gsap'
// import { ScrollTrigger } from 'gsap/ScrollTrigger'


// gsap.registerPlugin(ScrollTrigger)

// export default function PhysicalFeatures() {
//   const containerRef = useRef(null)
//   const imageRef = useRef(null)

//   useEffect(() => {
//     const ctx = gsap.context(() => {
//       // 滑鼠圖片動畫
//       gsap.fromTo(
//         imageRef.current,
//         { opacity: 0, x: '-60vw' },
//         {
//           opacity: 1,
//           x: 0,
//           duration: 1.1,
//           ease: 'power2.out',
//           scrollTrigger: {
//             trigger: containerRef.current,
//             start: 'top bottom-=300',
//             toggleActions: 'play none none none',
//           },
//         }
//       )

//       // 標題逐字動畫
//       gsap.to('.feature-letter', {
//         opacity: 1,
//         y: 0,
//         stagger: 0.06,
//         duration: 0.6,
//         ease: 'power2.out',
//         scrollTrigger: {
//           trigger: containerRef.current,
//           start: 'top bottom-=300',
//           toggleActions: 'play none none none',
//         },
//       })
//     }, containerRef)

//     return () => ctx.revert()
//   }, [])

//   return (
//     <div
//       ref={containerRef}
//       style={{
//         minHeight: '120vh',
//         display: 'flex',
//         flexDirection: 'column',
//         position: 'relative',
//         overflow: 'hidden',
//         paddingBottom: '80px',
    
//         // 上層：前 20% 白色；之後透明
//         // 下層：hex.png
//         backgroundImage:
//           'linear-gradient(to bottom, white 0%, white 20%, rgba(255,255,255,0) 20%), url("./hex.webp")',
//         backgroundSize: '100% 100%, cover',
//         backgroundPosition: 'top left, center',
//         backgroundRepeat: 'no-repeat, no-repeat',
//         backgroundAttachment: 'scroll, fixed',
//       }}
//     >
//       {/* ===== 上方標題與大圖 ===== */}
//       <div style={{ flex: '0 0 auto', position: 'relative' }}>
//         <h1
//           style={{
//             fontSize: '6vw',
//             color: 'black',
//             margin: 0,
//             display: 'flex',
//             gap: '0.1em',
//             position: 'absolute',
//             top: '50px',
//             left: '48%',
//             transform: 'translateX(-50%)',
//           }}
//           className="p-5"
//         >
//           <div style={{ display: "flex", gap: "0px" }}>
//             {"Final Design".split("").map((char, index) => (
//               char === " " ? (
//                 <span
//                   key={index}
//                   style={{ display: "inline-block", width: "0.2em" }} // 調整空格寬度
//                 />
//               ) : (
//                 <span
//                   key={index}
//                   className="feature-letter fw-bold"
//                   style={{
//                     opacity: 0,
//                     transform: "translateY(20px)",
//                     display: "inline-block",
//                   }}
    
//                 >
//                   {char}
//                 </span>
//               )
//             ))}
//           </div>

//         </h1>

//         <img
//           ref={imageRef}
//           src="./perspective.png"
//           alt="Mouse"
//           style={{
//             position: 'absolute',
//             top: '0px',
//             right: '5%',
//             width: '35vw',
//             maxWidth: '700px',
//           }}
//         />
//       </div>

//       {/* ===== Forepalm Support（深色區） ===== */}
//       <div style={{ flex: 1, display: 'flex', flexDirection: 'column', justifyContent: 'flex-start', marginTop: '30px' }}>
//         <div
//           style={{
//             display: 'flex',
//             flexWrap: 'wrap',
//             justifyContent: 'center',
//             alignItems: 'center',
//             gap: '3rem',
//             padding: '2rem',
//             marginTop: '50vh',
//             color: '#fff',
//           }}
//           className="mx-auto "
//         >
//           <div style={{ flex: '0 0 auto', textAlign: 'center' }}>
//             <img src="./vent.webp" alt="Dual-Layer Design" style={{ width: '550px', height: 'auto' }} />
//           </div>
//           <div style={{ flex: '0 0 auto', textAlign: 'center' }}>
//             <img src="./grip.webp" alt="Wrist & Forepalm Support" style={{ width: '300px', height: 'auto' }} />
//           </div>
//         </div>

        

//         <h1 className="display-6 fw-bold mb-3 mt-4 text-center mx-auto ">Forepalm Support with Maximum Ventilation</h1>
           
//            <span className="text-center mx-auto " style={{ maxWidth: "1000px" }}>
//            The mouse supports the user’s forepalm, allowing the wrist to rest naturally on the desk
//           while leaving a gap in the palm for airflow. Combined with a dual-layer structure and
//           ventilation ports, it enhances overall breathability and comfort, keeping the hand dry
//           even during extended use.
//            </span>
      
//       </div>


//     </div>
//   )
// }

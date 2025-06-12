import { useRef, useEffect } from 'react'
import './index.css'
import logo from '/images/vlogo.webp'

function App() {
  const imgRef = useRef(null)
  const animatingRef = useRef(false)
  const isZoomedRef = useRef(false)

  const minScale = 4
  const maxScale = 60
  const duration = 600 // ms

  useEffect(() => {
    const img = imgRef.current
    if (!img) return

    // 初始狀態
    img.style.transform = `scale(${minScale})`
    img.style.opacity = '1'
    img.style.transition = 'none'
    img.style.willChange = 'transform, opacity'

    // ✅ 偷偷預播一次動畫（不讓使用者看到）
    img.style.visibility = 'hidden'
    requestAnimationFrame(() => {
      img.style.transition = `transform ${duration}ms ease, opacity ${duration}ms ease`
      img.style.transform = `scale(${maxScale})`
      img.style.opacity = '0'
      setTimeout(() => {
        // 重設回初始狀態，並顯示圖片
        img.style.transition = 'none'
        img.style.transform = `scale(${minScale})`
        img.style.opacity = '1'
        img.style.visibility = 'visible'
      }, duration + 50)
    })

    // ✅ 滾動觸發動畫
    const handleWheel = (e) => {
      if (animatingRef.current) return

      if (e.deltaY > 0 && !isZoomedRef.current) {
        // 播放 zoom in 動畫
        animatingRef.current = true
        playAnimation(minScale, maxScale, 1, 0, () => {
          isZoomedRef.current = true
        })
      } else if (e.deltaY < 0 && isZoomedRef.current) {
        // 播放 zoom out 動畫
        animatingRef.current = true
        playAnimation(maxScale, minScale, 0, 1, () => {
          isZoomedRef.current = false
        })
      }
    }

    window.addEventListener('wheel', handleWheel, { passive: true })
    return () => window.removeEventListener('wheel', handleWheel)
  }, [])

  const playAnimation = (fromScale, toScale, fromOpacity, toOpacity, onDone) => {
    const start = performance.now()

    const animate = (now) => {
      const elapsed = now - start
      const progress = Math.min(elapsed / duration, 1)
      const eased = easeInOut(progress)

      const currentScale = fromScale + (toScale - fromScale) * eased
      const currentOpacity = fromOpacity + (toOpacity - fromOpacity) * eased

      if (imgRef.current) {
        imgRef.current.style.transform = `scale(${currentScale})`
        imgRef.current.style.opacity = currentOpacity
      }

      if (progress < 1) {
        requestAnimationFrame(animate)
      } else {
        animatingRef.current = false
        if (imgRef.current) {
          imgRef.current.style.transform = `scale(${toScale})`
          imgRef.current.style.opacity = toOpacity
        }
        if (onDone) onDone()
      }
    }

    requestAnimationFrame(animate)
  }

  const easeInOut = (t) =>
    t < 0.5 ? 2 * t * t : -1 + (4 - 2 * t) * t

  return (
    <div className="container">
      <img
        ref={imgRef}
        src={logo}
        alt="logo"
        className="logo"
      />
    </div>
  )
}

export default App

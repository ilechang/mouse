import React from 'react'

export default function AdjustableWidth() {
  return (
    <section
      style={{
        background: '#fff',
        color: '#111',
        paddingTop: '4rem',

        paddingBottom: '100px'
      }}
    >
      {/* 圖組 */}
      <div
        style={{
          display: 'flex',
          flexWrap: 'wrap',
          justifyContent: 'center',
          alignItems: 'center',
          gap: '10rem',
          padding: '2rem',
        }}
        className="mx-auto py-5"
      >
        <div style={{ flex: '0 0 auto', textAlign: 'center' }} className="mt-5">
          <img src="./adjust.webp" alt="Adjustment" style={{ width: '300px', height: 'auto' }} />
        </div>
        <div style={{ flex: '0 0 auto', textAlign: 'center' }}>
          <img src="./width.webp" alt="Width Adjustment" style={{ width: '280px', height: 'auto' }} />
        </div>
      </div>

      {/* <div style={{ textAlign: 'center' }}>
        <h3
          style={{
            display: 'inline-block',
            paddingBottom: '0.3rem',
            borderBottom: '2px solid #111',
          }}
          className="pb-3"
        >
          Adjustable Width
        </h3>
      </div>

      <p
        style={{
          fontSize: '0.9rem',
          lineHeight: 1.6,
          maxWidth: '60%',
          margin: '0 auto',
          textAlign: 'center',
        }}
        className="pt-3"
      >
        Effortlessly tailor the mouse’s width with the bottom adjustment wheel to perfectly fit your hand.
        Make changes while holding the mouse and experience instant, tactile feedback for a truly personalized fit.
      </p> */}


      <h1 className="display-6 fw-bold mb-3 mt-4 text-center mx-auto ">    Adjustable Width</h1>
           
           <p className="text-center mx-auto " style={{ maxWidth: "1000px" }}>
           Effortlessly tailor the mouse’s width with the bottom adjustment wheel to perfectly fit your hand.
        Make changes while holding the mouse and experience instant, tactile feedback for a truly personalized fit.
           </p>
    </section>
  )
}

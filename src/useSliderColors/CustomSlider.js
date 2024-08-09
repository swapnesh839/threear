import React, { useState, useRef } from 'react';
import './style.css';

const CustomSlider = ({colorItems}) => {
  const sliderRef = useRef(null);

  // const scrollLeft = () => {
  //   if (sliderRef.current) {
  //     sliderRef.current.scrollLeft -= 100;
  //   }
  // };

  // const scrollRight = () => {
  //   if (sliderRef.current) {
  //     sliderRef.current.scrollLeft += 100;
  //   }
  // };

  return (
    <div className="position-absolute start-50 translate-middle-x bottom-0 overflow-scroll hidden-scrollbar" style={{ padding: '20px',zIndex:999,width:"fit-content" }}>
      {/* <button className="scroll-button left" onClick={scrollLeft}>‹</button> */}
      <div className="custom-slider" ref={sliderRef}>
        {colorItems.map((item, index) => (
          <div
            key={index}
            className={`slider-item ${item.className || ''}`}
            style={{ ...item.style, padding: '9px', borderRadius: '50%' }}
            onClick={item.onClick}
          ></div>
        ))}
      </div>
      {/* <button className="scroll-button right" onClick={scrollRight}>›</button> */}
    </div>
  );
};

export default CustomSlider;

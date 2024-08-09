import React, { useState } from 'react';
import './Courousal.css';

const Courousal = ({ maxwidth, width, items, height,zIndex}) => {
  const [activeIndex, setActiveIndex] = useState(0);

  // const rotateItems = () => {
  //   setActiveIndex((prevIndex) => (prevIndex + 1) % items.length);
  // };

  return (
    <div className="carousel-container d-flex bg-black position-absolute bottom-0 start-50" style={{ maxWidth: maxwidth, width: width, height: height ,zIndex:zIndex,transform: 'translateX(-50%)'}}>
      <div className="carousel m-auto bg-info">
        {items.map((item, index) => {
          const angle = (360 / items.length) * (index - activeIndex);
          return (
            <div
              key={index}
              onClick={()=>{setActiveIndex(index)}}
              className={`carousel-item border border-1 border-transparent ${index === activeIndex ? 'border-black active' : ''}`}
              style={{
                transform: `rotate(${angle}deg) translateX(120px)`,
                height: height / 6,
                width: width / 6,
              }}
            >
              {item}
            </div>
          );
        })}
      </div>
      {/* <button onClick={rotateItems} className="rotate-button">Rotate</button> */}
    </div>
  );
};

export default Courousal;

import React, { Suspense,  useEffect, useRef, useState } from 'react';
import { IfInSessionMode, XR, createXRStore, useXR } from '@react-three/xr';
import { Html, OrbitControls, useGLTF } from '@react-three/drei';
import glb from './pizza.glb';
import usdz from './Pizza.usdz';
import { GiExitDoor } from "react-icons/gi";
// import "./Ar.css"
import { Canvas } from '@react-three/fiber';
// import { useFrame } from '@react-three/fiber';
// import CustomSlider from './useSliderColors/CustomSlider';
import MoonLoader from "react-spinners/MoonLoader";
import { Vector3 } from 'three';

const store = createXRStore();

function Ar({ setIsglview }) {
  // const items = [
  //   { className: 'bg-danger', onClick: () => setColor('red') },
  //   { className: 'bg-info', onClick: () => setColor('#0DCAF0') },
  //   { style: { backgroundColor: '#6B38BB' }, onClick: () => setColor('#6B38BB') },
  //   { className: 'bg-success', onClick: () => setColor('#198754') },
  //   { style: { backgroundColor: 'yellow' }, onClick: () => setColor('yellow') },
  //   { style: { backgroundColor: 'skyblue' }, onClick: () => setColor('skyblue') },
  //   { style: { backgroundColor: 'pink' }, onClick: () => setColor('pink') },
  //   { style: { backgroundColor: '#A5AC7F' }, onClick: () => setColor('#A5AC7F') },
  // ]
  const modelRef = useRef();
  function Model({ color }) {
    const [scale, setScale] = useState([1, 1, 1]);

    const { scene } = useGLTF(glb, true);
    // console.log(scale);

    useGLTF.preload(glb)
    // Change the color of the model's material
    useEffect(() => {
      if (color) {
        scene.traverse((child) => {
          if (child.isMesh) {
            child.material.color.set(color);
          }
        });
      }
    }, [color, scene]);

    const updateScale = () => {
      const width = window.innerWidth;
      const height = window.innerHeight;
      // Example scaling factor: adjust as needed
      const scaleFactor = Math.min(width, height) / 1000;

      setScale([scaleFactor, scaleFactor, scaleFactor]);
    };
    useEffect(() => {
      updateScale();
      window.addEventListener('resize', updateScale);
      return () => window.removeEventListener('resize', updateScale);
    }, [])

    // useFrame(({ raycaster }) => {
    //   if (dragging) {
    //     modelRef.current.position.x = raycaster.mouse.x * 5; // Adjust the sensitivity
    //     modelRef.current.position.y = raycaster.mouse.y * 5;
    //   }
    // });
    console.log(scale);


    return <group>
      <primitive
        ref={modelRef} object={scene}
        rotation={[Math.PI / 10, 0, 0]}
        scale={[2, 2, 2]}
      // scale={scale}
      />
      <IfInSessionMode deny={['immersive-ar', 'immersive-vr']} >
        <OrbitControls />
      </IfInSessionMode>
    </group>
  }
  const [color, setColor] = useState(null)
  console.log(setColor);
  const GestureHandler = React.forwardRef((props, ref)=> {
    const { controllers } = useXR();
    // const { session } = useXR();
    // console.log(session);
    
    const modelRef = ref;
  
    // Pinch-to-zoom
    const handlePinch = React.useCallback((event) => {
      if (event.type === 'pinch') {
        const scale = event.scale;
        modelRef.current.scale.set(scale, scale, scale);
      }
    }, [modelRef]);
  
    // Drag-to-move
    const handlePan = React.useCallback((event) => {
      if (event.type === 'pan') {
        const delta = new Vector3(event.deltaX, event.deltaY, 0);
        modelRef.current.position.add(delta.multiplyScalar(0.01));
      }
    }, [modelRef]);
  
    // Rotate-to-spin
    const handleRotate = React.useCallback((event) => {
      if (event.type === 'rotate') {
        const rotation = event.rotation;
        modelRef.current.rotation.y += rotation * 0.01;
      }
    }, [modelRef]);
  
    // Update gesture handlers on each frame
    React.useEffect(() => {
      if (controllers) {
        controllers.forEach(controller => {
          controller.addEventListener('pinch', handlePinch);
          controller.addEventListener('pan', handlePan);
          controller.addEventListener('rotate', handleRotate);
        });
  
        return () => {
          controllers.forEach(controller => {
            controller.removeEventListener('pinch', handlePinch);
            controller.removeEventListener('pan', handlePan);
            controller.removeEventListener('rotate', handleRotate);
          });
        };
      }
    }, [controllers, handlePinch, handlePan, handleRotate]);
  
    return null;
  })

  const Arview = () => {

    const isIOS = /iPad|iPhone|iPod/.test(navigator.userAgent) && !window.MSStream;
    if (isIOS) {
      window.location.href = usdz;
    } else {
      store.enterAR()
    }
  }

  const [showinfo, setshowinfo] = useState(false)
  const Alert = () => {
    setshowinfo(e => !e)
  }
  const [isARSupported, setIsARSupported] = useState(null);

  useEffect(() => {
    async function checkSupport() {
      if (navigator.xr ) {
        setIsARSupported(true);
      } else {
        setIsARSupported(false);
      }
    }
  
    checkSupport();
  })

  return (
    <Suspense fallback={<Loader />}>
      <div style={{ height: '100svh', position: 'relative' }} className='overflow-hidden'>
        {showinfo && <div className='position-absolute p-50 top-50 start-50 rounded-3 translate-middle bg-white' style={{ zIndex: 999999999999999 }}>
          <div className='p-3' style={{ minWidth: "400px", maxWidth: "100%", height: "300px", maxHeight: "100%" }}>
            <button
              onClick={() => Alert()}
              className='position-absolute top-0 end-0'
              style={{
                backgroundColor: "transparent",
                border: "0px solid black",
                borderRadius: "50%",
                width: "40px",
                height: "40px",
                zIndex: 99999999,
                fontSize: "16px",
                fontWeight: "bold",
                cursor: "pointer",
              }}
            >
              X
            </button>
            <div className='w-100 h-100 p-1'>
              <div className='row'>
                <p className='text-center mx-auto w-100 border-bottom mt-2'>Presented By Realitiq XR</p>
                <div>
                  <p className='mx-auto w-100 mt-2 fs-3'>The dish:</p>
                  <span className='text-center mx-auto w-100 mt-2'>The original pizza margherita with tomato sauce, mozarella and a touch of fresh basil.</span>
                </div>
              </div>
            </div>
          </div>
        </div>
        }
        <img style={{ width: "160px", zIndex: 9990 }} className='position-absolute top-0 rounded-2 start-0' src='/logo.png' alt='logo' />
        <GiExitDoor onClick={() => setIsglview(false)} size={40} style={{ zIndex: 9990, cursor: 'pointer' }} className='position-absolute d-none border top-0 border-black rounded-circle p-1 end-0 m-3' src='/logo.png' alt='logo' />
        {isARSupported && <button
          style={{
            padding: '7px 12px', bottom: "10px"
          }}

          onClick={Arview}
          className='btn btn-info position-absolute start-50 translate-middle-x m-2'
        >
          View AR
        </button>}
        <Canvas id='main-canvas' style={{ height: '100%' }}>
          <group position={[0, 0, 0]}
          >
            <XR store={store}>
              <GestureHandler ref={modelRef}/>
              <ambientLight intensity={2} />
              <directionalLight lookAt={[0, 0, 0]} intensity={2} position={[5, 5, 5]} />
              <directionalLight lookAt={[0, 0, 0]} intensity={2} position={[5, -5, 5]} />
              <directionalLight lookAt={[0, 0, 0]} intensity={2} position={[-5, -5, 5]} />
              <directionalLight lookAt={[0, 0, 0]} intensity={2} position={[-5, 5, 5]} />

              <Html as='div'
                occlude={[modelRef]}
                // fullscreen={showinfo}
                style={{ userSelect: 'none', transform: 'scale(0.5)' }}
                // zIndexRange={[0, 0]}
                // renderOrder={1}
                // eps={0.01}
                className={"draiHtml"}
                // sprite
                position={showinfo ? [0, 0, 0] : [0, 1, -1]}
                transform={!showinfo} >
                {!showinfo && <div
                  style={{
                    display: "flex",
                    alignItems: "center",
                    padding: "10px",
                    borderRadius: "15px",
                    backgroundColor: "#FFFFFF",
                    boxShadow: "0px 0px 10px rgba(0, 0, 0, 0.1)",
                    // width: "200px",
                    justifyContent: "space-between",
                    zIndex: 2
                  }}
                >
                  <div style={{ flex: 1, marginRight: "10px" }}>
                    <p style={{ fontSize: "14px", fontWeight: "bold", margin: 0 }}>
                      Pizza Margherita
                    </p>
                    <p style={{ fontSize: "14px", fontWeight: "bold", margin: 0 }}>
                      150 ₹
                    </p>
                  </div>
                  <div style={{ display: "flex", alignItems: "center" }}>
                    <button
                      onClick={() => Alert()}
                      style={{
                        backgroundColor: "transparent",
                        border: "1px solid black",
                        borderRadius: "50%",
                        width: "40px",
                        height: "40px",
                        zIndex: 1,
                        fontSize: "16px",
                        fontWeight: "bold",
                        cursor: "pointer",
                      }}
                    >
                      i
                    </button>
                  </div>
                </div>}
              </Html>
              {/* <OrbitControls autoRotate /> */}
              <Model color={color} />
            </XR>
          </group>
        </Canvas>
      </div>
    </Suspense >
  );
}

const Loader = () => {
  return <div className='vh-100 w-100 d-flex justify-content-center align-items-center'>
    <MoonLoader color='#19002D' size={150} />
  </div>;
}
export default Ar;

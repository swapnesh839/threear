import React, { useEffect, useState } from 'react'
import Ar from './Ar'
import "./App.css"
import { Canvas } from '@react-three/fiber';
// import { useFrame } from '@react-three/fiber';
import CustomSlider from './useSliderColors/CustomSlider';

import { Html } from '@react-three/drei';
const store = createXRStore();

function App() {
  const items = [
    { className: 'bg-danger', onClick: () => setColor('red') },
    { className: 'bg-info', onClick: () => setColor('#0DCAF0') },
    { style: { backgroundColor: '#6B38BB' }, onClick: () => setColor('#6B38BB') },
    { className: 'bg-success', onClick: () => setColor('#198754') },
    { style: { backgroundColor: 'yellow' }, onClick: () => setColor('yellow') },
    { style: { backgroundColor: 'skyblue' }, onClick: () => setColor('skyblue') },
    { style: { backgroundColor: 'pink' }, onClick: () => setColor('pink') },
    { style: { backgroundColor: '#A5AC7F' }, onClick: () => setColor('#A5AC7F') },
  ]
  function Model({ color }) {
    const [scale, setScale] = useState([1, 1, 1]);
    const { scene } = useGLTF(glb, true, (progress) => {
      console.log(`Loading: ${progress.loaded} / ${progress.total}`);
    });
    useGLTF.preload()
    const modelRef = useRef();
    // const [dragging, setDragging] = useState(false);
    // const [initialPointerPosition, setInitialPointerPosition] = useState([0, 0]);

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

    return <primitive
      // onPointerDown={(e) => {
      //   setDragging(true);
      //   setInitialPointerPosition([e.clientX, e.clientY]);
      // }}
      // onPointerUp={() => setDragging(false)}
      // onPointerMove={(e) => {
      //   if (dragging) {
      //     const [initialX, initialY] = initialPointerPosition;
      //     const deltaX = e.clientX - initialX;
      //     const deltaY = e.clientY - initialY;

      //     modelRef.current.position.x += deltaX * 0.01; // Adjust the sensitivity
      //     modelRef.current.position.y -= deltaY * 0.01;

      //     setInitialPointerPosition([e.clientX, e.clientY]);
      //   }
      // }}
      ref={modelRef} object={scene} scale={scale} />;
  }
  const [color, setColor] = useState(null)
  const Arview = () => {
    const isIOS = /iPad|iPhone|iPod/.test(navigator.userAgent) && !window.MSStream;
    if (isIOS) {
      window.location.href = usdz;
    } else {
      if (document.fullscreenElement || document.webkitFullscreenElement || document.msFullscreenElement) {
        if (document.exitFullscreen) {
          document.exitFullscreen();
        } else if (document.webkitExitFullscreen) { /* Safari */
          document.webkitExitFullscreen();
        } else if (document.msExitFullscreen) { /* IE11 */
          document.msExitFullscreen();
        }
      }
    }
  }, [isglview]);

  return (
    <div style={{ height: '100vh', position: 'relative' }} className='overflow-hidden'>
      <img style={{ width: "160px", zIndex: 9990 }} className='position-absolute top-0 rounded-2 start-0' src='/logo.png' alt='logo' />
      <button

        style={{
          padding: '7px 12px'
        }}
        onClick={Arview}
        className='btn btn-outline-info position-absolute top-50 m-2'
      >
        Enter AR
      </button>

      {/* <div style={{ zIndex: 9999 }} className='position-absolute mt-4 d-flex bg-transparent justify-content-center align-content-center w-100 top-0 start-50 translate-middle-x'>
        <span onClick={() => setColor(null)} className='p-3 btnhvr rounded-circle  mx-2'>X</span >
        <span onClick={() => setColor('red')} className='p-3 btnhvr rounded-circle bg-danger mx-2'></span>
        <span onClick={() => setColor('blue')} className='p-3 btnhvr rounded-circle bg-info mx-2'></span>
        <span onClick={() => setColor('green')} className='p-3 btnhvr rounded-circle bg-success mx-2'></span >
        </div> */}
      {/* <CustomSlider colorItems={items} color={color} setColor={setColor} /> */}
      <Canvas id='main-canvas' style={{ height: '100%' }}>
        <group position={[0, -1, 0]}>
          <ambientLight intensity={2} />
          <directionalLight lookAt={[0, 0, 0]} intensity={2} position={[5, 5, 5]} />
          <directionalLight lookAt={[0, 0, 0]} intensity={2} position={[5, -5, 5]} />
          <directionalLight lookAt={[0, 0, 0]} intensity={2} position={[-5, -5, 5]} />
          <directionalLight lookAt={[0, 0, 0]} intensity={2} position={[-5, 5, 5]} />
          <OrbitControls
          maxPolarAngle={Math.PI / 2.5}
          maxDistance={5}
          // minAzimuthAngle={Math.PI / 2.5}
          // autoRotate 
          />
          <XR className="w-100 h-100" store={store}>
            <Model color={color} />
            <Html
              position={[0, 2, -1]} scale={[1, 1, 1]} rotation={[0, 0, 0]} transform distanceFactor={2}>
              <CustomSlider colorItems={items} color={color} setColor={setColor} />
            </Html>
          </XR>
        </group>
      </Canvas>
    </div>
  );
}

export default App
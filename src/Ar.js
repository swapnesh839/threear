import React, { Suspense, useEffect, useRef, useState } from 'react';
import { XR, createXRStore } from '@react-three/xr';
import { Gltf, OrbitControls, useGLTF } from '@react-three/drei';
import glb from './asset.glb';
import usdz from './asset.usdz';
import { GiExitDoor } from "react-icons/gi";
import { Canvas } from '@react-three/fiber';
import CustomSlider from './useSliderColors/CustomSlider';
import MoonLoader from "react-spinners/MoonLoader";

const store = createXRStore({depthSensing: true});

function Ar({ setIsglview }) {
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

    return <primitive
      ref={modelRef} object={scene} scale={scale} />;
  }
  const [color, setColor] = useState(null)
  const isIOS = /iPad|iPhone|iPod/.test(navigator.userAgent) && !window.MSStream;
  const Arview = () => {
    if (isIOS) {
      window.location.href = usdz;
    } else {
      store.enterAR()
    }
  }

  return (
    <Suspense fallback={<Loader />}>
      <div style={{ height: '100vh', position: 'relative' }} className='overflow-hidden'>
        <img style={{ width: "160px", zIndex: 9990 }} className='position-absolute top-0 rounded-2 start-0' src='/logo.png' alt='logo' />
        <GiExitDoor onClick={() => setIsglview(false)} size={40} style={{ zIndex: 9990, cursor: 'pointer', }} className='position-absolute border top-0 border-black rounded-circle p-1 end-0 m-3' src='/logo.png' alt='logo' />
        <button
          style={{
            padding: '7px 12px', bottom: "70px"
          }}
          onClick={Arview}
          className='btn btn-info position-absolute start-50 translate-middle-x m-2'
        >
          View AR
        </button>
        <CustomSlider colorItems={items} color={color} setColor={setColor} />
        <Canvas id='main-canvas' style={{ height: '100%' }}>
          <group position={[0, 0, 0]}>
              <ambientLight intensity={2} />
              <directionalLight lookAt={[0, 0, 0]} intensity={2} position={[5, 5, 5]} />
              <directionalLight lookAt={[0, 0, 0]} intensity={2} position={[5, -5, 5]} />
              <directionalLight lookAt={[0, 0, 0]} intensity={2} position={[-5, -5, 5]} />
              <directionalLight lookAt={[0, 0, 0]} intensity={2} position={[-5, 5, 5]} />
              <OrbitControls autoRotate />
              <Model color={color} />
              {!isIOS && (
              <XR store={store}>
                <Gltf src={glb} />
              </XR>
            )}
          </group>
        </Canvas>
      </div>
    </Suspense>
  );
}

const Loader = () => {
  return <div className='vh-100 w-100 d-flex justify-content-center align-items-center'>
    <MoonLoader color='#19002D' size={150} />
  </div>;
}
export default Ar;

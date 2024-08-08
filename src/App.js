import React, { useEffect } from 'react';
import { XR, createXRStore } from '@react-three/xr';
import { OrbitControls, useGLTF } from '@react-three/drei';
import glb from './asset.glb';
import { Canvas, useThree } from '@react-three/fiber';

const store = createXRStore();

function App() {
  function Model({ color }) {
    const { scene } = useGLTF(glb);
    return (
      <primitive object={scene} scale={[.9, .9, .9]} />
    );
  }

  return (
    <div style={{ height: '100vh', position: 'relative' }}>
      <button
        style={{
          position: 'absolute',
          top: '90%',
          left: '50%',
          transform: 'translateX(-50%)',
          zIndex: 999,
          padding: '7px 12px'
        }}
        onClick={() => {
          store.enterAR();
        }}
      >
        Enter AR
      </button>
      <Canvas style={{ height: '100%' }}>
        <ambientLight intensity={2} />
        <directionalLight lookAt={[0, 0, 0]} intensity={2} position={[5, 5, 5]} />
        <directionalLight lookAt={[0, 0, 0]} intensity={2} position={[5, -5, 5]} />
        <directionalLight lookAt={[0, 0, 0]} intensity={2} position={[-5, -5, 5]} />
        <directionalLight lookAt={[0, 0, 0]} intensity={2} position={[-5, 5, 5]} />
        <OrbitControls autoRotate />
        <XR store={store}>
          <Model color={'#ff0000'} />
        </XR>
      </Canvas>
    </div>
  );
}

export default App;

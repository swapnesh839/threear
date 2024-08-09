// src/components/ARImageTracking.js
import React, { useEffect, useRef, useState } from 'react';
import { Canvas } from '@react-three/fiber';
import { useGLTF } from '@react-three/drei';
import { MindAR } from 'mind-ar';
import glb from './asset.glb';

// Load the GLB model
const Model = () => {
    const { scene } = useGLTF(glb); // Path to your .glb file
    return <primitive object={scene} scale={[1, 1, 1]} />;
};

const ARImageTracking = () => {
    const arContainerRef = useRef(null);
    const [targetFound, setTargetFound] = useState(false);

    useEffect(() => {
        if (!arContainerRef.current) return;

        // Initialize MindAR
        const mindar = new MindAR({
            container: arContainerRef.current,
            imageTargets: ['/logo.png'], // Path to your image target
        });

        mindar.addEventListener('onTargetFound', () => {
            console.log('Target found');
            setTargetFound(true);
        });

        mindar.addEventListener('onTargetLost', () => {
            console.log('Target lost');
            setTargetFound(false);
        });

        mindar.start();

        // Clean up on component unmount
        return () => {
            mindar.stop();
            mindar.removeAllListeners();
        };
    }, []);

    return (
        <div ref={arContainerRef} style={{ width: '100vw', height: '100vh' }}>
            {targetFound && (
                <Canvas style={{ position: 'absolute', top: 0, left: 0, width: '100%', height: '100%' }}>
                    <ambientLight />
                    <pointLight position={[10, 10, 10]} />
                    <Model />
                </Canvas>
            )}
        </div>
    );
};

export default ARImageTracking;

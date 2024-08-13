import { Canvas, useThree } from '@react-three/fiber'
import {  createXRStore, XR } from '@react-three/xr'
import { useEffect } from 'react'
import { PointerLockControls, useGLTF } from '@react-three/drei'
import glb from "./asset.glb"
// import { Vector3 } from 'three'

const store = createXRStore({
  hand: { teleportPointer: true },
  controller: { teleportPointer: true },
})

const Modal = () => {

  return <primitive object={useGLTF(glb).scene} position={[0, 0, 0]} />
}
function Foo() {
  const { size } = useThree()
  useEffect(() => {
    console.log(size)
  }, [size])
  return null
}

export default function App() {
  // const [position, setPosition] = useState(new Vector3())
  return (
    <>
      <button onClick={() => store.enterVR()}>Enter VR</button>
      <button onClick={() => store.enterAR()}>Enter AR</button>
      <Canvas style={{ width: '100%', flexGrow: 1 }}>
        <Foo />
        <XR store={store}>
          <ambientLight />
          {/* <XROrigin position={position} /> */}
          <Modal />
          <PointerLockControls/>
        </XR>
      </Canvas>
    </>
  )
}

// function Cube() {
//   const ref = useRef(null)
//   const hover = useHover(ref)
//   return (
//     <mesh
//       onClick={() => store.setHand({ rayPointer: { cursorModel: { color: 'green' } } }, 'right')}
//       position={[0, 2, 0]}
//       pointerEventsType={{ deny: 'grab' }}
//       ref={ref}
//     >
//       <boxGeometry />
//       <meshBasicMaterial color={hover ? 'red' : 'blue'} />
//     </mesh>
//   )
// }

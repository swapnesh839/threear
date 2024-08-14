import React, {  useState } from 'react'
import Ar from './Ar'
import "./App.css"

const App = () => {
  const [isglview, setIsglview] = useState(true)

  // useEffect(() => {
  //   const element = document.documentElement;

  //   if (isglview) {
  //     if (element.requestFullscreen) {
  //       element.requestFullscreen();
  //     } else if (element.webkitRequestFullscreen) { /* Safari */
  //       element.webkitRequestFullscreen();
  //     } else if (element.msRequestFullscreen) { /* IE11 */
  //       element.msRequestFullscreen();
  //     }
  //   } else {
  //     if (document.fullscreenElement || document.webkitFullscreenElement || document.msFullscreenElement) {
  //       if (document.exitFullscreen) {
  //         document.exitFullscreen();
  //       } else if (document.webkitExitFullscreen) { /* Safari */
  //         document.webkitExitFullscreen();
  //       } else if (document.msExitFullscreen) { /* IE11 */
  //         document.msExitFullscreen();
  //       }
  //     }
  //   }
  // }, [isglview]);

  return (
    <React.Fragment>
      {isglview ? <Ar setIsglview={setIsglview} /> :
        <div className='vw-100 vh-100 position-relative d-flex'>
          <p className='m-auto fw-bold fs-1 p-2 text-center text-capitalize'>Experience WebGl and AR with Us</p>
          <button
            style={{
              padding: '7px 12px', bottom: "70px"
            }}
            // onClick={() => setIsglview(true)}
            className='btn btn-info position-absolute start-50 translate-middle-x m-2'
          >WebGl View</button>
          <img style={{ width: "160px", zIndex: 9990 }} className='position-absolute top-0 rounded-2 start-0' src='/logo.png' alt='logo' />
        </div>}
    </React.Fragment>
  )
}

export default App
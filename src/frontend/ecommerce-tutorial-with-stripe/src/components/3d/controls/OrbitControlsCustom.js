import React, { useRef, useEffect } from 'react';
import { useThree, extend, useFrame } from 'react-three-fiber';
import {OrbitControls} from 'three/examples/jsm/controls/OrbitControls'; 

extend({OrbitControls});
const OrbitControlsCustom = () => {
    const {
        camera,
        gl: { domElement },
      } = useThree();
      const controls = useRef();
      useFrame((state) => controls.current.update());
      useEffect(()=> {
        camera.position.set(0,0,10)
        controls.current.enableDamping = true;
        controls.current.enablePan = false;
        controls.current.dampingFactor = 0.1;
        controls.current.minDistance = 5;
        controls.current.maxDistance = 10;
      })
      return <orbitControls ref={controls} args={[camera, domElement]} />;
};

export default OrbitControlsCustom;
import React from "react";
import { useLoader } from 'react-three-fiber';
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader'

const Bag = () => {
    const gltf = useLoader(GLTFLoader,  '/bag_pbr/scene.gltf')
    return <primitive object={gltf.scene} position={[0,2,0]} scale={[0.1,0.1,0.1]} rotation={[0, Math.PI/2,0]} dispose={null} />
};

export default Bag;












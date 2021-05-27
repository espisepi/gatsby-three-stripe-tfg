import React, {Suspense} from "react"
import { graphql, StaticQuery } from "gatsby"
import {Canvas} from 'react-three-fiber'
import Bag from '../3d/Bag'
import OrbitControlsCustom from '../3d/controls/OrbitControlsCustom'
import * as THREE from 'three'
import UI from '../3d/UI'
import Stars from '../3d/Stars'

const Loading = () => {
  return (
      <mesh visible position={[0, 0, 0]} rotation={[0, 0, 0]}>
        <sphereGeometry attach="geometry" args={[1, 16, 16]} />
        <meshStandardMaterial
          attach="material"
          color="white"
          transparent
          opacity={0.6}
          roughness={1}
          metalness={0}
        />
      </mesh>
    );
}

const Products = () => {
  return (
    <StaticQuery
      query={graphql`
      query ProductPrices {
        prices: allStripePrice(
          filter: { active: { eq: true } }
          sort: { fields: [unit_amount] }
        ) {
          edges {
            node {
              id
              active
              currency
              unit_amount
              product {
                id
                name
                images
              }
            }
          }
        }
      }
      `}
      render={({ prices }) => {
        const products = {}
        const proxyUrl = 'https://cors-anywhere.herokuapp.com/'
        for (const { node: price } of prices.edges) {
          const product = price.product
          if (!products[product.id]) {
            products[product.id] = product
            products[product.id].prices = []
            // Se utiliza trycatch porque el codigo falla al ejecutar "gatsby build"
            try{
              products[product.id].texture = new THREE.TextureLoader().load(proxyUrl + products[product.id].images[0])
            }catch(e){
              console.log(e)
            }
          }
          products[product.id].prices.push(price)
        }

        return (
          <Canvas style={{width:'100%', height:'100vh', background:'#2a9d8f', display:'block'}}>
            <ambientLight />
            <pointLight position={[10, 10, 10]} />
            <Stars />
            <Suspense fallback={<Loading />}>
              <Bag />
              <UI products={products}/>
            </Suspense>
            <OrbitControlsCustom />
          </Canvas>
        )
      }}
    />
  )
}

export default Products

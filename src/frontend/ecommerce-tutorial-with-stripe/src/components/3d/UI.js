import React from "react";
import * as THREE from 'three'
import getStripe from "../../utils/stripejs"

const UI = ({products}) => {

    const handleClick = async (event, idProduct) => {
        const product = products[idProduct]
        const stripe = await getStripe()
        const { error } = await stripe.redirectToCheckout({
          mode: "payment",
          lineItems: [{ price:product.prices[0].id, quantity: 1 }],
          successUrl: `${window.location.origin}/page-2/`,
          cancelUrl: `${window.location.origin}/`,
        })
        if (error) {
          console.warn("Error:", error)
        }
      }

      let cont = -6;
  return (
    <>
      {Object.keys(products).map(key => (
          <mesh  key={products[key].id} position={[cont+=3,-2,0]} onPointerDown={e => handleClick(e,products[key].id)}>
            <circleBufferGeometry attach='geometry' args={[1,32]} />
            <meshBasicMaterial attach='material' args={{map:products[key].texture, side:THREE.DoubleSide}} />
          </mesh>
        ))}
    </>
  );
};

export default UI;
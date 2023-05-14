'use client'

import { useGLTF, Stage, Bounds, useBounds, useCursor, Center, Text3D, Float } from '@react-three/drei'
import React from 'react'
import { Canvas, useThree, useFrame } from '@react-three/fiber'

export function TitleText(props) {
  //   return (
  //     <Canvas orthographic camera={{ position: [0, 0, 100], zoom: 100 }}>
  //       <ambientLight intensity={0.5} />
  //       <directionalLight position={[10, 10, 10]} />
  //       <Scene />
  //       <axesHelper scale={2} position={[0, 0, 0]} onUpdate={(self) => self.setColors('#ff2080', '#20ff80', '#2080ff')} />
  //     </Canvas>
  //   )
  // }

  // function Scene({ margin = 0.5 }) {

  const margin = 0.5
  const { width, height } = useThree((state) => state.viewport)

  return (
    <>
      <Center bottom right position={[-width / 2 + margin, height / 2 - margin, 0]}>
        <Text3D letterSpacing={-0.06} size={0.5} font='/Inter_Bold.json'>
          top left
          <meshStandardMaterial color='white' />
        </Text3D>
      </Center>
      <Texto />
      <Center top left position={[width / 2 - margin, -height / 2 + margin, 0]}>
        <Text3D letterSpacing={-0.06} size={0.5} font='/Inter_Bold.json'>
          bottom right
          <meshStandardMaterial color='white' />
        </Text3D>
      </Center>
      <Center>
        <Float rotationIntensity={2} speed={2} floatIntensity={0} floatingRange={[1, 2]}>
          <Text3D
            curveSegments={32}
            bevelEnabled
            bevelSize={0.04}
            bevelThickness={0.1}
            height={0.5}
            lineHeight={0.5}
            letterSpacing={-0.06}
            size={1.5}
            font='/Inter_Bold.json'
          >
            {`hello\nworld`}
            <meshNormalMaterial />
          </Text3D>
        </Float>
      </Center>
    </>
  )
}

function Texto() {
  const myMesh = React.useRef()

  useFrame((state, delta) => {
    const { clock } = state
    const a = clock.getElapsedTime()
    // console.log(state)
    // console.log(a)
    myMesh.current.rotation.y = Math.cos(a * 30) / 3
  })
  return (
    <group ref={myMesh}>
      <Text3D letterSpacing={-0.06} size={0.5} font='/Inter_Bold.json'>
        FEELING HOT
        <meshStandardMaterial color='orange' />
      </Text3D>
    </group>
  )
}

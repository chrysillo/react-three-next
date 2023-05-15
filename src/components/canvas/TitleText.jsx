'use client'

import { Text3D } from '@react-three/drei'
import React from 'react'
import { useFrame } from '@react-three/fiber'
import { useRouter } from 'next/navigation'

export function TitleText({ route = '/', ...props }) {
  const myMesh = React.useRef()
  const router = useRouter()

  useFrame(({ clock }) => {
    const a = clock.getElapsedTime()

    myMesh.current.rotation.y = Math.cos(a) / 16
  })

  return (
    <group ref={myMesh} rotation={[-0.4, 0, 0.01]} position={[-8, 0, -3]} onClick={() => router.push(route)}>
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
        {`Enhacing UX\nwith 3D!!!`}
        <meshNormalMaterial />
      </Text3D>
    </group>
  )
}

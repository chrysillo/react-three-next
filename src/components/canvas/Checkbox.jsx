'use client'

import { useFrame } from '@react-three/fiber'
import { useRef, useState } from 'react'
import { useCursor } from '@react-three/drei'

export const Checkbox = ({ enabled, onClick }) => {
  const mesh = useRef(null)
  const [hovered, setHovered] = useState(false)
  useCursor(hovered)
  const active = enabled ? 0.8 : -0.8

  useFrame((state, delta) => {
    const t = state.clock.getElapsedTime()

    if (hovered && !enabled) {
      mesh.current.rotation.x += delta * 3
      mesh.current.position.x = active
      mesh.current.position.y = Math.cos(t * 3) * 0.3
      return
    }
    mesh.current.rotation.y = 0
    mesh.current.rotation.x = 0
    mesh.current.position.y = 0
    mesh.current.position.z = 0
    mesh.current.position.x = active
  })
  return (
    <group onClick={onClick}>
      <mesh
        visible={false}
        position={[0, 0, 0]}
        scale={[10, 10, 1]}
        onPointerOver={() => setHovered(true)}
        onPointerOut={() => setHovered(false)}
      >
        <planeGeometry />
        <meshPhysicalMaterial transparent />
      </mesh>
      <group ref={mesh}>
        <mesh position={[active, 0, 0]} scale={enabled ? 1.1 : 1}>
          <sphereGeometry args={[1, 64, 64]} />
          <meshPhysicalMaterial roughness={1} color={enabled ? 'blue' : 'gray'} />
        </mesh>
        <mesh position={[-1, 0, 1]} visible={hovered && !enabled}>
          <sphereGeometry args={[0.5, 64, 64]} />
          <meshPhysicalMaterial roughness={1} color={'lime'} />
        </mesh>
      </group>
    </group>
  )
}

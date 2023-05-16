'use client'

import { useGLTF } from '@react-three/drei'
import { useFrame } from '@react-three/fiber'
import * as THREE from 'three'
import { useMemo, useRef, useState } from 'react'
import { Line, useCursor, Svg } from '@react-three/drei'
import { useRouter } from 'next/navigation'

export const Logo = ({ route = '/configurator', ...props }) => {
  const mesh = useRef(null)
  const router = useRouter()

  const [hovered, hover] = useState(false)
  const points = useMemo(() => new THREE.EllipseCurve(0, 0, 3, 1.15, 0, 2 * Math.PI, false, 0).getPoints(100), [])

  useCursor(hovered)
  useFrame((state, delta) => {
    const t = state.clock.getElapsedTime()
    mesh.current.rotation.y = Math.sin(t) * (Math.PI / 8)
    mesh.current.rotation.x = Math.cos(t) * (Math.PI / 8)
    mesh.current.rotation.z -= delta / 4
  })

  return (
    <group ref={mesh} {...props}>
      {/* @ts-ignore */}
      <Line worldUnits points={points} color='#1fb2f5' lineWidth={0.15} />
      {/* @ts-ignore */}
      <Line worldUnits points={points} color='#1fb2f5' lineWidth={0.15} rotation={[0, 0, 1]} />
      {/* @ts-ignore */}
      <Line worldUnits points={points} color='#1fb2f5' lineWidth={0.15} rotation={[0, 0, -1]} />
      <mesh onClick={() => router.push(route)} onPointerOver={() => hover(true)} onPointerOut={() => hover(false)}>
        <sphereGeometry args={[0.55, 64, 64]} />
        <meshPhysicalMaterial roughness={0} color={hovered ? 'hotpink' : '#1fb2f5'} />
      </mesh>
    </group>
  )
}
export const CheckBox = ({ enabled, onClick }) => {
  const mesh = useRef(null)
  const [hovered, setHovered] = useState(false)
  useCursor(hovered)
  const active = enabled ? 0.8 : -0.8

  useFrame((state, delta) => {
    const t = state.clock.getElapsedTime()
    // mesh.current.scale
    //  Math.sin(t) * (Math.PI / 8)
    if (hovered && !enabled) {
      mesh.current.rotation.x += delta * 3
      mesh.current.position.y = Math.cos(t * 3) * 0.3
      return
    }
    mesh.current.position.y = 0
    mesh.current.rotation.y = 0
    mesh.current.rotation.x = 0
    mesh.current.position.x = active
  })
  return (
    <group onClick={onClick}>
      <mesh visible={false} position={[0, 0, 0]} scale={[10, 10, 1]}>
        <planeGeometry />
        <meshPhysicalMaterial transparent />
      </mesh>
      <group ref={mesh}>
        <mesh
          position={[active, 0, 0]}
          scale={enabled ? 1.1 : 1}
          onPointerOver={() => setHovered(true)}
          onPointerOut={() => setHovered(false)}
        >
          <sphereGeometry args={[1, 64, 64]} />
          <meshPhysicalMaterial roughness={1} color={enabled ? 'hotpink' : '#1fb2f5'} />
        </mesh>
        <mesh position={[-1, 0, 1]} visible={hovered && !enabled}>
          <sphereGeometry args={[0.5, 64, 64]} />
          <meshPhysicalMaterial roughness={1} color={enabled ? 'blue' : 'lime'} />
        </mesh>
      </group>
    </group>
  )
}
export function Duck({ route = '/', ...props }) {
  const { scene } = useGLTF('/duck.glb')

  useFrame((state, delta) => (scene.rotation.y += delta))

  return <primitive object={scene} {...props} />
}
export function ThreeLogo(props) {
  return <Svg src='/img/threejs.svg' />
}

'use client'

import { useFrame } from '@react-three/fiber'
import { useGLTF } from '@react-three/drei'

export function Duck({ route = '/', ...props }) {
  const { scene } = useGLTF('/duck.glb')

  useFrame((state, delta) => (scene.rotation.y += delta))

  return <primitive object={scene} {...props} />
}

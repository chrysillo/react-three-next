'use client'

import { forwardRef, Suspense, useImperativeHandle, useRef } from 'react'
import { Environment, OrbitControls, PerspectiveCamera, Stage, View as ViewImpl } from '@react-three/drei'
import { Three } from '@/helpers/components/Three'

export const Common = ({ color }) => (
  <Suspense fallback={null}>
    {/* <ambientLight intensity={0.5} />
    <pointLight position={[0, 30, 0]} intensity={1} castShadow={true} />
    <pointLight position={[20, 30, 10]} intensity={1} />
    <pointLight position={[-10, -10, -10]} /> */}
    <PerspectiveCamera makeDefault fov={40} position={[0, 0, 6]} />
    <Environment preset='city' />
  </Suspense>
)

const View = forwardRef(({ children, orbit, ...props }, ref) => {
  const localRef = useRef(null)
  useImperativeHandle(ref, () => localRef.current)
  console.log(props)
  return (
    <>
      <div ref={localRef} {...props} />
      <Three>
        <ViewImpl track={localRef}>
          {children}
          {orbit && <OrbitControls {...props} />}
        </ViewImpl>
      </Three>
    </>
  )
})
View.displayName = 'View'

export { View }
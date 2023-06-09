'use client'

import { forwardRef, Suspense, useImperativeHandle, useRef } from 'react'
import { Environment, OrbitControls, PerspectiveCamera, Stage, View as ViewImpl } from '@react-three/drei'
import { Three } from '@/helpers/components/Three'

export const Common = ({ color }) => (
  <Suspense fallback={null}>
    {color && <color attach='background' args={[color]} />}
    <PerspectiveCamera makeDefault fov={40} position={[0, 0, 6]} />
    <Environment preset='city' />
  </Suspense>
)

const View = forwardRef(({ children, orbit, orbitControls, ...props }, ref) => {
  const localRef = useRef(null)
  useImperativeHandle(ref, () => localRef.current)
  return (
    <>
      <div ref={localRef} {...props} />
      <Three>
        <ViewImpl track={localRef}>
          {children}
          {orbit && <OrbitControls {...orbitControls} />}
        </ViewImpl>
      </Three>
    </>
  )
})
View.displayName = 'View'

export { View }

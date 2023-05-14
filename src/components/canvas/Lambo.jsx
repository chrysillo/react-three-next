'use client'

import { useGLTF, Stage, Bounds, useBounds, useCursor } from '@react-three/drei'
import React from 'react'

function Model(props) {
  const color = props.color
  const { nodes, materials } = useGLTF('/lambo.glb')
  return (
    <group {...props} position={[2.15, 0, 0]} dispose={null}>
      <group rotation={[-Math.PI / 2, 0, 0]}>
        <lineSegments geometry={nodes.Object_3.geometry} material={materials['Material.004']} />
        <lineSegments geometry={nodes.Object_6.geometry} material={materials['Material.016']} />
        <lineSegments geometry={nodes.Object_16.geometry} material={materials['Material.003']} />
        <mesh castShadow={true} geometry={nodes.Object_2.geometry} material={materials['Material.001']} />
        <mesh castShadow={true} geometry={nodes.Object_4.geometry} material={materials['Material.004']} />
        <mesh castShadow={true} geometry={nodes.Object_5.geometry} material={materials['Material.010']} />
        <mesh castShadow={true} geometry={nodes.Object_7.geometry} material={materials['Material.016']} />
        <mesh castShadow={true} geometry={nodes.Object_8.geometry} material={materials['Material.020']} />
        <mesh castShadow={true} geometry={nodes.Object_9.geometry} material={materials['Material.017']} />
        <mesh castShadow={true} geometry={nodes.Object_10.geometry} material={materials['Material.029']} />
        <mesh castShadow={true} geometry={nodes.Object_11.geometry} material={materials['Material.042']} />
        <mesh
          castShadow={true}
          geometry={nodes.Object_12.geometry}
          material={materials['Lamborghini-text-logo-1440x900']}
        />
        <mesh castShadow={true} geometry={nodes.Object_13.geometry} material={materials['Material.002']} />
        <mesh castShadow={true} geometry={nodes.Object_14.geometry} material={materials['Material.002']} />
        <mesh castShadow={true} geometry={nodes.Object_15.geometry} material={materials['Material.002']} />
        <mesh castShadow={true} geometry={nodes.Object_17.geometry} material={materials['Material.003']} />
        <mesh castShadow={true} geometry={nodes.Object_18.geometry} material={materials['Material.003']} />
        <mesh castShadow={true} geometry={nodes.Object_19.geometry} material={materials['Material.004']} />
        <mesh castShadow={true} geometry={nodes.Object_20.geometry} material={materials['Material.005']} />
        <mesh castShadow={true} geometry={nodes.Object_21.geometry} material={materials['Material.007']} />
        <mesh castShadow={true} geometry={nodes.Object_22.geometry} material={materials['Material.009']} />
        <mesh castShadow={true} geometry={nodes.Object_23.geometry} material={materials['Material.011']} />
        <mesh castShadow={true} geometry={nodes.Object_24.geometry} material={materials['Material.011']} />
        <mesh castShadow={true} geometry={nodes.Object_25.geometry} material={materials['Material.011']} />
        <mesh castShadow={true} geometry={nodes.Object_26.geometry} material={materials['Material.011']} />
        <mesh castShadow={true} geometry={nodes.Object_27.geometry} material={materials['Material.013']} />
        <mesh
          castShadow={true}
          geometry={nodes.Object_28.geometry}
          material={materials['Material.012']}
          material-color={color}
        />
        <mesh castShadow={true} geometry={nodes.Object_29.geometry} material={materials['Material.012']} />
        <mesh castShadow={true} geometry={nodes.Object_30.geometry} material={materials['Material.012']} />
        <mesh castShadow={true} geometry={nodes.Object_31.geometry} material={materials['Material.012']} />
        <mesh castShadow={true} geometry={nodes.Object_32.geometry} material={materials['Material.012']} />
        <mesh castShadow={true} geometry={nodes.Object_33.geometry} material={materials['Material.012']} />
        <mesh castShadow={true} geometry={nodes.Object_34.geometry} material={materials['Material.025']} />
        <mesh castShadow={true} geometry={nodes.Object_35.geometry} material={materials['Material.025']} />
        <mesh castShadow={true} geometry={nodes.Object_36.geometry} material={materials['Material.025']} />
        <mesh castShadow={true} geometry={nodes.Object_37.geometry} material={materials['Material.025']} />
        <mesh castShadow={true} geometry={nodes.Object_38.geometry} material={materials['Material.025']} />
        <mesh castShadow={true} geometry={nodes.Object_39.geometry} material={materials['Material.025']} />
        <mesh castShadow={true} geometry={nodes.Object_40.geometry} material={materials['Material.017']} />
      </group>
    </group>
  )
}

export function Lambo(props) {
  const [hovered, setHovered] = React.useState(false)
  useCursor(hovered)
  return (
    <>
      <Stage adjustCamera={false}>
        <Bounds clip observe margin={1.5}>
          <Model color={props.color} />
          <SelectToZoom setControls={props.setControlsEnabled}>
            <mesh
              position={[0, 0, -5]}
              visible={true}
              onPointerOver={() => setHovered(true)}
              onPointerOut={() => setHovered(false)}
            >
              <sphereGeometry args={[0.6, 16, 16]} />
              {/* <meshPhysicalMaterial roughness={0} color={'#1fb2f5'} /> */}
            </mesh>
            <mesh position={[0, 0, 5]}>
              <sphereGeometry args={[1, 64, 64]} />
            </mesh>
          </SelectToZoom>
        </Bounds>
      </Stage>
    </>
  )
}

function SelectToZoom({ children, ...props }) {
  const api = useBounds()
  return (
    <group
      onClick={(e) => {
        props.setControls(false)
        console.log(e.delta)
        return e.stopPropagation(), e.delta <= 2 && api.refresh(e.object).fit()
      }}
      onPointerMissed={(e) => {
        props.setControls(true)
        console.log('pointer missed')
        // return e.button === 0 && api.refresh().fit()
      }}
    >
      {children}
    </group>
  )
}

https: useGLTF.preload('/lambo.glb')

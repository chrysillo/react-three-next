'use client'

import dynamic from 'next/dynamic'
import React, { Suspense } from 'react'
import Loading from '@/loading'

const Duck = dynamic(() => import('@/components/canvas/Duck').then((mod) => mod.Duck), { ssr: false })
const Lambo = dynamic(() => import('@/components/canvas/Lambo').then((mod) => mod.Lambo), { ssr: false })
const Checkbox = dynamic(() => import('@/components/canvas/Checkbox').then((mod) => mod.Checkbox), { ssr: false })
const View = dynamic(() => import('@/components/canvas/View').then((mod) => mod.View), {
  ssr: false,
  loading: () => (
    <div className='flex h-96 w-full flex-col items-center justify-center'>
      <Loading />
    </div>
  ),
})
const Common = dynamic(() => import('@/components/canvas/View').then((mod) => mod.Common), { ssr: false })

export default function Page() {
  const [color, setColor] = React.useState('red')
  const [enabledWheels, setEnabledWheels] = React.useState(true)
  const [enabledSpoiler, setEnabledSpoiler] = React.useState(false)
  const [controlsEnabled, setControlsEnabled] = React.useState(true)

  return (
    <div className={`m-auto grid h-full max-h-fit max-w-7xl grid-cols-6 grid-rows-6 `}>
      <View
        orbit
        orbitControls={{
          enableDamping: false,
          enablePan: false,
          minPolarAngle: 1.5,
          maxPolarAngle: 1.5,
          enableZoom: false,
          reverseOrbit: false,
          zoom: 80,
          minZoom: 80,
          minDistance: 15,
          enabled: controlsEnabled,
        }}
        className='col-span-5 row-span-5 h-full w-full min-w-full boxshadow boxshadow-lg '
      >
        <Suspense fallback={null}>
          <Lambo
            spoiler={enabledSpoiler}
            wheels={enabledWheels}
            color={color}
            setControlsEnabled={setControlsEnabled}
          />
          <Common />
        </Suspense>
      </View>
      <div className='col-span-1 row-span-5 flex flex-col gap-5   p-3'>
        <Button color='navy' onClick={setColor} />
        <Button color='lime' onClick={setColor} />
        <Button color='black' onClick={setColor} />
        <Button color='red' onClick={setColor} />
        <Button color='gray' onClick={setColor} />
      </div>
      <div className='col-span-5 row-span-1  p-2 overflow-hidden flex gap-4 items-center  flex-row'>
        <FancyCheckbox text='Wheels' enabled={enabledWheels} onClick={() => setEnabledWheels(!enabledWheels)} />
        <FancyCheckbox text='Spoiler' enabled={enabledSpoiler} onClick={() => setEnabledSpoiler(!enabledSpoiler)} />
      </div>
      <div className='col-span-1 row-span-1 bg-blue-500'>
        <View orbit className='relative h-full  '>
          <Suspense fallback={null}>
            <Duck scale={2} position={[0, -1.6, 0]} />
            <Common color={'lightblue'} />
          </Suspense>
        </View>
      </div>
    </div>
  )
}

const Button = ({ color, onClick }) => (
  <button
    style={{ backgroundColor: color }}
    className='flex h-1/5 w-full cursor-pointer rounded'
    onClick={() => onClick(color)}
  />
)

const FancyCheckbox = ({ enabled, onClick, text }) => (
  <div className='flex w-fit  p-2 text-center items-center text-gray-100 gap-3  rounded relative '>
    <div>{text}</div>
    <View
      className={`relative w-24 h-16 border-4 border-blue-800 rounded-full ${enabled ? 'bg-blue-200' : 'bg-gray-400'}`}
    >
      <Suspense fallback={null}>
        <Checkbox enabled={enabled} onClick={onClick} />
        <Common />
      </Suspense>
    </View>
  </div>
)

'use client'

import dynamic from 'next/dynamic'
import React, { Suspense } from 'react'

const Duck = dynamic(() => import('@/components/canvas/Examples').then((mod) => mod.Duck), { ssr: false })
const Lambo = dynamic(() => import('@/components/canvas/Lambo').then((mod) => mod.Lambo), { ssr: false })
const View = dynamic(() => import('@/components/canvas/View').then((mod) => mod.View), {
  ssr: false,
  loading: () => (
    <div className='flex h-96 w-full flex-col items-center justify-center'>
      <svg className='-ml-1 mr-3 h-5 w-5 animate-spin text-black' fill='none' viewBox='0 0 24 24'>
        <circle className='opacity-25' cx='12' cy='12' r='10' stroke='currentColor' strokeWidth='4' />
        <path
          className='opacity-75'
          fill='currentColor'
          d='M4 12a8 8 0 0 1 8-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 0 1 4 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z'
        />
      </svg>
    </div>
  ),
})
const Common = dynamic(() => import('@/components/canvas/View').then((mod) => mod.Common), { ssr: false })

export default function Page() {
  const [color, setColor] = React.useState('red')
  const [controlsEnabled, setControlsEnabled] = React.useState('true')
  const someFunction = (color) => {
    setColor(color)
  }
  return (
    <>
      <div className='m-auto grid h-full max-w-7xl grid-cols-6 grid-rows-6'>
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
          className='col-span-5 row-span-4  h-full w-full bg-lime-300'
        >
          <Suspense fallback={null}>
            <Lambo color={color} setControlsEnabled={setControlsEnabled} />
            <Common />
          </Suspense>
        </View>
        <div className='col-span-1 row-span-4 flex flex-col gap-5 bg-orange-500 p-2'>
          <Button color='orange' onClick={someFunction} />
          <Button color='lime' onClick={someFunction} />
          <Button color='black' onClick={someFunction} />
          <Button color='red' onClick={someFunction} />
          <Button color='gray' onClick={someFunction} />
        </div>
        <div className='col-span-5 row-span-1 bg-red-50'>coomo</div>
        <div className='col-span-1 row-span-1 bg-blue-500'>
          <View orbit className='relative h-full  '>
            <Suspense fallback={null}>
              <Duck scale={2} position={[0, -1.6, 0]} />
              <Common color={'lightblue'} />
            </Suspense>
          </View>
        </div>
      </div>
    </>
  )
}

const Button = ({ color, onClick }) => (
  <button
    style={{ backgroundColor: color }}
    className='flex h-1/5 w-full cursor-pointer rounded border-4 border-blue-900'
    onClick={() => onClick(color)}
  />
)

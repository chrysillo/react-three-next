'use client'

import dynamic from 'next/dynamic'
import Loading from '@/loading'
import { Suspense } from 'react'

const Logo = dynamic(() => import('@/components/canvas/Logo').then((mod) => mod.Logo), { ssr: false })
const TitleText = dynamic(() => import('@/components/canvas/TitleText').then((mod) => mod.TitleText), { ssr: false })
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
  return (
    <>
      <div className='relative w-full mb-40'>
        <View className='relative  h-96  w-full'>
          <Suspense fallback={null}>
            <Logo position={[5, 0, -3]} />
            <TitleText route='/configurator' />
            <Common />
          </Suspense>
        </View>
      </div>

      <div className='mx-auto flex w-full flex-col flex-wrap   md:flex-row  lg:w-4/5'>
        {/* jumbo */}
        <div className='flex w-full flex-col items-start  p-12 md:w-3/6 md:text-left'>
          <h1 className='my-4 text-5xl font-bold leading-tight'>React Three Fiber</h1>
          <p className='mb-8 text-2xl leading-normal'>
            react-three-fiber is a React renderer for threejs. Build your scene declaratively with re-usable,
            self-contained components that react to state, are readily interactive and can participate in React's
            ecosystem.
          </p>
        </div>
        <div className='flex w-full flex-col items-start  p-12   md:w-3/6 md:text-left'>
          <h1 className='my-4 text-5xl font-bold leading-tight'>Threejs</h1>
          <p className='mb-8 text-2xl leading-normal'>
            Three.js is a popular JavaScript library used for creating 3D graphics and animations in web applications.
          </p>
        </div>
      </div>
    </>
  )
}

import React from 'react'
import { Button, Container } from '../../../component'

export default function Subscription() {
  return (
    <Container>
        <div className=' w-1/2 m-auto  p-3'>
           <h1>Subscription</h1>
           <div className=' h-16'/>
            <div className=' w-full grid grid-cols-2 gap-4'>
                <div className=' p-5 shadow-md bg-white'>
                    <h1 className=' text-xl text-center text-slate-800 font-bold'>Subscription1</h1>
                    <h3 className=' text-lg text-center text-slate-600'>Description</h3>
                    <div className=' mt-10 text-center text-lg text-red-700'>
                        Php 400.00 for 1 month
                    </div>
                    <div className=' mt-5   '>
                        <Button text="Subscribe Now" onClick={()=>{}}/>
                    </div>
                </div>
            </div>
        </div>
    </Container>
  )
}

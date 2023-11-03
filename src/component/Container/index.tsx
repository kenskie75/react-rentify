import React from 'react'

type Props = {
    children:React.ReactNode;
}


export default function DashBoard(props:Props) {
  return (
    <div className=' w-screen flex pt-28'>
        {props.children}
    </div>
  )
}

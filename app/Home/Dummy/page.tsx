"use client"
import React, {useState} from 'react'
import PopupNotification from '@/app/Components/PopupNotification'


const page = () => {
    const [renderMessage , setRenderMessage] = useState("")
    const handleClick = () => {
        setRenderMessage("hello this is sagar")
    }

  return (
    <div className='flex justify-center items-center'>
        <button onClick={handleClick} className=" bg-black text-white p-5">Click me</button>
        <PopupNotification showMessage={renderMessage} />
    </div>
  )
}

export default page

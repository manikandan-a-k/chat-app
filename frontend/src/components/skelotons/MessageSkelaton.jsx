import React from 'react'

const MessageSkelaton = () => {
  return (
    <>
    <div className="flex gap-3 items-center">
     <div className='skeloton w-10 h-19 rounded-full shrink-0'>
      
     </div>
     <div className='flex flex-col gap-1'>
     <div className='skeloton h-4 w-40'></div>
     <div className='skeloton h-4 w-40'></div>
     </div>
    </div>
    <div className='skeloton w-10 h-10 rounded-full shrink-0'>

    </div>
    </>
  )
}

export default MessageSkelaton
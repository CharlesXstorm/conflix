/* eslint-disable react/display-name */
import React from 'react'


const InputField = React.forwardRef(({id,name,type,value,onChange},ref) => {
    // const inputRef = useRef()
  return (
    <div>
        <input ref={ref}  id={id} type={type} name={name} value={value} onChange={onChange} className='bg-[rgb(120,120,120)] focus:outline-none p-1 flex w-[100%]' />
    </div>
  )
})

export default InputField
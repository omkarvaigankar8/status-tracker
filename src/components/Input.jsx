import React from 'react'

const Input = ({ onChange, placeholder, value }) => {
    return (
        <input
            type="text"
            className='input'
            value={value}
            onChange={onChange}
            placeholder={placeholder}
        />
    )
}

export default Input
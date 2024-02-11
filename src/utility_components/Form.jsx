import React from 'react'

const Form = ({ onSubmit }) => {

    return (
        <form onSubmit={onSubmit} className='p-3'>
            <input name="email" className='flex items-center gap-1 px-3 py-1.5 border' />
            <input name="password" className='flex items-center gap-1 px-3 py-1.5 border' />
            <input type="submit" value="submit" className='flex items-center gap-1 px-3 py-1.5 border' />
        </form>
    )
}

export default Form
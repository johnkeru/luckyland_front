import React, { useState } from 'react'
import { IoEye } from "react-icons/io5";

const InputIcon = ({
    label = '',
    name = '',
    Icon,
    register,
    mb = 3,
    errors,
    placeholder = '',
    type = 'text',
    defaultValue = '',
    isView,
}) => {
    const [isClicked, setIsClicked] = useState(false);
    const handleDivClick = () => {
        setIsClicked(true);
    };

    const handleInputBlur = () => {
        setIsClicked(false);
    };

    const [viewPassword, setViewPassword] = useState(false);
    function changeIcon() {
        if (viewPassword) {
            return <IoEye className='mr-2' onClick={() => setViewPassword(!viewPassword)} />
        } else {
            return <Icon className='mr-2' onClick={() => setViewPassword(!viewPassword)} />
        }
    }

    return (
        <div className={`w-full mb-${mb}`}>
            <label htmlFor={name} className='block text-gray-600 font-semibold'>
                {label}
            </label>
            <div
                className={`flex items-center border-2 ${isClicked ? 'border-gray-500' : 'border-[#b9b9b9]'} rounded-md px-4 py-2`}
                onClick={handleDivClick}
                onBlur={handleInputBlur}
            >
                {
                    isView ? changeIcon() :
                        <Icon className='mr-2' />
                }

                <input
                    defaultValue={defaultValue}
                    type={viewPassword ? 'text' : type}
                    id={name}
                    {...register(name)}
                    className='w-full px-2 border-none focus:outline-none focus:border-gray-500'
                    placeholder={placeholder}
                    onPaste={e => type === 'password' ? e.preventDefault() : undefined}
                />
            </div>
            {errors && errors[name] && <p className='text-red-500 text-sm mt-1'>{errors[name]?.message}</p>}
        </div>
    )
}

export default InputIcon
// CustomTextarea.js

import React from 'react';

const TextArea = ({ label, placeholder, value, error, register, name }) => {
    return (
        <div >
            <label className="block text-gray-700 text-sm font-bold mb-1" htmlFor={label}>
                {label}
            </label>
            <textarea
                className={`shadow appearance-none border rounded w-full h-[120px] py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline ${error ? 'border-red-500' : 'border-gray-300'
                    }`}
                id={label}
                placeholder={placeholder}
                defaultValue={value}
                {...register(name)}
            />
            {error && <p className="text-red-500 text-xs italic mt-1">{error}</p>}
        </div>
    );
};

export default TextArea;

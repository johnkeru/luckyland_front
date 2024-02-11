import React from 'react';

const InputHelper = ({ label, placeholder, value, error, number, register, name, disabled, isBorrow, type = 'text' }) => {

    return (
        <div className="mb-4">
            <label className="block text-gray-700 text-sm font-bold mb-1" htmlFor={label}>
                {label}
            </label>
            {number ?
                <input
                    disabled={disabled}
                    className={`shadow appearance-none border rounded w-full p-2 text-gray-700 leading-tight focus:outline-none focus:shadow-outline ${error ? 'border-red-500' : 'border-gray-300'
                        }`}
                    id={label}
                    placeholder={placeholder}
                    defaultValue={value}
                    type="number"
                    pattern="^-?\d*$"
                    onKeyDown={(evt) => {
                        const isInvalidKey = !/^[0-9.-]$/.test(evt.key);
                        if (isInvalidKey) {
                            evt.preventDefault();
                        }
                    }}
                    {...register(name)}
                />
                : <input
                    className={`shadow appearance-none border rounded w-full p-2 text-gray-700 leading-tight focus:outline-none focus:shadow-outline ${error ? 'border-red-500' : 'border-gray-300'
                        }`}
                    id={label}
                    type={type}
                    placeholder={placeholder}
                    defaultValue={value}
                    {...register(name)}
                />}
            {error && <p className="text-red-500 text-xs italic mt-0.5">{error.message}</p>}
            {disabled && isBorrow && <p className="text-red-500 text-xs italic mt-0.5">Out of stock! Cannot borrow.</p>}
        </div>
    );
};

export default InputHelper;

import React from 'react'

const InputNumeric = ({ defaultValue, setData, objKey, title }) => {
    return (
        <input
            type="number"
            pattern="^-?\d*$"
            onKeyDown={(evt) => {
                const isInvalidKey = !/^[0-9.-]$/.test(evt.key);
                if (isInvalidKey) {
                    evt.preventDefault();
                }
            }}
            className="shadow appearance-none border rounded w-14 py-2 pl-1 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            defaultValue={defaultValue}
            onChange={(e) => setData(prev => ({ ...prev, [objKey]: parseInt(e.target.value) || 0 }))}
            title={title}
        />
    )
}

export default InputNumeric
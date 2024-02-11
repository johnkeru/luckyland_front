import React from 'react';

const TableLoading = ({ size = 9 }) => {
    const numbersArray = Array.from({ length: size }, (_, index) => index + 1);
    const getRandomDuration = () => {
        // Generate a random duration between 0.5s and 1.5s
        return `${Math.random() * (1.5 - 0.5) + 0.5}s`;
    };
    return (
        <>
            {numbersArray.map((v) => (
                <tr key={v} className="fade-in">
                    <td style={{ animationDuration: getRandomDuration() }} className='flex-grow h-6 mx-2 py-6 border-2 border-white loading-cell'></td>
                    <td style={{ animationDuration: getRandomDuration() }} className='flex-grow h-6 mx-2 py-6 border-2 border-white loading-cell'></td>
                    <td style={{ animationDuration: getRandomDuration() }} className='flex-grow h-6 mx-2 py-6 border-2 border-white loading-cell'></td>
                    <td style={{ animationDuration: getRandomDuration() }} className='flex-grow h-6 mx-2 py-6 border-2 border-white loading-cell'></td>
                    <td style={{ animationDuration: getRandomDuration() }} className='flex-grow h-6 mx-2 py-6 border-2 border-white loading-cell'></td>
                    <td style={{ animationDuration: getRandomDuration() }} className='flex-grow h-6 mx-2 py-6 border-2 border-white loading-cell'></td>
                    <td style={{ animationDuration: getRandomDuration() }} className='flex-grow h-6 mx-2 py-6 border-2 border-white loading-cell'></td>
                    <td style={{ animationDuration: getRandomDuration() }} className='flex-grow h-6 mx-2 py-6 border-2 border-white loading-cell'></td>
                </tr>
            ))}
        </>
    );
};

export default TableLoading;

import React from 'react';

const CottageIcon = ({ width = 30, height = 30 }) => {
    return (
        <svg fill="none" width={width} height={height} viewBox="0 0 192 192" xmlns="http://www.w3.org/2000/svg">
            <path d="M96 128h48v48H96z" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="12" />
            <path d="M48 64h96v16H48z" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="12" />
            <path d="M48 128h96v16H48z" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="12" />
            <path d="M144 32H48c-17.673 0-32 14.327-32 32v96c0 17.673 14.327 32 32 32h96c17.673 0 32-14.327 32-32V64c0-17.673-14.327-32-32-32z" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="12" />
            <path d="M128 64h16v16h-16z" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="12" />
            <path d="M128 128h16v16h-16z" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="12" />
            <path d="M64 96h16v16H64z" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="12" />
        </svg>
    );
};

export default CottageIcon;
import React, { useState } from 'react';

const SearchColor = () => {
    const [search, setSearch] = useState('');
    const [data, setData] = useState([
        { id: 1, username: 'John Doe' },
        { id: 2, username: 'Jane Doe' },
        { id: 3, username: 'Bob Smith' },
    ]);

    const handleSearch = (e) => {
        setSearch(e.target.value);
    };

    const filterData = () => {
        return data.filter((item) => item.username.toLowerCase().includes(search.toLowerCase()));
    };

    return (
        <div>
            <input
                type="text"
                placeholder="Search username"
                value={search}
                onChange={handleSearch}
                className="border border-gray-300 p-2 mb-4"
            />

            <ul>
                {filterData().map((item) => (
                    <li key={item.id}>
                        {/* Colorized text based on search */}
                        {item.username.toLowerCase().includes(search.toLowerCase()) ? (
                            <span>
                                {item.username.split(new RegExp(`(${search})`, 'i')).map((part, index) => (
                                    part.toLowerCase() === search.toLowerCase() ? (
                                        <span key={index} className="text-blue-500 font-bold">
                                            {part}
                                        </span>
                                    ) : (
                                        <span key={index}>{part}</span>
                                    )
                                ))}
                            </span>
                        ) : (
                            item.username
                        )}
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default SearchColor;

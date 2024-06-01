import { InputAdornment, TextField } from '@mui/material';
import React, { useEffect, useState } from 'react';
import { CiSearch } from 'react-icons/ci';
import { MdClear } from 'react-icons/md';

const TableSearchBar = ({ configMethods }) => {
    const [trigger, setTrigger] = useState(false);

    const handleClearSearch = () => {
        configMethods.setSearch('');
        if (trigger) {
            configMethods.handleSearch('search=&');
            setTrigger(false);
        }
    }

    const handleTriggerSearch = (e) => {
        e.preventDefault();
        configMethods.handleSearch(`search=${configMethods.search}&`);
        setTrigger(true);
    }

    useEffect(() => {
        if (trigger) {
            if (configMethods.search === '') {
                configMethods.handleSearch('search=&');
                setTrigger(false);
            }
        }
    }, [trigger, configMethods.search]);

    return (
        <form onSubmit={handleTriggerSearch} style={{ marginLeft: 'auto' }}>
            <TextField
                autoComplete='off'
                size='small'
                value={configMethods.search}
                onChange={(e) => configMethods.setSearch(e.target.value)}
                InputProps={{
                    startAdornment: (
                        <InputAdornment position="start" onClick={handleTriggerSearch}>
                            <CiSearch />
                        </InputAdornment>
                    ),
                    endAdornment: (
                        <InputAdornment position="end">
                            {configMethods.search && (
                                <MdClear
                                    style={{ cursor: 'pointer' }}
                                    onClick={handleClearSearch}
                                />
                            )}
                        </InputAdornment>
                    ),
                }}
                placeholder="Search"
                variant="outlined"
                sx={{
                    width: {
                        xs: '100%', // Full width on mobile
                        sm: 'auto'  // Auto width on larger screens
                    }
                }}
            />
            <input type="submit" style={{ display: 'none' }} />
        </form>
    );
};

export default TableSearchBar;

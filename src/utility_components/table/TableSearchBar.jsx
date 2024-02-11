import React, { useEffect, useState } from 'react';
import { Input } from '@material-tailwind/react';
import { MagnifyingGlassIcon, XMarkIcon } from '@heroicons/react/24/outline';

const TableSearchBar = ({ configMethods, label }) => {
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
        <div className="w-full md:w-72">
            <form onSubmit={handleTriggerSearch} className="relative">
                {configMethods.search && (
                    <button
                        type="button"
                        className="absolute inset-y-0 left-0 pl-3 flex items-center z-10 cursor-default"
                        onClick={handleClearSearch}
                    >
                        <XMarkIcon className="h-5 w-5 text-gray-500" />
                    </button>
                )}
                <Input
                    label={label}
                    value={configMethods.search}
                    onChange={(e) => configMethods.setSearch(e.target.value)}
                    className={configMethods.search ? 'pl-10' : ''}
                    icon={<MagnifyingGlassIcon onClick={handleTriggerSearch} className="h-5 w-5" />}
                />
            </form>
        </div>
    );
};

export default TableSearchBar;

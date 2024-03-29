import React, { useEffect, useState } from 'react';
import { FaPlus } from 'react-icons/fa';
import useSearchStore from '../../../hooks/useSearchStore';
import useUser from '../../../hooks/useUser';
import ButtonIconText from '../../../utility_components/ButtonIconText';
import EnhancedTable from '../../../utility_components/table/EnhancedTable';
import { isAdmin, isInventory } from '../../../utility_functions/roles';
import { statusColor } from '../../../utility_functions/statusColor';
import { notifyError } from '../../../utility_functions/toaster';
import { getQueryParameters } from '../../../utility_functions/urlQueries';
import WasteBody from './WasteBody';
import Add_Waste_Modal from './modal/Add_Waste_Modal';

import basicGetCall from '../../../utility_functions/axiosCalls/basicGetCall';
import commonValidationCall from '../../../utility_functions/axiosCalls/commonValidationCall';
import { WASTE_ENDPOINT, axiosCreate } from '../../../utility_functions/axiosCalls/config';

const Waste = () => {
    const { user } = useUser();
    const [categories, setCategories] = useState([]);

    const [response, setResponse] = useState(null);
    const [loading, setLoading] = useState(true);

    const [currentUrl, setCurrentUrl] = useState(WASTE_ENDPOINT);
    const [sendUrl, setSendUrl] = useState(currentUrl);

    useEffect(() => {
        basicGetCall({
            endpoint: sendUrl,
            setResponse,
            setLoading: currentUrl === WASTE_ENDPOINT ? setLoading : undefined,
        });
    }, [sendUrl]);

    useEffect(() => {
        basicGetCall({
            endpoint: 'api/getCategories',
            setDataDirectly: setCategories
        });
    }, [])

    const handleSearch = (query) => {
        setSendUrl(getQueryParameters(currentUrl, setCurrentUrl, query + 'page=1&status=&'));
    }
    const handleTab = (query) => {
        setSendUrl(getQueryParameters(currentUrl, setCurrentUrl, query + 'page=1&status=&'));
    }
    const handleToggle = (query) => {
        setSendUrl(getQueryParameters(currentUrl, setCurrentUrl, query + 'page=1&search=&'));
    }
    const handleSelectPage = (value) => {
        setSendUrl(getQueryParameters(currentUrl, setCurrentUrl, `page=${value}&`));
    }

    const handleAddDelivery = () => {

        const addWaste = (body, setAdding, setError, handleClose) => {
            commonValidationCall({
                method: 'post',
                endpoint: 'api/wastes/addWaste',
                body,
                hasToaster: true,
                handleClose,
                setError,
                setLoading: setAdding,
                onSuccess: () => {
                    axiosCreate.get(sendUrl)
                        .then(res => setResponse(res.data))
                        .catch(_error => {
                            notifyError('Something went wrong. Please try again later.')
                        });
                }
            })
        }
        return <Add_Waste_Modal
            button={<ButtonIconText
                Icon={<FaPlus />}
                text='Add Waste'
                color="success"
            />}
            onClick={addWaste}
        />
    }

    const handleUpdateWaste = (id, body, setLoading, handleClose, setError) => {
        commonValidationCall({
            method: 'put',
            endpoint: 'api/wastes/update/' + id,
            body,
            hasToaster: true,
            setError,
            setLoading,
            onSuccess: () => {
                const isEmpty = response?.data?.length === 0 || response.data.length === 1; // checks if the inventories is empty after deletion
                const isSearch = sendUrl.includes('search');                        // checks if url includes search and replace to nothing
                let newUrl = isEmpty ? isSearch ? sendUrl.replace(/search=[^&]*/, 'search=') : sendUrl.replace(/page=[^&]*/, 'page=1') : sendUrl;
                axiosCreate.get(newUrl)
                    .then(res => {
                        setResponse(res.data);
                        handleClose();
                    })
                    .catch(_error => {
                        handleClose();
                        notifyError('Something went wrong. Please try again later.');
                    });
            }
        });
    }


    const configHead = [
        {
            label: 'ID',
        },
        {
            label: 'Item',
            query: 'name',
            sortable: true,
        },
        {
            label: 'Category',
            query: 'category',
            chip_filter: true,
            options: categories
        },
        {
            label: 'Quantity',
            query: 'quantity',
            sortable: true,
        },
        {
            label: 'Image'
        },
        {
            label: 'Date',
        },
        {
            label: 'Actions',
        },
    ];

    const { searchWaste, setSearchWaste } = useSearchStore();

    const configMethods = {
        statusColor,
        handleSearch,
        handleToggle,
        handleSelectPage,
        handleTab,
        update: handleUpdateWaste,
        add: handleAddDelivery,
        search: searchWaste,
        setSearch: setSearchWaste
    }
    return (
        <EnhancedTable
            noTrash
            configHead={configHead}
            data={response}
            loading={loading}
            configMethods={configMethods}
            total={loading ? 0 : response.total}
            title='Wastes'
            isAllow={isAdmin(user.roles) || isInventory(user.roles)}
            childrenBody={
                <WasteBody
                    configMethods={configMethods}
                    data={response}
                    loading={loading}
                    isAllow={isAdmin(user.roles) || isInventory(user.roles)}
                />
            }
        />
    )
}

export default Waste
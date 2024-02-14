import React, { useEffect, useState } from 'react';
import useSearchStore from '../../hooks/useSearchStore';
import Add_Inventory_Modal from '../../utility_components/modal/inventory_modals/Add_Inventory_Modal';
import axiosCall, { INVENTORY_ENDPOINT, axiosCreate } from '../../utility_functions/axiosCall';
import { statusColor } from '../../utility_functions/statusColor';
import { notifyError } from '../../utility_functions/toaster';
import { getQueryParameters } from '../../utility_functions/urlQueries';
import InventoriesTable from './InventoriesTable';
import TH_S from './TH_S';
import TH_StatusFilter from './TH_StatusFilter';
import { FaPlus } from 'react-icons/fa';
import ButtonIconText from '../../utility_components/ButtonIconText';

const Inventories = () => {
    const [response, setResponse] = useState(null);
    const [loading, setLoading] = useState(true);

    const [currentUrl, setCurrentUrl] = useState(INVENTORY_ENDPOINT);
    const [sendUrl, setSendUrl] = useState(currentUrl);

    useEffect(() => {
        axiosCall({
            endpoint: sendUrl,
            setResponse,
            setLoading: currentUrl === INVENTORY_ENDPOINT ? setLoading : () => { },
        });
    }, [sendUrl]);



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

    const handleAddInventory = () => {
        const addInventory = (body, setAdding, setError, handleClose) => {
            axiosCall({
                method: 'post',
                endpoint: 'api/inventories/add',
                body,
                hasToaster: true,
                setLoading: setAdding,
                handleClose,
                setError,
                onSuccess: () => {
                    axiosCreate.get(sendUrl)
                        .then(res => setResponse(res.data))
                        .catch(_error => {
                            notifyError('Something went wrong. Please try again later.')
                        });
                }
            });
        }

        return <Add_Inventory_Modal
            handleAdd={addInventory}
            button={
                <ButtonIconText
                    Icon={<FaPlus />}
                    text='Add Inventory'
                    color="success"
                />}
        />
    }


    const customerBorrow = (id, customerId, body, setBorrowing, handleClose) => {
        axiosCall({
            method: 'post',
            endpoint: `api/inventories/borrow/${id}/${customerId}`,
            body,
            hasToaster: true,
            setLoading: setBorrowing,
            handleClose,
            onSuccess: () => {
                axiosCreate.get(sendUrl)
                    .then(res => setResponse(res.data))
                    .catch(_error => {
                        notifyError('Something went wrong. Please try again later.')
                    });
            }
        });
    };

    const handlePartialUpdate = (id, body, setLoading, handleClose, setError) => {
        axiosCall({
            method: 'patch',
            endpoint: 'api/inventories/update/' + id,
            body,
            hasToaster: true,
            setLoading,
            handleClose,
            setError,
            onSuccess: () => {
                axiosCreate.get(sendUrl)
                    .then(res => setResponse(res.data))
                    .catch(_error => {
                        notifyError('Something went wrong. Please try again later.')
                    });
            }
        });
    };

    const softDeleteOrRestoreProduct = (id, setLoading, handleClose) => {
        axiosCall({
            method: 'delete',
            endpoint: 'api/inventories/softDeleteOrRestoreProduct/' + id,
            hasToaster: true,
            setLoading,
            onSuccess: () => {
                const isEmpty = response?.data?.data?.length === 0 || response?.data.data.length === 1; // checks if the inventories is empty after deletion
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
    };

    const configHead = [
        {
            label: 'ID',
        },
        {
            label: 'Product Name',
            sortable: (label) => <TH_S
                label={label}
                query='productName'
                handleToggle={handleToggle}
                hasData={response?.total_inventories > 1}
            />,
        },
        {
            label: 'Category',
            sortable: (label) => <TH_S
                label={label}
                query='category'
                handleToggle={handleToggle}
                hasData={response?.total_inventories > 1}
            />,
        },
        {
            label: 'Quantity',
            sortable: (label) => <TH_S
                label={label}
                query='currentQuantity'
                hasData={response?.total_inventories > 1}
                handleToggle={handleToggle}
            />,
        },
        {
            label: 'Status',
            sortable: (label) => <TH_StatusFilter
                options={['In Stock', 'Low Stock', 'Out of Stock', 'All']}
                statusColor={statusColor}
                label={label}
                hasData={response?.total_inventories > 1}
                handleToggle={handleToggle}
            />,
        },
        { label: 'Image', },
        {
            label: 'Last Check',
            sortable: (label) => <TH_S
                label={label}
                query='lastCheck'
                handleToggle={handleToggle}
                hasData={response?.total_inventories > 1}
            />,
        },
        { label: 'Actions', },
    ];

    const { search, setSearch } = useSearchStore();

    const configMethods = {
        statusColor,
        handleSearch,
        handleToggle,
        handleSelectPage,
        handleTab,
        delete: softDeleteOrRestoreProduct,
        update: handlePartialUpdate,
        add: handleAddInventory,
        borrow: customerBorrow,
        search, setSearch
    }

    return (
        <InventoriesTable
            configHead={configHead}
            configMethods={configMethods}
            data={response}
            loading={loading}
            total={loading ? 0 : response.total_inventories}
        />
    )
}

export default Inventories
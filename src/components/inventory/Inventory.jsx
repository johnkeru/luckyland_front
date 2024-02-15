import React, { useEffect, useState } from 'react';
import { FaPlus } from 'react-icons/fa';
import useSearchStore from '../../hooks/useSearchStore';
import ButtonIconText from '../../utility_components/ButtonIconText';
import Add_Inventory_Modal from '../../utility_components/modal/inventory_modals/Add_Inventory_Modal';
import axiosCall, { INVENTORY_ENDPOINT, axiosCreate } from '../../utility_functions/axiosCall';
import { statusColor } from '../../utility_functions/statusColor';
import { notifyError } from '../../utility_functions/toaster';
import { getQueryParameters } from '../../utility_functions/urlQueries';
import InventoryTable from './InventoryTable';

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

    const configHeadV2 = [
        {
            label: 'ID',
        }, {
            label: 'Product Name',
            query: 'productName',
            sortable: true,
        }, {
            label: 'Category',
            query: 'category',
            sortable: true,
        }, {
            label: 'Quantity',
            query: 'currentQuantity',
            sortable: true,
        }, {
            label: 'Status',
            // query: 'status',
            // filter: true,
            // active: true,
        }, {
            label: 'Image'
        }, {
            label: 'Last Check',
            query: 'lastCheck',
            sortable: true,
        }, { label: 'Actions', },
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
        <InventoryTable configHead={configHeadV2} data={response} loading={loading} configMethods={configMethods} />
    )
}

export default Inventories
import React, { useEffect, useState } from 'react';
import useCategories from '../../hooks/inventory/useCategories';
import useSearchStore from '../../hooks/useSearchStore';
import useUser from '../../hooks/useUser';
import EnhancedTable from '../../utility_components/table/EnhancedTable';
import basicGetCall from '../../utility_functions/axiosCalls/basicGetCall';
import commonValidationCall from '../../utility_functions/axiosCalls/commonValidationCall';
import { INVENTORY_ENDPOINT, axiosCreate } from '../../utility_functions/axiosCalls/config';
import noResponseCall from '../../utility_functions/axiosCalls/noResponseCall';
import { isAdmin, isFrontDesk, isInventory } from '../../utility_functions/roles';
import { statusColor } from '../../utility_functions/statusColor';
import { notifyError } from '../../utility_functions/toaster';
import { getQueryParameters } from '../../utility_functions/urlQueries';
import InventoryBody from './InventoryBody';
import InventoryHead from './InventoryHead';

const Inventory = () => {
    const { user } = useUser();
    const { categories } = useCategories();

    const [response, setResponse] = useState(null);
    const [loading, setLoading] = useState(true);

    const [currentUrl, setCurrentUrl] = useState(INVENTORY_ENDPOINT);
    const [sendUrl, setSendUrl] = useState(currentUrl);

    useEffect(() => {
        basicGetCall({
            endpoint: sendUrl,
            setResponse,
            setLoading: currentUrl === INVENTORY_ENDPOINT ? setLoading : undefined,
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

    const addInventory = (body, setAdding, setError, handleClose) => {
        commonValidationCall({
            method: 'post',
            endpoint: 'api/inventories/add-item',
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

    const handleInlineUpdate = (id, body, setLoading, handleClose) => {
        commonValidationCall({
            method: 'patch',
            endpoint: 'api/inventories/inline-update-item/' + id,
            body,
            hasToaster: true,
            setLoading,
            handleClose,
            onSuccess: () => {
                axiosCreate.get(sendUrl)
                    .then(res => setResponse(res.data))
                    .catch(_error => {
                        notifyError('Something went wrong. Please try again later.')
                    });
            }
        });
    }

    const handleUpdate = (id, body, setLoading, handleClose, setError) => {
        commonValidationCall({
            method: 'post',
            endpoint: 'api/inventories/update-item/' + id,
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

    const customerBorrow = (id, customerId, body, setBorrowing, handleClose) => {
        commonValidationCall({
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

    const softDeleteOrRestoreItem = (id, setLoading, handleClose) => {
        noResponseCall({
            method: 'delete',
            endpoint: 'api/inventories/delete-item/' + id,
            hasToaster: true,
            setLoading,
            onSuccess: () => {
                const isEmpty = response?.data?.length === 0 || response.data.length === 1; // checks if the inventory is empty after deletion
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
            query: 'currentQuantity',
            sortable: true,
        },
        {
            label: 'Status',
            query: 'status',
            filter: true,
            options: ['In Stock', 'Low Stock', 'Out of Stock']
        },
        {
            label: 'Image'
        },
        {
            label: 'Last Check',
            query: 'lastCheck',
            sortable: true,
        },
        {
            label: 'Actions',
        },
    ];

    const { search, setSearch } = useSearchStore();

    const configMethods = {
        statusColor,
        handleSearch,
        handleToggle,
        handleSelectPage,
        handleTab,
        delete: softDeleteOrRestoreItem,
        update: handleUpdate,
        inlineUpdate: handleInlineUpdate,
        add: addInventory,
        borrow: customerBorrow,
        search, setSearch
    }

    const isAllow = isAdmin(user.roles) || isInventory(user.roles);

    return (
        <EnhancedTable
            configHead={configHead}
            data={response}
            loading={loading}
            configMethods={configMethods}
            total={loading ? 0 : response.total}
            childrenHead={
                <InventoryHead isAllow={isAllow} configMethods={configMethods} />
            }
            childrenBody={
                <InventoryBody
                    configMethods={configMethods}
                    data={response}
                    loading={loading}
                    isFrontDesk={isAdmin(user.roles) || isFrontDesk(user.roles)}
                    isAllow={isAllow}
                />
            }
        />
    )
}

export default Inventory
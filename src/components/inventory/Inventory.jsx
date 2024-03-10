import React, { useEffect, useState } from 'react';
import { FaPlus } from 'react-icons/fa';
import useSearchStore from '../../hooks/useSearchStore';
import useUser from '../../hooks/useUser';
import ButtonIconText from '../../utility_components/ButtonIconText';
import Add_Inventory_Modal from './modal/Add_Inventory_Modal';
import EnhancedTable from '../../utility_components/table/EnhancedTable';
import { isAdmin, isInventory } from '../../utility_functions/roles';
import { statusColor } from '../../utility_functions/statusColor';
import { notifyError } from '../../utility_functions/toaster';
import { getQueryParameters } from '../../utility_functions/urlQueries';
import InventoryBody from './InventoryBody';
import basicGetCall from '../../utility_functions/axiosCalls/basicGetCall';
import commonValidationCall from '../../utility_functions/axiosCalls/commonValidationCall';
import noResponseCall from '../../utility_functions/axiosCalls/noResponseCall';
import { INVENTORY_ENDPOINT, axiosCreate } from '../../utility_functions/axiosCalls/config';

const Inventories = () => {
    const { user } = useUser();

    const [response, setResponse] = useState(null);
    const [categories, setCategories] = useState([]);
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

    const handleAddInventory = () => {
        const addInventory = (body, setAdding, setError, handleClose) => {
            commonValidationCall({
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

    const handlePartialUpdate = (id, body, setLoading, handleClose, setError) => {
        commonValidationCall({
            method: 'patch',
            endpoint: 'api/inventories/update/' + id,
            body,
            hasToaster: true,
            setLoading,
            handleClose,
            setError,
            onSuccess: () => {
                if (body?.category) {
                    basicGetCall({
                        endpoint: 'api/getCategories',
                        setDataDirectly: setCategories
                    });
                }
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

    const softDeleteOrRestoreProduct = (id, setLoading, handleClose) => {
        noResponseCall({
            method: 'delete',
            endpoint: 'api/inventories/softDeleteOrRestoreProduct/' + id,
            hasToaster: true,
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
    };
    const configHead = [
        {
            label: 'ID',
        },
        {
            label: 'Product Name',
            query: 'productName',
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
        delete: softDeleteOrRestoreProduct,
        update: handlePartialUpdate,
        add: handleAddInventory,
        borrow: customerBorrow,
        search, setSearch
    }
    return (
        <EnhancedTable
            configHead={configHead}
            data={response}
            loading={loading}
            configMethods={configMethods}
            total={loading ? 0 : response.total}
            title='Inventory'
            isAllow={isAdmin(user.roles) || isInventory(user.roles)}
            childrenBody={
                <InventoryBody
                    configMethods={configMethods}
                    data={response}
                    loading={loading}
                    isAllow={isAdmin(user.roles) || isInventory(user.roles)}
                />
            }
        />
    )
}

export default Inventories
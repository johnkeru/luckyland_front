import React, { useEffect, useState } from 'react';
import useSearchStore from '../../../hooks/useSearchStore';
import useUser from '../../../hooks/useUser';
import EnhancedTable from '../../../utility_components/table/EnhancedTable';
import { isAdmin, isInventory } from '../../../utility_functions/roles';
import { statusColor } from '../../../utility_functions/statusColor';
import { notifyError } from '../../../utility_functions/toaster';
import { getQueryParameters } from '../../../utility_functions/urlQueries';
import UnavailableBody from './UnavailableBody';

import basicGetCall from '../../../utility_functions/axiosCalls/basicGetCall';
import commonValidationCall from '../../../utility_functions/axiosCalls/commonValidationCall';
import { UNAVAILABLE_ENDPOINT, axiosCreate } from '../../../utility_functions/axiosCalls/config';
import UnavailableHead from './UnavailableHead';

const Unavailable = () => {
    const { user } = useUser();
    const [categories, setCategories] = useState([]);

    const [response, setResponse] = useState(null);
    const [loading, setLoading] = useState(true);

    const [currentUrl, setCurrentUrl] = useState(UNAVAILABLE_ENDPOINT);
    const [sendUrl, setSendUrl] = useState(currentUrl);

    useEffect(() => {
        basicGetCall({
            endpoint: sendUrl,
            setResponse,
            setLoading: currentUrl === UNAVAILABLE_ENDPOINT ? setLoading : undefined,
        });
    }, [sendUrl]);

    useEffect(() => {
        basicGetCall({
            endpoint: 'api/categories',
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

    const addUnavailable = (body, setAdding, setError, handleClose) => {
        commonValidationCall({
            method: 'post',
            endpoint: 'api/unavailable/add-unavailable',
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
        });
    }

    const handleAddToOtherTable = (id, body, setLoading, setError, handleClose, inInventory) => {
        commonValidationCall({
            method: 'post',
            endpoint: inInventory ? 'api/unavailable/unavailable-to-inventory/' + id : 'api/unavailable/unavailable-to-waste/' + id,
            body,
            hasToaster: true,
            handleClose,
            setError,
            setLoading,
            onSuccess: () => {
                axiosCreate.get(sendUrl)
                    .then(res => setResponse(res.data))
                    .catch(_error => {
                        notifyError('Something went wrong. Please try again later.')
                    });
            }
        });
    }

    const handleInlineUpdateUnavailable = (id, body, setLoading, handleClose, setError) => {
        commonValidationCall({
            method: 'patch',
            endpoint: 'api/unavailable/unavailable-inline-update/' + id,
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

    const handleUpdateUnavailable = (id, body, setLoading, handleClose, setError) => {
        commonValidationCall({
            method: 'put',
            endpoint: 'api/unavailable/update-unavailable/' + id,
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
            label: 'Reason',
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
            label: 'Actions',
        },
    ];

    const { searchUnavailable, setSearchUnavailable } = useSearchStore();

    const configMethods = {
        statusColor,
        handleSearch,
        handleToggle,
        handleSelectPage,
        handleTab,
        update: handleUpdateUnavailable,
        inlineUpdate: handleInlineUpdateUnavailable,
        add: addUnavailable,
        addToOther: handleAddToOtherTable,
        search: searchUnavailable,
        setSearch: setSearchUnavailable
    }

    const isAllow = isAdmin(user.roles) || isInventory(user.roles);

    return (
        <EnhancedTable
            noTrash
            configHead={configHead}
            data={response}
            loading={loading}
            configMethods={configMethods}
            total={loading ? 0 : response.total}
            childrenHead={<UnavailableHead isAllow={isAllow} configMethods={configMethods} />}
            childrenBody={
                <UnavailableBody
                    configMethods={configMethods}
                    data={response}
                    loading={loading}
                    isAllow={isAllow}
                />
            }
        />
    )
}

export default Unavailable
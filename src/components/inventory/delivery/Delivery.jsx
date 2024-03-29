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
import DeliveryBody from './DeliveryBody';
import Add_Delivery_Modal from './modals/Add_Delivery_Modal';

import basicGetCall from '../../../utility_functions/axiosCalls/basicGetCall';
import commonValidationCall from '../../../utility_functions/axiosCalls/commonValidationCall';
import { DELIVERY_ENDPOINT, axiosCreate } from '../../../utility_functions/axiosCalls/config';

const Inventories = () => {
    const { user } = useUser();


    const [response, setResponse] = useState(null);
    const [loading, setLoading] = useState(true);

    const [currentUrl, setCurrentUrl] = useState(DELIVERY_ENDPOINT);
    const [sendUrl, setSendUrl] = useState(currentUrl);

    useEffect(() => {
        basicGetCall({
            endpoint: sendUrl,
            setResponse,
            setLoading: currentUrl === DELIVERY_ENDPOINT ? setLoading : undefined,
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

    const handleAddDelivery = () => {
        const addDelivery = (body, setAdding, setError, handleClose) => {

            commonValidationCall({
                method: 'post',
                endpoint: 'api/deliveries/addDelivery',
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
        return <Add_Delivery_Modal
            addDelivery={addDelivery}
            button={
                <ButtonIconText
                    Icon={<FaPlus />}
                    text='Add Delivery'
                    color="success"
                />
            }
            user={user}
        />
    }


    const configHead = [
        {
            label: 'ID',
        },
        {
            label: 'Company Name',
            query: 'companyName',
            sortable: true,
        },
        {
            label: 'Total Items',
        },
        { label: 'Category' },
        { label: 'Quantity' },
        { label: 'Arrival Date', },
        {
            label: 'Manage by',
            query: 'manage',
        },
        {
            label: 'Bills',
        },
    ];


    const { searchDeliver, setSearchDeliver } = useSearchStore();

    const configMethods = {
        statusColor,
        handleSearch,
        handleToggle,
        handleSelectPage,
        handleTab,
        add: handleAddDelivery,
        search: searchDeliver,
        setSearch: setSearchDeliver
    }
    return (
        <EnhancedTable
            noTrash
            configHead={configHead}
            data={response}
            loading={loading}
            configMethods={configMethods}
            total={loading ? 0 : response.total}
            title='Deliveries'
            isAllow={isAdmin(user.roles) || isInventory(user.roles)}
            childrenBody={
                <DeliveryBody
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
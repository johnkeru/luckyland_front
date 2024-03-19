import React, { useEffect, useState } from 'react';
import useSearchStore from '../../hooks/useSearchStore';
import useUser from '../../hooks/useUser';
import EnhancedTable from '../../utility_components/table/EnhancedTable';
import { isAdmin } from '../../utility_functions/roles';
import { statusColor } from '../../utility_functions/statusColor';

import RecordManagementBody from './RecordManagementBody';
import { CUSTOMER_RECORDS_ENDPOINT } from '../../utility_functions/axiosCalls/config';
import basicGetCall from '../../utility_functions/axiosCalls/basicGetCall';
import { getQueryParameters } from '../../utility_functions/urlQueries';

const RecordManagement = () => {
    const { user } = useUser();

    const [response, setResponse] = useState(null);
    const [loading, setLoading] = useState(true);

    const [currentUrl, setCurrentUrl] = useState(CUSTOMER_RECORDS_ENDPOINT);
    const [sendUrl, setSendUrl] = useState(currentUrl);

    useEffect(() => {
        basicGetCall({
            endpoint: sendUrl,
            setResponse,
            setLoading: currentUrl === CUSTOMER_RECORDS_ENDPOINT ? setLoading : undefined,
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

    const configHead = [
        {
            label: 'ID',
            sortable: true,
            query: 'id'
        },
        {
            label: 'Reservation HASH',
        },
        {
            label: 'Check-In',
            sortable: true,
            query: 'checkIn'
        },
        {
            label: 'Check-Out',
            sortable: true,
            query: 'checkOut'
        },
        {
            label: 'Status',
        },
        {
            label: 'Amount Paid',
            sortable: true,
            query: 'amountPaid'
        },
        {
            label: 'Customer Name',
            sortable: true,
            query: 'firstName'
        },
        {
            label: 'Email',
            sortable: false,
            query: 'email'
        },
        {
            label: 'Phone Number',
            sortable: false,
            query: 'phoneNumber'
        }
    ];


    const { searchCustomerRecords, setSearchCustomerRecords } = useSearchStore();

    const configMethods = {
        statusColor,
        handleSearch,
        handleToggle,
        handleSelectPage,
        handleTab,
        search: searchCustomerRecords,
        setSearch: setSearchCustomerRecords
    }
    return (
        <EnhancedTable
            noTrash
            configHead={configHead}
            data={response}
            loading={loading}
            configMethods={configMethods}
            total={loading ? 0 : response.total}
            title='Record Management'
            isAllow={isAdmin(user.roles)}
            childrenBody={
                <RecordManagementBody
                    configMethods={configMethods}
                    data={response}
                    loading={loading}
                    isAllow={isAdmin(user.roles)}
                />
            }
        />
    )
}

export default RecordManagement
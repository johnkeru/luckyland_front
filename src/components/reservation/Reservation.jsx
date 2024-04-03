import { Button } from '@mui/material';
import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router';
import useSearchStore from '../../hooks/useSearchStore';
import useUser from '../../hooks/useUser';
import EnhancedTable from '../../utility_components/table/EnhancedTable';
import basicGetCall from '../../utility_functions/axiosCalls/basicGetCall';
import commonValidationCall from '../../utility_functions/axiosCalls/commonValidationCall';
import { RESERVATION_ENDPOINT, axiosCreate } from '../../utility_functions/axiosCalls/config';
import { isAdmin, isFrontDesk } from '../../utility_functions/roles';
import { statusColor } from '../../utility_functions/statusColor';
import { notifyError } from '../../utility_functions/toaster';
import { getQueryParameters } from '../../utility_functions/urlQueries';
import ReservationBody from './ReservationBody';
import ReservationStatusCounts from './ReservationStatusCounts';

const Reservation = () => {
    const { user } = useUser();
    const nav = useNavigate();

    const [response, setResponse] = useState(null);
    const [rooms, setRooms] = useState([]);
    const [loading, setLoading] = useState(true);

    const [currentUrl, setCurrentUrl] = useState(RESERVATION_ENDPOINT);
    const [sendUrl, setSendUrl] = useState(currentUrl);

    useEffect(() => {
        basicGetCall({
            endpoint: sendUrl,
            setResponse,
            setLoading: currentUrl === RESERVATION_ENDPOINT ? setLoading : undefined,
        });
    }, [sendUrl]);

    useEffect(() => {
        basicGetCall({
            endpoint: 'api/rooms-only',
            setDataDirectly: rms => {
                let filtered = rms.map(r => r.name);
                setRooms(filtered);
            },
        });
    }, []);

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
        return <Button onClick={() => nav('/reservation')} variant='contained'>Add Reservation</Button>
    }
    const handleCancel = (id, setLoading, handleClose) => {
        commonValidationCall({
            endpoint: 'api/reservations/cancel-reservation/' + id,
            method: 'post',
            setLoading,
            handleClose,
            hasToaster: true,
            onSuccess: () => {
                axiosCreate.get(sendUrl)
                    .then(res => setResponse(res.data))
                    .catch(_error => {
                        notifyError('Something went wrong. Please try again later.')
                    });
            }
        })
    }
    const handleUpdateStatus = (id, body, setLoading, handleClose) => {
        commonValidationCall({
            method: 'patch',
            endpoint: `api/reservations/updateReservationStatus/${id}`,
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
    const handleReturnAll = (customerId, setLoading, handleClose) => {
        commonValidationCall({
            method: 'patch',
            endpoint: 'api/inventories/returnAll',
            body: { customer_id: customerId },
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
        })
    }
    const handleReturnPartial = (body, setLoading, handleClose) => {
        commonValidationCall({
            method: 'patch',
            endpoint: 'api/inventories/returnPartially',
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
        })
    }
    const handleGCashPayment = (id, body, setLoading, handleClose) => {
        commonValidationCall({
            method: 'patch',
            endpoint: 'api/reservations/checkReservationBalance/' + id,
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
        })
    }

    const handleHeadCounts = () => {
        if (response?.counts) {
            return <ReservationStatusCounts counts={response.counts} handleToggle={handleToggle} />
        }
    }

    const configHead = [
        {
            label: 'Reservation Code',
        },
        {
            label: 'Customer Name',
        },
        {
            label: 'Contact',
        },
        {
            label: 'Reservation Date',
            query: 'month',
            filter: true,
            options: [
                'January',
                'February',
                'March',
                'April',
                'May',
                'June',
                'July',
                'August',
                'September',
                'October',
                'November',
                'December',
            ]
        },
        {
            label: 'Room',
            query: 'room',
            filter: true,
            options: rooms
        },
        {
            label: 'Status',
        },
        {
            label: 'Actions',
        },
    ];

    const { searchReservation, setSearchReservation } = useSearchStore();

    const configMethods = {
        statusColor,
        handleSearch,
        handleToggle,
        handleSelectPage,
        handleTab,
        add: handleAddInventory,
        search: searchReservation,
        setSearch: setSearchReservation,
        handleHeadCounts,
        updateStatus: handleUpdateStatus,
        returnAll: handleReturnAll,
        returnPartial: handleReturnPartial,
        handleCancel,
        handleGCashPayment
    }


    return (
        <EnhancedTable
            noTrash={true}
            configHead={configHead}
            data={response}
            loading={loading}
            configMethods={configMethods}
            total={loading ? 0 : response.total}
            title='Reservation'
            isAllow={isAdmin(user.roles) || isFrontDesk(user.roles)}
            childrenBody={
                <ReservationBody
                    configMethods={configMethods}
                    data={response}
                    loading={loading}
                    isAllow={isAdmin(user.roles) || isFrontDesk(user.roles)}
                />
            }
        />
    )
}

export default Reservation
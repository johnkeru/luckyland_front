import { Button } from '@mui/material';
import React, { useEffect, useState } from 'react';
import useSearchStore from '../../hooks/useSearchStore';
import useUser from '../../hooks/useUser';
import EnhancedTable from '../../utility_components/table/EnhancedTable';
import basicGetCall from '../../utility_functions/axiosCalls/basicGetCall';
import { RESERVATION_ENDPOINT, axiosCreate } from '../../utility_functions/axiosCalls/config';
import { isAdmin, isFrontDesk } from '../../utility_functions/roles';
import { statusColor } from '../../utility_functions/statusColor';
import { notifyError } from '../../utility_functions/toaster';
import { getQueryParameters } from '../../utility_functions/urlQueries';
import Booking from '../landing/booking/Booking';
import ReservationBody from './ReservationBody';
import ReservationStatusCounts from './ReservationStatusCounts';
import commonValidationCall from '../../utility_functions/axiosCalls/commonValidationCall';

const Reservation = () => {
    const { user } = useUser();

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
            endpoint: 'api/getRoomsWithUnavailableDates',
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
        return <Booking
            button={<Button variant='contained'>Add Reservation</Button>}
            onSuccessBooking={
                () => {
                    axiosCreate.get(sendUrl)
                        .then(res => setResponse(res.data))
                        .catch(_error => {
                            notifyError('Something went wrong. Please try again later.')
                        });
                }
            }
        />
    }

    const handleUpdateStatus = (id, body, setLoading, handleClose,) => {
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
            query: 'customerName',
            sortable: true,
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
            label: 'Guest No'
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
        updateStatus: handleUpdateStatus
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
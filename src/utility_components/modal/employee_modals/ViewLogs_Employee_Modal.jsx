import { Button, DialogBody, DialogFooter, List, ListItem } from "@material-tailwind/react";
import React, { useEffect, useState } from 'react';
import axiosCall from '../../../utility_functions/axiosCall';
import { formatDate } from '../../../utility_functions/formatTime';
import Modal from '../Modal';
import LogIcon from "../../LogIcon";

const ViewLogs_Employee_Modal = ({ button, empDetails }) => {
    const [open, setOpen] = useState(false);
    const handleOpen = () => setOpen(true);

    const handleClose = () => {
        if (response?.unread !== 0) {
            axiosCall({ endpoint: 'api/employees/logsVisited/' + empDetails.id, setResponse });
        }
        setOpen(false)
    };

    const [response, setResponse] = useState(null);
    const [loading, setLoading] = useState(true);
    const [loadingNext, setLoadingNext] = useState(false);

    const [scrollContainer, setScrollContainer] = useState(null);

    useEffect(() => {
        axiosCall({
            endpoint: 'api/employees/employeeLogs/' + empDetails.id,
            setResponse,
            setLoading,
        });
    }, []);

    useEffect(() => {
        if (scrollContainer) {
            // Scroll to the bottom of the container
            scrollContainer.scrollTop = scrollContainer.scrollHeight;
        }
    }, [loadingNext, scrollContainer]);

    const handleShowMore = () => {
        axiosCall({
            endpoint: response.data.next_page_url,
            setCursorResponse: setResponse,
            setLoading: setLoadingNext
        });
    }
    return (
        <Modal
            size='md'
            badge={response?.unread}
            button={button}
            handleClose={handleClose}
            handleOpen={handleOpen}
            open={open}
            title={`${empDetails.firstName}'s Logs`}
            children={
                <DialogBody>
                    <h2>Total Logs: {response?.total_logs || 0}</h2>
                    {loading ? <List className='px-0'>
                        <ListItem selected className='cursor-default'>
                            Loading ...
                        </ListItem>
                    </List> : <List
                        ref={(ref) => setScrollContainer(ref)} // Set the scrollContainer ref
                        className={`px-0 ${(response?.data?.data.length >= 8) ? `overflow-y-scroll h-[45vh]` : undefined}`}>
                        {response.data.data.map(log => (
                            <ListItem key={log.id} onClick={e => e.preventDefault()} className={`flex justify-between cursor-default items-center gap-2 border border-b-2 ${!log.visited ? 'bg-blue-gray-100' : undefined}`}>
                                <div className="flex items-center gap-3">
                                    <LogIcon type={log.type} />
                                    {log.action}
                                </div>
                                <p className='text-sm text-blue-gray-500'>{formatDate(new Date(log.created_at))}</p>
                            </ListItem>
                        ))}
                    </List>}
                    {(loading || response?.data?.data.length <= 8) ? <DialogFooter className="px-0">
                        {!response?.data?.next_page_url ? <p className="text-center w-full">No more.</p> : <Button className='w-full bg-gray-700 hover:bg-gray-800 flex items-center justify-center' onClick={handleShowMore} loading={loadingNext}>Show more</Button>}
                    </DialogFooter> : undefined}
                </DialogBody>
            }
        />

    )
}

export default ViewLogs_Employee_Modal
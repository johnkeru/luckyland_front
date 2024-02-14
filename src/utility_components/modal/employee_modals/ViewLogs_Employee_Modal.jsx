import { DialogContent, Grid, List, ListItem, Typography } from "@mui/material";
import React, { useEffect, useState } from 'react';
import axiosCall from '../../../utility_functions/axiosCall';
import { formatDate } from '../../../utility_functions/formatTime';
import ButtonWithLoading from '../../ButtonWithLoading';
import LogIcon from "../../LogIcon";
import CommonFooter from '../CommonFooter';
import Modal from '../Modal';

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
            title={
                <Grid >
                    <Typography variant="h5">{empDetails.firstName}'s Logs</Typography>
                    <Typography variant="body2" ml={.1} color='gray'>Total logs: {response?.total_logs || 0}</Typography>
                </Grid>
            }
            children={
                <>
                    <DialogContent dividers>
                        {loading ? <List>
                            <ListItem className='cursor-default'>
                                Loading ...
                            </ListItem>
                        </List> : <List
                            ref={(ref) => setScrollContainer(ref)} // Set the scrollContainer ref
                            className={`px-0 ${(response?.data?.data.length >= 8) ? `overflow-y-scroll h-[45vh]` : undefined}`}>
                            {response.data.data.map(log => (
                                <ListItem key={log.id}
                                    onClick={e => e.preventDefault()}
                                    sx={{
                                        borderBottom: '1px solid #c0c0c0', mb: .5, p: 1, display: 'flex', justifyContent: 'space-between', gap: 2,
                                        bgcolor: !log.visited ? 'lightgray' : undefined
                                    }}
                                >
                                    <Grid sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                                        <LogIcon type={log.type} />
                                        {log.action}
                                    </Grid>
                                    <Typography variant="body2" color='gray'>{formatDate(new Date(log.created_at))}</Typography>
                                </ListItem>
                            ))}
                        </List>}
                    </DialogContent>
                    <CommonFooter>
                        {(response?.data?.data.length <= 8) ?
                            <ButtonWithLoading
                                fullWidth
                                color="info"
                                onClick={handleShowMore}
                                loading={loadingNext}
                                loadingText="Showing more..."
                            >
                                Show more
                            </ButtonWithLoading> : <Typography width='100%' variant="body1" textAlign='center' color='gray'>No more.</Typography>}
                    </CommonFooter>
                </>
            }
        />

    )
}

export default ViewLogs_Employee_Modal
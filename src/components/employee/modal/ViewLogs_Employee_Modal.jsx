import { Box, DialogContent, Grid, List, ListItem, Typography } from "@mui/material";
import React, { useEffect, useState } from 'react';
import { formatDate } from '../../../utility_functions/formatTime';
import ButtonWithLoading from '../../../utility_components/ButtonWithLoading';
import LogIcon from "../../../utility_components/LogIcon";
import CommonFooter from '../../../utility_components/modal/CommonFooter';
import Modal from '../../../utility_components/modal/Modal';
import paginationCall from "../../../utility_functions/axiosCalls/paginationCall";
import basicGetCall from "../../../utility_functions/axiosCalls/basicGetCall";

const ViewLogs_Employee_Modal = ({ button, empDetails }) => {
    const [open, setOpen] = useState(false);
    const handleOpen = () => setOpen(true);

    const getAllLogs = () => {
        basicGetCall({
            endpoint: 'api/employees/employee-logs/' + empDetails.id,
            setResponse,
            setLoading,
        });
    }

    const handleClose = () => {
        if (response?.unread !== 0) {
            basicGetCall({
                endpoint: 'api/employees/logs-visited/' + empDetails.id,
                onSuccess: getAllLogs
            });
        }
        setOpen(false)
    };

    const [response, setResponse] = useState(null);
    const [loading, setLoading] = useState(true);
    const [loadingNext, setLoadingNext] = useState(false);

    const [scrollContainer, setScrollContainer] = useState(null);

    useEffect(() => {
        getAllLogs();
    }, []);

    useEffect(() => {
        if (scrollContainer) {
            // Scroll to the bottom of the container
            scrollContainer.scrollTop = scrollContainer.scrollHeight;
        }
    }, [loadingNext, scrollContainer]);

    const handleShowMore = () => {
        paginationCall({
            endpoint: response.next_page_url,
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
            loading={loading || loadingNext}
            handleOpen={handleOpen}
            open={open}
            title={
                <Grid >
                    <Typography variant="h5">{empDetails.firstName}'s Logs</Typography>
                    <Typography variant="body2" ml={.1} color='gray'>Total logs: {response?.total || 0}</Typography>
                </Grid>
            }
            children={
                <>
                    <DialogContent dividers>
                        <Box width='fit-content'>
                            {loading ? <List>
                                <ListItem className='cursor-default' sx={{ width: '400px' }}>
                                    Loading ...
                                </ListItem>
                            </List> : <List
                                ref={(ref) => setScrollContainer(ref)} // Set the scrollContainer ref
                                className={`px-0 ${(response?.data.length >= 8) ? `overflow-y-scroll h-[45vh]` : undefined}`}>
                                {
                                    response ? response.data.length !== 0 ?
                                        response.data.map(log => (
                                            <ListItem key={log.id}
                                                onClick={e => e.preventDefault()}
                                                sx={{
                                                    borderBottom: '1px solid #c0c0c0', mb: .5, p: 1, display: 'flex', justifyContent: 'space-between', gap: 2,
                                                    bgcolor: !log.visited ? '#ddd' : undefined
                                                }}
                                            >
                                                <Grid sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                                                    <LogIcon type={log.type} />
                                                    {log.action}
                                                </Grid>
                                                <Typography variant="body2" color='gray'>{formatDate(new Date(log.created_at))}</Typography>
                                            </ListItem>
                                        )) : <ListItem sx={{ width: '400px' }}>
                                            No logs yet.
                                        </ListItem>
                                        : undefined}
                            </List>}
                        </Box>
                    </DialogContent>
                    {response?.data.length !== 0 ? <CommonFooter>
                        {(response?.next_page_url) ?
                            <ButtonWithLoading
                                fullWidth
                                color="info"
                                onClick={handleShowMore}
                                loading={loadingNext}
                                loadingText="Showing more..."
                            >
                                Show more
                            </ButtonWithLoading> : <Typography width='100%' variant="body1" textAlign='center' color='gray'>No more.</Typography>
                        }
                    </CommonFooter> : undefined}
                </>
            }
        />

    )
}

export default ViewLogs_Employee_Modal
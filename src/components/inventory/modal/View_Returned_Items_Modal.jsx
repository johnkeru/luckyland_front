import { Button, CircularProgress, DialogContent, Grid, List, ListItem, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Typography } from "@mui/material";
import React, { useEffect, useState } from 'react';
import { formatDate } from '../../../utility_functions/formatTime';
import ButtonWithLoading from '../../../utility_components/ButtonWithLoading';
import CommonFooter from '../../../utility_components/modal/CommonFooter';
import Modal from '../../../utility_components/modal/Modal';
import paginationCall from "../../../utility_functions/axiosCalls/paginationCall";
import basicGetCall from "../../../utility_functions/axiosCalls/basicGetCall";

const View_Returned_Items_Modal = ({ openReturnedModal, handleCloseAll, data }) => {

    const getAllLogs = () => {
        basicGetCall({
            endpoint: 'api/returned-items/' + data.id,
            setResponse,
            setLoading,
        });
    }

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

    const hiddenButton = <Button sx={{ display: 'none' }}>Close</Button>;

    console.log(response)
    return (
        <Modal
            size='md'
            draggable
            button={hiddenButton}
            handleClose={handleCloseAll}
            loading={loading || loadingNext}
            open={openReturnedModal}
            title={`Returned ${data.name} Quantity`}
            children={
                <>
                    <DialogContent dividers>

                        <TableContainer>
                            <Table>
                                <TableHead>
                                    <TableRow>
                                        <TableCell>Customer Name</TableCell>
                                        <TableCell>Quantity Returned</TableCell>
                                        <TableCell>Quantity Lost</TableCell>
                                        <TableCell>Paid</TableCell>
                                        <TableCell>Returned At</TableCell>
                                    </TableRow>
                                </TableHead>
                                <TableBody>
                                    {
                                        loading ? (
                                            // If loading, display a loading indicator
                                            <TableRow>
                                                <TableCell sx={{ border: 0 }} align="center">
                                                    loading...
                                                </TableCell>
                                            </TableRow>
                                        ) : (
                                            // If not loading, display data or "No returned items yet" message
                                            response && response.data.length !== 0 ? (
                                                response.data.map(returnedItem => (
                                                    <TableRow key={returnedItem.id}>
                                                        <TableCell>{returnedItem.name}</TableCell>
                                                        <TableCell align="center">{returnedItem.return_quantity}</TableCell>
                                                        <TableCell align="center">{returnedItem.borrowed_quantity}</TableCell>
                                                        <TableCell>₱ {returnedItem.paid || 0}</TableCell>
                                                        <TableCell>{formatDate(new Date(returnedItem.returned_at))}</TableCell>
                                                    </TableRow>
                                                ))
                                            ) : (
                                                <TableRow>
                                                    <TableCell colSpan={3}>No returned items yet.</TableCell>
                                                </TableRow>
                                            )
                                        )
                                    }
                                </TableBody>
                            </Table>
                        </TableContainer>

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

export default View_Returned_Items_Modal
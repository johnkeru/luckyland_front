import { Button, DialogContent, Grid, List, ListItem, Typography } from "@mui/material";
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
            endpoint: 'api/returnedItems/' + data.id,
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

    return (
        <Modal
            size='md'
            button={hiddenButton}
            handleClose={handleCloseAll}
            loading={loading || loadingNext}
            open={openReturnedModal}
            title={`Returned ${data.productName} Items`}
            children={
                <>
                    <DialogContent dividers sx={{ width: '500px' }}>
                        {loading ? <List>
                            <ListItem className='cursor-default'>
                                Loading ...
                            </ListItem>
                        </List> : <List
                            ref={(ref) => setScrollContainer(ref)} // Set the scrollContainer ref
                            className={`px-0 ${(response?.data.length >= 8) ? `overflow-y-scroll h-[45vh]` : undefined}`}>
                            {
                                response ? response.data.length !== 0 ?
                                    response.data.map(returnedItem => (
                                        <ListItem key={returnedItem.id}
                                            onClick={e => e.preventDefault()}
                                            sx={{ mb: .5, p: 1, display: 'flex', justifyContent: 'space-between', gap: 2, }}
                                        >
                                            <Typography variant="body1"> {returnedItem.customerName}</Typography>
                                            <Typography variant="body1"> {returnedItem.quantity_returned}</Typography>
                                            <Typography variant="body1"> {formatDate(new Date(returnedItem.returned_at))}</Typography>
                                        </ListItem>
                                    )) : <ListItem>
                                        No returned items yet.
                                    </ListItem>
                                    : undefined}
                        </List>}
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
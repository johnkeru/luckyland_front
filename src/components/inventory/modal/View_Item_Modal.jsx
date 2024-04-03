import {
    Box,
    DialogContent,
    Grid,
    Typography
} from "@mui/material";
import React from "react";
import { FaRegCalendarCheck } from "react-icons/fa";
import { MdOutlineInventory } from "react-icons/md";
import InventoryStatusChip from "../ItemStatusChip";
import { formatDate } from '../../../utility_functions/formatTime';
import Modal from '../../../utility_components/modal/Modal';
import { NO_IMAGE, resizeInventoryPic } from "../../../utility_functions/cloudinaryUrl";

export default function View_Inventory_Modal({ data, button }) {

    const inv = data
    const image = data?.image || NO_IMAGE

    const [open, setOpen] = React.useState(false);
    const handleOpen = () => setOpen(!open);

    return (
        <Modal
            button={button}
            handleClose={handleOpen}
            maxWidth="lg"
            handleOpen={handleOpen}
            open={open}
            title={<>
                <Grid container>
                    <Grid item xs={12}>
                        <Grid container alignItems="center" spacing={1}>
                            <Grid item>
                                <Typography variant="h5">{inv.name}</Typography>
                            </Grid>
                            <Grid item>
                                <InventoryStatusChip status={inv.status} />
                            </Grid>
                        </Grid>
                    </Grid>
                    <Grid display={'flex'} gap={2} justifyContent='start' alignItems='center' mt={-.5} ml={.5} sx={{ color: 'gray' }}>
                        <Grid display={'flex'} gap={1} alignItems='center'>
                            <Typography variant="body2">{formatDate(inv.lastUpdated)}</Typography>
                            <Box
                                sx={{
                                    fontSize: '1.125rem', // 18px
                                    lineHeight: '1.75rem' // 28px
                                }}
                            >
                                <FaRegCalendarCheck />

                            </Box>
                        </Grid>
                        <Typography variant="body1">|</Typography>
                        <Grid display={'flex'} gap={1} alignItems='center'>
                            <Typography variant="body2">
                                {data.addedBy}
                            </Typography>
                            <Box
                                sx={{
                                    fontSize: '1.125rem', // 18px
                                    lineHeight: '1.75rem' // 28px
                                }}
                            >
                                <MdOutlineInventory />

                            </Box>
                        </Grid>
                    </Grid>
                </Grid>
            </>
            }
            children={<DialogContent dividers sx={{ width: '700px' }}>

                <img
                    loading="lazy"
                    srcSet={resizeInventoryPic(image, 500, 350)}
                    style={{
                        objectFit: 'cover',
                        objectPosition: 'center',
                        width: '100%',
                        height: '100%',
                        backgroundColor: '#E5E7EB',
                    }}
                />

                {inv.description ? <Typography variant="body1" color="text.secondary" mb={1}>
                    {inv.description}
                </Typography> : undefined}

                <Typography variant="body1">
                    Current quantity: {inv.currentQuantity}
                </Typography>

                <Typography variant="body1">
                    Max quantity: {inv.maxQuantity}
                </Typography>

                <Typography variant="body1">
                    Re-order point: {inv.reOrderPoint}
                </Typography>

                {inv.price ? <Typography variant="body1">
                    Price: {inv.price}
                </Typography> : undefined}

                {inv.supplier ? (
                    <Typography variant="body1">
                        Supplier: {inv.supplier}
                    </Typography>
                ) : undefined}

                {inv.customers_who_borrows_count !== 0 ? (
                    <Typography variant="body1">
                        Borrowers: {inv.customers_who_borrows_count}
                    </Typography>
                ) : undefined}
            </DialogContent>}
        />

    );
}
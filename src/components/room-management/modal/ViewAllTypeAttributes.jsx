import React from 'react'
import Modal from '../../../utility_components/modal/Modal';
import { Box, DialogContent, List, ListItem, ListItemText } from '@mui/material';

const ViewAllTypeAttributes = ({ button, room }) => {
    const [open, setOpen] = React.useState(false);
    const handleOpen = () => setOpen(!open);
    return (
        <Modal
            button={button}
            handleClose={handleOpen}
            maxWidth="md"
            handleOpen={handleOpen}
            open={open}
            title={<Box mr={10}>
                {room.type + ' Attributes'}
            </Box>}
            children={<>
                <DialogContent dividers>
                    <List sx={{ p: 0, }}>
                        {room.attributes.map((attr) => (
                            <ListItem key={attr.id} sx={{ p: 0 }}>
                                <ListItemText primary={attr.name} />
                            </ListItem>
                        ))}
                    </List>
                </DialogContent>
            </>}
        />
    )
}

export default ViewAllTypeAttributes
import { Box, Button, Typography } from '@mui/material';
import React from 'react';
import TableSearchBar from '../../utility_components/table/TableSearchBar';
import Add_Employee_Modal from './modal/Add_Employee_Modal';

const EmployeeHead = ({ configMethods }) => {

    return (
        <Box p={3} >
            <Typography variant="h4" gutterBottom color='info.main'>Employee Management</Typography>
            <Typography variant="body1" gutterBottom>
                Efficiently manage your workforce within the system. Track employee data, streamline scheduling, and ensure smooth operations to optimize productivity.
            </Typography>

            <Box display='flex' alignItems='center' justifyContent='space-between' gap={2} mt={2}>
                <TableSearchBar configMethods={configMethods} />

                <Add_Employee_Modal
                    configMethods={configMethods}
                    button={
                        <Button variant='contained' color='info'>
                            Add Employee
                        </Button>
                    }
                />
            </Box>
        </Box>
    )
}

export default EmployeeHead
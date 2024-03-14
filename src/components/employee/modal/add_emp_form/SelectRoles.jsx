import React from "react";
import useRole from "../../../../hooks/useRoles";
import { Box, Checkbox, FormControl, FormControlLabel, FormGroup, FormLabel, Grid, Typography } from "@mui/material";

export default function SelectRoles({ selectedRoleIds, setSelectedRoleIds, step2Error, setStep2Error }) {
    const { roles } = useRole();

    const handleCheckboxChange = (roleId) => {
        setStep2Error('');
        setSelectedRoleIds((prevSelectedRoleIds) => {
            if (prevSelectedRoleIds.includes(roleId)) {
                // If the role ID is already selected, remove it
                return prevSelectedRoleIds.filter((selectedRoleId) => selectedRoleId !== roleId);
            } else {
                // If the role ID is not selected, add it
                return [...prevSelectedRoleIds, roleId];
            }
        });
    };


    return (
        <FormControl sx={{ mb: 3, width: '100%' }} component="fieldset" variant="standard">
            <FormLabel component="legend" sx={{ display: 'flex', gap: 1, alignItems: 'center' }}>
                <Typography>Select Roles</Typography>
                {step2Error && <Typography color='red' variant="body2">{step2Error}*</Typography>}
            </FormLabel>

            <FormGroup >
                <Grid sx={{ display: 'flex', justifyContent: 'space-between' }}>
                    <div>
                        {
                            roles.length !== 0 ?
                                roles.slice(0, 2).map(role => (
                                    <Box key={role.id}>
                                        <FormControlLabel
                                            control={
                                                <Checkbox checked={selectedRoleIds.includes(role.id)} onChange={() => handleCheckboxChange(role.id)} name={role.roleName} />
                                            }
                                            label={role.roleName}
                                        />
                                        <Typography variant="body2" color='GrayText'>
                                            {role.description}
                                        </Typography>
                                    </Box>
                                )) :
                                undefined
                        }
                    </div>
                    <div>
                        {
                            roles.length !== 0 ?
                                roles.slice(2, 4).map(role => (
                                    <Box key={role.id}>
                                        <FormControlLabel
                                            control={
                                                <Checkbox checked={selectedRoleIds.includes(role.id)} onChange={() => handleCheckboxChange(role.id)} name={role.roleName} />
                                            }
                                            label={role.roleName}
                                        />
                                        <Typography variant="body2" color='GrayText'>
                                            {role.description}
                                        </Typography>
                                    </Box>
                                )) :
                                'Loading roles..'
                        }
                    </div>
                </Grid>
            </FormGroup>
        </FormControl>
    );
}

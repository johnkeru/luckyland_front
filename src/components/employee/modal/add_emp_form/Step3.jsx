import React, { useEffect, useState } from 'react';
import { Box, IconButton, Tooltip, Typography } from '@mui/material';
import { useSnackbar } from 'notistack';
import { FaFacebookSquare, FaInstagram, FaTwitter, FaCheck } from "react-icons/fa";
import { IoCopy } from "react-icons/io5";
import { RiErrorWarningFill } from "react-icons/ri";
import InputIcon from '../../../../utility_components/InputIcon';

const Step3 = ({ register, user, watch, inAdd }) => {
    const { enqueueSnackbar } = useSnackbar();
    const [copied, setCopied] = useState(false);
    const [passwordClick, setPasswordClick] = useState(false);

    // Function to copy text to clipboard
    const copyToClipboard = (text) => {
        navigator.clipboard.writeText(text);
        enqueueSnackbar('Copied to clipboard', { variant: 'success' });
        setCopied(true);
    };

    useEffect(() => {
        const id = setTimeout(() => {
            setCopied(false);
        }, 3000);
        return () => clearTimeout(id); // Correct cleanup function
    }, [copied]);

    return (
        <>
            {/* Social Media Links */}
            <InputIcon sx={{ mb: 2 }} defaultValue={user?.facebook} Icon={FaFacebookSquare} label='Facebook (Optional)' name='facebook' register={register} placeholder='Enter Facebook link or (Etami8, 100009257219664)' mb={4} />
            <InputIcon sx={{ mb: 2 }} defaultValue={user?.instagram} Icon={FaInstagram} label='Instagram (Optional)' name='instagram' register={register} placeholder='Enter Instagram link or (Etami8, 100009257219664)' mb={4} />
            <InputIcon sx={{ mb: 2 }} defaultValue={user?.twitter} Icon={FaTwitter} label='Twitter (Optional)' name='twitter' register={register} placeholder='Enter Twitter link or (Etami8, 100009257219664)' mb={4} />

            {(inAdd && watch('email') && watch('password')) && (
                <Box boxShadow={1} width='fit-content' p={2}>
                    <Typography variant="h6" sx={{ mb: 1 }}>New employee credentials</Typography>
                    <Box display='flex' gap={1}>
                        <Box>
                            <Typography variant="body1" >User: {watch('email')}</Typography>
                            <Typography variant="body1" onClick={() => setPasswordClick(!passwordClick)}>Password: {passwordClick ? watch('password') : '**********'}</Typography>
                        </Box>
                        <Tooltip title={copied ? 'Copied' : 'Copy employee email and password'} key="tooltip">
                            <IconButton onClick={() => copyToClipboard(`User: ${watch('email')}, Password: ${watch('password')}`)}>
                                {copied ? <FaCheck color='green' /> : <IoCopy />}
                            </IconButton>
                        </Tooltip>
                    </Box>
                    <Box mt={2}>
                        <Typography variant="body2" color="red" sx={{ display: 'flex', alignItems: 'center', gap: 1 }}><RiErrorWarningFill /> Please make sure to securely store the employee's password.</Typography>
                    </Box>
                </Box>

            )}
        </>
    );
};

export default Step3;

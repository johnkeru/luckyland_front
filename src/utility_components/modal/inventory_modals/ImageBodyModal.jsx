import { Box, CircularProgress } from '@mui/material';
import React from 'react';
import { SlCloudUpload } from 'react-icons/sl';
import { resizeInventoryPic, resizeProfilePicture } from '../../../utility_functions/cloudinaryUrl';

const ImageBodyModal = ({
    getRootProps,
    getInputProps,
    isDragActive,
    image,
    uploading,
    isEdit
}) => {

    return (
        <>
            {!image ? <Box
                {...getRootProps()}
                sx={{
                    display: 'flex',
                    flexDirection: 'column',
                    justifyContent: 'center',
                    alignItems: 'center',
                    textAlign: 'center',
                    width: '100%',
                    height: '300px',
                    border: '4px dashed #3b82f6',
                    color: '#3b82f6',
                    bgcolor: isDragActive ? '#f3f4f6' : 'transparent',
                    position: 'relative',
                    cursor: !uploading ? 'pointer' : 'default',
                }}
            >


                {!uploading ? <input {...getInputProps()} /> : undefined}
                <Box sx={{ display: 'flex', p: 5, flexDirection: 'column', justifyContent: 'center', alignItems: 'center', width: '100%', height: '100%' }}>
                    <SlCloudUpload style={{ width: '5rem', height: '5rem' }} />
                    {isDragActive ? (
                        <p>Drop the image here ...</p>
                    ) : (
                        <p>Drag 'n' drop an image here, or click to select an image</p>
                    )}
                    {uploading ? <Uploading isNoImage isEdit={isEdit} /> : undefined}
                </Box>

            </Box>
                :
                <Box position='relative' height='300px'>
                    {uploading && <Uploading />}
                    <img
                        loading="lazy"
                        srcSet={isEdit ? resizeInventoryPic(image, 400, 350) : resizeProfilePicture(image, 250, 250)}
                        style={{
                            objectFit: 'cover',
                            objectPosition: 'center',
                            width: '100%',
                            height: '100%',
                        }}
                    />
                </Box>}
        </>
    );
}

export default ImageBodyModal;



const Uploading = ({ isNoImage }) => {
    return (
        <Box
            position='absolute'
            top={0}
            left={0}
            right={0}
            m={'auto'}
            width={"100%"}
            height={'100%'}
            display="flex"
            alignItems="center"
            justifyContent="center"
            zIndex={10}
            sx={{ backgroundColor: 'rgba(0,0,0,.3)' }}
        >
            <CircularProgress color="primary" size={40} thickness={4} />
        </Box>
    );
}
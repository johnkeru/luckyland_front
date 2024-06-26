import { Box } from '@mui/material';
import React from 'react';
import { SlCloudUpload } from 'react-icons/sl';
import UploadingLoading from '../../../utility_components/UploadingLoading';
import { resizeInventoryPic } from '../../../utility_functions/cloudinaryUrl';

const Image_Preview_Modal = ({
    getRootProps,
    getInputProps,
    isDragActive,
    image,
    uploading,
    inInlineEdit
}) => {

    return (
        <>
            {/* show preview when no image */}
            {!image ? <Box
                {...getRootProps()}
                sx={{
                    display: 'flex',
                    flexDirection: 'column',
                    justifyContent: 'center',
                    alignItems: 'center',
                    textAlign: 'center',
                    width: '100%',
                    height: inInlineEdit ? '300px' : '100%',
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
                    {uploading ? <UploadingLoading /> : undefined}
                </Box>
            </Box>
                :
                // show the image
                <Box sx={inInlineEdit ? { width: '500px' } : { overflowY: 'scroll', height: '380px' }}>
                    <Box position='relative'>
                        {uploading && <UploadingLoading />}
                        <img
                            loading="lazy"
                            srcSet={resizeInventoryPic(image, 400, 350)}
                            style={{
                                objectFit: 'cover',
                                objectPosition: 'center',
                                width: '100%',
                                height: '100%',
                            }}
                        />
                    </Box>
                </Box>
            }
        </>
    );
}

export default Image_Preview_Modal;




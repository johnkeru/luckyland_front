import { Box, Typography } from '@mui/material';
import React, { useCallback, useState } from 'react';
import { useDropzone } from 'react-dropzone';
import UploadingLoading from '../../../utility_components/UploadingLoading';
import axios from 'axios';
import { IoMdClose } from "react-icons/io";
import { FaRegImages } from "react-icons/fa";

const UploadImages = ({ setImages, images, setImageErrorMsg, imageErrorMsg, isCottage, setIsImageDirty }) => {
    const [loading, setLoading] = useState(false);
    const [isHoverImage, setIsHoverImage] = useState();

    const onDrop = useCallback(async (acceptedFiles) => {
        setIsImageDirty(true);
        if (acceptedFiles.length + images.length > 4) {
            setImageErrorMsg("Too many files uploaded. Maximum allowed is 4.");
            return;
        }
        setImageErrorMsg('');

        const remainingSpace = 4 - images.length;
        const filesToUpload = acceptedFiles.slice(0, remainingSpace);

        setLoading(true);
        const formDataArray = filesToUpload.map(file => {
            const formData = new FormData();
            formData.append('file', file);
            formData.append('upload_preset', 'ftgzoex2');
            return formData;
        });

        try {
            const uploadResponses = await Promise.all(formDataArray.map(formData =>
                axios.post('https://api.cloudinary.com/v1_1/kerutman/image/upload', formData)
            ));
            setImages(prev => [...prev, ...uploadResponses.map(up => ({ url: up.data.secure_url }))]);
        } catch (imageErrorMsg) {
            setImageErrorMsg('Error uploading images:', imageErrorMsg);
            // Handle imageErrorMsg
        } finally {
            setImageErrorMsg();
            setLoading(false);
        }
    }, [images]); // Added images as a dependency

    const { getRootProps, getInputProps, } = useDropzone({ onDrop });

    return (
        <Box mb={2}>
            <Box display='flex' alignItems='center' gap={2} mb={1}>
                <Typography variant='h6'>{!isCottage ? 'Room' : 'Cottage'} Images</Typography>
                <Typography fontSize='13px' color='red'>{imageErrorMsg}</Typography>
            </Box>

            <Box display='flex' >
                <Box display='flex' justifyContent='space-between' gap={2}>
                    {
                        images.map((img, i) => (
                            <Box key={img?.url} position='relative' onMouseEnter={() => setIsHoverImage(img?.url)} onMouseLeave={() => setIsHoverImage()}>
                                <img
                                    style={{
                                        width: '100px',
                                        height: '80px',
                                    }}
                                    src={img?.url}
                                    alt=""
                                />
                                {isHoverImage === img?.url ? <Box
                                    position='absolute'
                                    top={0}
                                    right={0}
                                    width='100%'
                                    height='100%'
                                    display='flex'
                                    justifyContent='end'
                                    zIndex={1} // Ensure the close icon appears above the image
                                    p={1} // Add padding to the close icon for better visibility
                                    sx={{
                                        background: "linear-gradient(28deg, rgba(9,8,15,0) 0%, rgba(62,62,158,0) 68%, rgba(10,10,10,0.5579481792717087) 95%)"
                                    }}
                                >
                                    <IoMdClose onClick={() => {
                                        setIsImageDirty(true);
                                        setImages(prev => prev.filter(image => image !== img))
                                    }}
                                        style={{ color: 'white', cursor: 'pointer', fontSize: '1.5rem' }}
                                    />
                                </Box> : undefined}
                            </Box>
                        ))
                    }
                </Box>
                <Box
                    {...getRootProps()}
                    sx={{
                        ml: images.length !== 0 ? 2 : 0,
                        display: images.length === 4 ? 'none' : 'flex',
                        flexDirection: 'column',
                        justifyContent: 'center',
                        alignItems: 'center',
                        textAlign: 'center',
                        width: '100px',
                        height: '80px',
                        border: '3px dashed #3b82f6',
                        color: '#3b82f6',
                        position: 'relative',
                        cursor: !loading ? 'pointer' : 'default',
                    }}
                >
                    <input {...getInputProps()} />
                    <Box sx={{ display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center', width: '100%', height: '100%' }}>
                        <FaRegImages size={20} />
                        {loading && <UploadingLoading />}
                    </Box>
                </Box>
            </Box>
        </Box>
    );
}

export default UploadImages;

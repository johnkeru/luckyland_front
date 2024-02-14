import { Box, Button, DialogContent } from "@mui/material";
import React, { useCallback, useEffect, useState } from "react";
import { useDropzone } from "react-dropzone";
import { CiImageOff } from "react-icons/ci";
import { MdSave, MdUpload } from "react-icons/md";
import cloudinaryUrl from "../../utility_functions/cloudinaryUrl";
import ButtonWithLoading from "../ButtonWithLoading";
import CommonFooter from "./CommonFooter";
import Modal from "./Modal";
import ImageBodyModal from "./inventory_modals/ImageBodyModal";

const UploadImageModal = ({ onClick, onCancel, button, name, setEditData, setImage, image }) => {
    const [open, setOpen] = useState(false);
    const [previewUrl, setPreviewUrl] = useState(image);
    const [uploading, setUploading] = useState(false);

    useEffect(() => {
        setPreviewUrl(image)
    }, [image])

    const handleOpen = () => {
        setOpen(true);
        onClick ? onClick() : undefined;
    };

    const onDrop = useCallback(async (acceptedFiles) => {
        const image = acceptedFiles[0];
        setUploading(true);
        const url = await cloudinaryUrl(image);
        const secure_url = url.secure_url;
        setPreviewUrl(secure_url);
        setUploading(false);
    }, []);

    const { getRootProps, getInputProps, isDragActive } = useDropzone({ onDrop });

    const handleUpload = () => {
        setEditData(prev => ({ ...prev, image: previewUrl })); //
        setImage(previewUrl)
        handleClose();
    };

    const handleClose = () => {
        if (!previewUrl) {
            setPreviewUrl(image)
            setImage(image);
        }
        setOpen(false);
    }

    const handleCancel = () => {
        onCancel ? onCancel() : undefined;
        handleClose();
    };

    const handleClearImage = () => {
        setPreviewUrl('');
    }

    return (
        <>
            <Modal
                size='lg'
                button={button}
                handleClose={handleClose}
                handleOpen={handleOpen}
                open={open}
                loading={uploading}
                title={name ? name + ' Image' : 'Upload Image'}
                children={
                    <>
                        <DialogContent>
                            <ImageBodyModal
                                onDrop={onDrop}
                                image={previewUrl}
                                getRootProps={getRootProps}
                                getInputProps={getInputProps}
                                isDragActive={isDragActive}
                                uploading={uploading}
                                isEdit
                            />
                        </DialogContent>

                        <CommonFooter>
                            {previewUrl && <>
                                {image && <Button size="sm" color="error" variant="outlined" onClick={handleClearImage} disabled={uploading}>
                                    <Box sx={{ fontSize: '1rem', mr: 1 }}><CiImageOff /></Box>
                                    Clear
                                </Button>}

                                <Button size="sm" color="info" variant="outlined"  {...getRootProps()} disabled={uploading}>
                                    <Box sx={{ fontSize: '1rem', mr: 1 }}><MdUpload /></Box>
                                    <input {...getInputProps()} />
                                    Upload
                                </Button>
                            </>}

                            {previewUrl !== image ? <ButtonWithLoading
                                size="sm"
                                color="success"
                                variant="outlined"
                                onClick={handleUpload}
                            >
                                <Box sx={{ fontSize: '1rem', mr: 1 }}>
                                    <MdSave />
                                </Box>
                                Save
                            </ButtonWithLoading> : undefined}

                        </CommonFooter>
                    </>
                }
            />
        </>
    );
};

export default UploadImageModal;


// setSelectedImage(image);
// const reader = new FileReader();
// reader.onloadend = () => {
//     const blob = new Blob([reader.result], { type: image.type });
//     const objectUrl = URL.createObjectURL(blob);
//     setPreviewUrl(objectUrl);
// };
// reader.readAsArrayBuffer(image);
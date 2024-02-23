import { DialogContent } from "@mui/material";
import React, { useCallback, useEffect, useState } from "react";
import { useDropzone } from "react-dropzone";
import { CiImageOff } from "react-icons/ci";
import { MdSave, MdUpload } from "react-icons/md";
import ButtonIconText from '../../utility_components/ButtonIconText';
import cloudinaryUrl from "../../utility_functions/cloudinaryUrl";
import CommonFooter from "./CommonFooter";
import Modal from "./Modal";
import Image_Preview_Modal from "./inventory_modals/Image_Preview_Modal";

const InlineUploadImageModal = ({ onClick, onCancel, button, name, setEditData, setImage, image, inInlineEdit }) => {
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
        setEditData(prev => ({ ...prev, image: previewUrl }));
        setImage(previewUrl);
        handleClose();
    };

    const handleClose = () => {
        setOpen(false);
    }

    const handleCloseX = () => {
        onCancel ? onCancel() : undefined;
        image && setPreviewUrl(image);
        setOpen(false);
    }

    const handleClearImage = () => {
        setPreviewUrl('');
    }

    return (
        <>
            <Modal
                button={button}
                handleClose={handleCloseX}
                handleOpen={handleOpen}
                open={open}
                loading={uploading}
                maxWidth="lg"
                title={name ? name + ' Image' : 'Upload Image'}
                children={
                    <>
                        <DialogContent dividers>
                            <Image_Preview_Modal
                                inInlineEdit={inInlineEdit}
                                onDrop={onDrop}
                                image={previewUrl}
                                getRootProps={getRootProps}
                                getInputProps={getInputProps}
                                isDragActive={isDragActive}
                                uploading={uploading}
                            />
                        </DialogContent>

                        <CommonFooter>
                            {previewUrl && <>
                                {image && <ButtonIconText
                                    text="Clear"
                                    size="medium"
                                    color="error"
                                    onClick={handleClearImage}
                                    disabled={uploading}
                                    Icon={<CiImageOff />}
                                />}
                                <ButtonIconText
                                    text="New"
                                    size="medium"
                                    getRootProps={getRootProps}
                                    getInputProps={getInputProps}
                                    disabled={uploading}
                                    Icon={<MdUpload />}
                                />
                            </>}

                            {previewUrl !== image ?
                                <ButtonIconText
                                    text="Save"
                                    loadingText='Saving...'
                                    color="success"
                                    size="medium"
                                    onClick={handleUpload}
                                    loading={uploading}
                                    disabled={uploading}
                                    Icon={<MdSave />}
                                /> : undefined}

                        </CommonFooter>
                    </>
                }
            />
        </>
    );
};

export default InlineUploadImageModal;


// setSelectedImage(image);
// const reader = new FileReader();
// reader.onloadend = () => {
//     const blob = new Blob([reader.result], { type: image.type });
//     const objectUrl = URL.createObjectURL(blob);
//     setPreviewUrl(objectUrl);
// };
// reader.readAsArrayBuffer(image);
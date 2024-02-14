import {
    Button,
    DialogContent,
    DialogActions
} from "@mui/material";
import React, { forwardRef, useCallback, useState } from "react";
import { useDropzone } from "react-dropzone";
import { CiImageOff } from "react-icons/ci";
import { MdSave, MdUpload } from "react-icons/md";
import useUser from "../../../hooks/useUser";
import axiosCall from "../../../utility_functions/axiosCall";
import cloudinaryUrl, { resizeProfilePicture } from '../../../utility_functions/cloudinaryUrl';
import Modal from "../Modal";
import ImageBodyModal from "../inventory_modals/ImageBodyModal";

const Upload_Profile_Modal = forwardRef(({ button }, ref) => {
    const { user, setUser } = useUser();

    const [open, setOpen] = useState(false);
    const [previewUrl, setPreviewUrl] = useState(user.image);
    const [uploading, setUploading] = useState(false);

    const handleOpen = () => {
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
    }

    const onDrop = useCallback(async (acceptedFiles) => {
        const image = acceptedFiles[0];
        setUploading(true);
        const url = await cloudinaryUrl(image);
        const secure_url = url.secure_url;
        setPreviewUrl(resizeProfilePicture(secure_url));
        setUploading(false);
    }, []);

    const { getRootProps, getInputProps, isDragActive } = useDropzone({ onDrop });

    const handleUpload = () => {
        axiosCall({
            endpoint: 'api/employees/updateImage',
            method: 'patch',
            body: { image: previewUrl },
            handleClose,
            setLoading: setUploading,
            onSuccess: setUser,
            hasToaster: true
        })
    };


    const handleCancel = () => {
        handleClose();
    };

    const handleClearImage = () => {
        setPreviewUrl('');
    }

    return (
        <Modal
            button={button}
            handleClose={handleCancel}
            handleOpen={handleOpen}
            open={open}
            title="Upload Image"
            loading={uploading}
            children={
                <>
                    <DialogContent dividers sx={{ width: '500px' }}>
                        <ImageBodyModal
                            onDrop={onDrop}
                            image={previewUrl}
                            getRootProps={getRootProps}
                            getInputProps={getInputProps}
                            isDragActive={isDragActive}
                            uploading={uploading}
                        />
                    </DialogContent>

                    <DialogActions>
                        {previewUrl && <>
                            {user.image && <Button size="medium" color="error" variant="contained" onClick={handleClearImage} disabled={uploading}>
                                <CiImageOff className="w-5 h-5" />
                                Clear
                            </Button>}


                            <Button size="medium" color="info" variant="contained"  {...getRootProps()} disabled={uploading}>
                                <MdUpload className="w-5 h-5" />
                                <input {...getInputProps()} />
                                Upload
                            </Button>
                        </>}

                        {previewUrl !== user.image ? <Button size="medium" color="success" variant="contained" onClick={handleUpload} disabled={uploading}>
                            <MdSave className="w-5 h-5" />
                            Save
                        </Button> : undefined}
                    </DialogActions></>
            }

        />
    );
});

export default Upload_Profile_Modal;


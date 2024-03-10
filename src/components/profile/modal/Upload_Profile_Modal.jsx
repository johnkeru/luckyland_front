import {
    DialogContent
} from "@mui/material";
import React, { forwardRef, useCallback, useState } from "react";
import { useDropzone } from "react-dropzone";
import { CiImageOff } from "react-icons/ci";
import { MdSave, MdUpload } from "react-icons/md";

import useUser from "../../../hooks/useUser";
import axiosCall from "../../../utility_functions/axiosCall";
import cloudinaryUrl, { resizeProfilePicture } from '../../../utility_functions/cloudinaryUrl';
import ButtonIconText from "../../../utility_components/ButtonIconText";
import CommonFooter from "../../../utility_components/modal/CommonFooter";
import Modal from "../../../utility_components/modal/Modal";
import Image_Preview_Modal from "../../inventory/modal/Image_Preview_Modal";

const Upload_Profile_Modal = forwardRef(({ button }, ref) => {
    const { user, setUser } = useUser();

    const [open, setOpen] = useState(false);
    const [previewUrl, setPreviewUrl] = useState(user.image);
    const [uploading, setUploading] = useState(false);

    const handleOpen = () => {
        setOpen(true);
    };

    const handleClose = () => {
        user.image && setPreviewUrl(user.image);
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
            setDataDirectly: setUser,
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
            title="Edit Image"
            loading={uploading}
            children={
                <>
                    <DialogContent dividers>
                        <Image_Preview_Modal
                            inInlineEdit
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
                            {user.image && <ButtonIconText
                                text="Clear"
                                size="medium"
                                color="error"
                                onClick={handleClearImage}
                                disabled={uploading}
                                Icon={<CiImageOff />}
                            />
                            }
                            <ButtonIconText
                                text="New"
                                size="medium"
                                getRootProps={getRootProps}
                                getInputProps={getInputProps}
                                onClick={handleClearImage}
                                disabled={uploading}
                                Icon={<MdUpload />}
                            />
                        </>}

                        {previewUrl !== user.image ?
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
    );
});

export default Upload_Profile_Modal;


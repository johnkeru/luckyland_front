import {
    Button,
    Dialog,
    DialogBody,
    DialogFooter,
    DialogHeader
} from "@material-tailwind/react";
import React, { cloneElement, useCallback, useEffect, useState } from "react";
import { useDropzone } from "react-dropzone";
import { IoClose } from "react-icons/io5";
import { MdSave, MdUpload } from "react-icons/md";
import cloudinaryUrl from "../../utility_functions/cloudinaryUrl";
import ImageBodyModal from "./inventory_modals/ImageBodyModal";
import { CiImageOff } from "react-icons/ci";

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
            {cloneElement(button, { onClick: handleOpen })}

            <Dialog open={open} handler={handleOpen} className="px-3 py-2" >
                <DialogHeader className="text-gray-700 flex justify-between items-center">
                    {name || 'Upload'} Image
                    <IoClose className=" w-7 h-7 text-red-500 cursor-pointer" title="close" onClick={handleCancel} />
                </DialogHeader>

                <DialogBody className="-mt-5">
                    <ImageBodyModal
                        onDrop={onDrop}
                        image={previewUrl}
                        getRootProps={getRootProps}
                        getInputProps={getInputProps}
                        isDragActive={isDragActive}
                        uploading={uploading}
                    />
                </DialogBody>

                <DialogFooter className="justify-end -mt-5 gap-2">
                    {previewUrl && <>
                        {image && <Button size="sm" color="red" variant="outlined" className="p-2 px-3 flex items-center gap-2" onClick={handleClearImage} disabled={uploading}>
                            <CiImageOff className="w-5 h-5" />
                            Clear
                        </Button>}

                        <Button size="sm" color="blue" variant="outlined"  {...getRootProps()} className="p-2 px-3 flex items-center gap-2" disabled={uploading}>
                            <MdUpload className="w-5 h-5" />
                            <input {...getInputProps()} />
                            Upload
                        </Button>
                    </>}

                    {previewUrl !== image ? <Button size="sm" color="green" variant="outlined" onClick={handleUpload} className="p-2 px-3 flex items-center gap-2" loading={uploading}>
                        <MdSave className="w-5 h-5" />
                        Save
                    </Button> : undefined}
                </DialogFooter>
            </Dialog>
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
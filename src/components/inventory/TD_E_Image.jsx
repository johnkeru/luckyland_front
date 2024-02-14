import React, { useState } from 'react'
import { CiEdit } from 'react-icons/ci';
import UploadImageModal from '../../utility_components/modal/UploadImageModal';
import { NO_IMAGE, resizeInventoryPic } from '../../utility_functions/cloudinaryUrl';
import { Button } from '@mui/material';

const TD_E_Image = ({ data, setEditData, objKey, labelToExclude, handleEditingState, tdCancelEdit, image, setImage, isAllow }) => {
    const [hoverLabel, setHoverLabel] = useState('');

    return (
        <td className={`relative border-2  ${isAllow && !labelToExclude.includes(objKey) ? 'hover:bg-blue-gray-100' : ''}`} // Add this class for positioning
            onMouseEnter={() => (isAllow && !labelToExclude.includes(objKey) ? setHoverLabel(objKey) : undefined)}
            onMouseLeave={() => (isAllow && !labelToExclude.includes(objKey) ? setHoverLabel('') : undefined)}>

            <img src={image ? resizeInventoryPic(image, 50, 35, 'c_thumb') : resizeInventoryPic(NO_IMAGE, 50, 35, 'c_thumb')} className='m-auto' />

            <UploadImageModal
                setEditData={setEditData}
                name={data.productName}
                setImage={setImage}
                image={image}
                onClick={() => {
                    handleEditingState(objKey);
                    setHoverLabel('');
                }}
                onCancel={() => tdCancelEdit(objKey)}
                button={
                    <Button
                        title='edit image'
                        color='info'
                        sx={{
                            position: 'absolute',
                            right: 0,
                            top: 0,
                            m: 'auto',
                            width: '100%',
                            height: '100%',
                            p: 0,
                            fontSize: '1.25rem',
                            display: hoverLabel === objKey && !labelToExclude.includes(objKey) ? 'flex' : 'none',
                            justifyContent: 'end',
                            alignItems: 'start'
                        }}
                    >
                        <CiEdit />
                    </Button>
                }
            />
        </td>
    )
}

export default TD_E_Image
import { TableCell } from '@mui/material';
import { grey } from '@mui/material/colors';
import React, { useState } from 'react';
import { CiEdit } from 'react-icons/ci';
import ButtonIcon from '../../utility_components/ButtonIcon';
import UploadImageModal from '../../utility_components/modal/UploadImageModal';
import { NO_IMAGE, resizeInventoryPic } from '../../utility_functions/cloudinaryUrl';

const TD_E_Image = ({ data, setEditData, objKey, labelToExclude, handleEditingState, tdCancelEdit, image, setImage, isAllow }) => {
    const [hoverLabel, setHoverLabel] = useState('');

    return (
        <TableCell
            sx={{
                position: 'relative',
                '&:hover': {
                    backgroundColor: isAllow && !labelToExclude.includes(objKey) ? grey['300'] : 'transparent',
                },
            }}

            onMouseEnter={() => (isAllow && !labelToExclude.includes(objKey) ? setHoverLabel(objKey) : undefined)}
            onMouseLeave={() => (isAllow && !labelToExclude.includes(objKey) ? setHoverLabel('') : undefined)}
        >

            <img src={image ? resizeInventoryPic(image, 50, 35, 'c_thumb') : resizeInventoryPic(NO_IMAGE, 50, 35, 'c_thumb')} style={{ margin: 'auto' }} />

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
                    <ButtonIcon
                        title='edit image'
                        sx={{ position: 'absolute', top: 0, right: 0, display: hoverLabel === objKey && !labelToExclude.includes(objKey) ? 'flex' : 'none' }}
                        onClick={() => {
                            handleEditingState(objKey)
                            setHoverLabel('');
                        }}>
                        <CiEdit />
                    </ButtonIcon>
                }
            />
        </TableCell>
    )
}

export default TD_E_Image


import React, { useState } from 'react'
import { CiEdit } from 'react-icons/ci';
import UploadImageModal from '../../utility_components/modal/UploadImageModal';
import { resizeCloudinaryImage } from '../../utility_functions/cloudinaryUrl';

const TD_E_Image = ({ data, setEditData, objKey, labelToExclude, handleEditingState, tdCancelEdit, image, setImage, isAllow }) => {
    const defaultImage = "https://res.cloudinary.com/kerutman/image/upload/v1686224017/no_image.jpg";
    const [hoverLabel, setHoverLabel] = useState('');

    return (
        <td className={`relative border-2  ${isAllow && !labelToExclude.includes(objKey) ? 'hover:bg-blue-gray-100' : ''}`} // Add this class for positioning
            onMouseEnter={() => (isAllow && !labelToExclude.includes(objKey) ? setHoverLabel(objKey) : undefined)}
            onMouseLeave={() => (isAllow && !labelToExclude.includes(objKey) ? setHoverLabel('') : undefined)}>

            <img src={image ? resizeCloudinaryImage(image, 50, 35) : resizeCloudinaryImage(defaultImage, 50, 35)} width='40px' className='m-auto' />

            <UploadImageModal
                setEditData={setEditData}
                name={data.productName}
                setImage={setImage}
                image={image}
                onClick={() => {
                    handleEditingState(objKey)
                    setHoverLabel('');
                }}
                onCancel={() => tdCancelEdit(objKey)}
                button={
                    <button className={`absolute right-0 top-0.5 cursor-pointer ${hoverLabel === objKey && !labelToExclude.includes(objKey) ?
                        'block' : 'hidden'
                        }`}
                        title='edit image'
                    >
                        <CiEdit className='w-5 h-5' />
                    </button>}
            />
        </td>
    )
}

export default TD_E_Image
import React, { useState } from 'react';
import { IoMdCheckmark } from 'react-icons/io';
import { LuArchiveRestore } from "react-icons/lu";
import { MdModeEdit, MdOutlineClear, MdOutlineRemoveRedEye } from 'react-icons/md';
import ButtonIcon from '../../utility_components/ButtonIcon';
import Hide_Restore_Inventory_Modal from '../../utility_components/modal/inventory_modals/Hide_Restore_Inventory_Modal';
import formatDateTime from '../../utility_functions/formatTime';
import TD_E_Image from './TD_E_Image';
import TD_SE_Quantity from './TD_SE_Quantity';
// import TD_Searchable from './TD_Searchable';
import { FaArrowUp } from "react-icons/fa";
import { IoMdTrash } from "react-icons/io";
import useUser from '../../hooks/useUser';
import Borrow_Inventory_Modal from '../../utility_components/modal/inventory_modals/Borrow_Inventory_Modal';
import Edit_Inventory_Modal from '../../utility_components/modal/inventory_modals/Edit_Inventory_Modal';
import View_Inventory_Modal from '../../utility_components/modal/inventory_modals/View_Inventory_Modal';
import { isAdmin, isInventory } from '../../utility_functions/roles';
import TD_SE from './TD_SE';
import TD_S_Status from './TD_S_Status';

const TR_Inventory = ({ data, configMethods }) => {
    const { user } = useUser();

    const [editData, setEditData] = useState({});
    const [selectedIdToEdit, setSelectedIdToEdit] = useState(-1);
    const [labelToExclude, setLabelToExclude] = useState([]);
    const [updating, setUpdating] = useState(false);

    const [image, setImage] = useState(data.image);

    const [rowActive, setRowActive] = useState('');

    const handleEditingState = (label) => {
        setSelectedIdToEdit(data.id);
        setLabelToExclude(prev => [...prev, label])
        setRowActive(label);
    }

    const handleCancelEdit = () => {
        setSelectedIdToEdit(-1);
        setEditData({})
        setLabelToExclude([])
        setRowActive('');
    }

    // for image cancel uploading image
    const tdCancelEdit = (label) => {
        labelToExclude.length === 1 ? setRowActive('') : undefined;
        setLabelToExclude(prev => prev.filter(excludedLabel => excludedLabel !== label));
    }

    const handleSubmitEdit = () => {
        configMethods.update(data.id, editData, setUpdating, handleCancelEdit);
    }

    const handleAllSubmitEdit = (allDataEdit, setError, setUpdating, handleClose) => {
        const handleCloseLocal = () => {
            handleClose(); // this will close the Edit Modal child.
            handleCancelEdit(); // this will close something within this component.
        }
        configMethods.update(data.id, allDataEdit, setUpdating, handleCloseLocal, setError);
    }

    return (
        // odd:bg-gray-200
        <tr className={`border-b-2 ${rowActive ? 'bg-blue-gray-100' : ' hover:bg-blue-gray-50'}`}>

            <td className='text-sm border-2 py-3 text-center'>{data.id}</td>
            {/* <TD_Searchable column={data.productCode} className={tdCommonClass} /> */}

            <TD_SE
                tdCancelEdit={tdCancelEdit}
                column={data.productName}
                objKey={'productName'}
                handleEditingState={handleEditingState}
                labelToExclude={labelToExclude}
                setEditData={setEditData}
                isAllow={isAdmin(user.roles) || isInventory(user.roles)}
            />

            <TD_SE
                tdCancelEdit={tdCancelEdit}
                column={data.category}
                objKey={'category'}
                handleEditingState={handleEditingState}
                labelToExclude={labelToExclude}
                setEditData={setEditData}
                isAllow={isAdmin(user.roles) || isInventory(user.roles)}
            />

            <TD_SE_Quantity
                tdCancelEdit={tdCancelEdit}
                data={data}
                objKey={'currentQuantity'}
                labelToExclude={labelToExclude}
                handleEditingState={handleEditingState}
                setEditData={setEditData}
                isAllow={isAdmin(user.roles) || isInventory(user.roles)}
            />

            <TD_S_Status
                column={data.status} statusColor={configMethods.statusColor} />

            <TD_E_Image
                image={image}
                setImage={setImage}
                data={data}
                objKey={'image'}
                handleEditingState={handleEditingState}
                tdCancelEdit={tdCancelEdit}
                labelToExclude={labelToExclude}
                setEditData={setEditData}
                isAllow={isAdmin(user.roles) || isInventory(user.roles)}
            />

            <td className={'text-sm border-2 pl-2'}>{formatDateTime(data.lastCheck)}</td>

            <td>
                <span className='flex gap-2 ml-2'>
                    {(selectedIdToEdit === data.id && labelToExclude.length !== 0) ? <>
                        <ButtonIcon title="update" color='success' onClick={handleSubmitEdit} disabled={updating} loading={updating} sx={{ fontSize: '1.5rem' }}>
                            <IoMdCheckmark />
                        </ButtonIcon>
                        <ButtonIcon title="cancel" color='error' onClick={handleCancelEdit} disabled={updating} sx={{ fontSize: '1.5rem' }}>
                            <MdOutlineClear />
                        </ButtonIcon>
                    </> : // FOR METHODS VIEW, EDIT, DELETE
                        !updating ? <>
                            <View_Inventory_Modal
                                button={<ButtonIcon title="view" sx={{ fontSize: '1.2rem', }}>
                                    <MdOutlineRemoveRedEye />
                                </ButtonIcon>}
                                data={data}
                            />

                            {
                                isAdmin(user.roles) || isInventory(user.roles) ? <>
                                    <Borrow_Inventory_Modal
                                        data={data}
                                        onClick={configMethods.borrow}
                                        button={<ButtonIcon color='warning' title='Borrow'>
                                            <FaArrowUp />
                                        </ButtonIcon>}
                                    />
                                    <Edit_Inventory_Modal
                                        handleAllSubmitEdit={handleAllSubmitEdit}
                                        image={image}
                                        setImage={setImage}
                                        updating={updating}
                                        inventoryData={data}
                                        button={<ButtonIcon color='info' title="edit">
                                            <MdModeEdit />
                                        </ButtonIcon>}
                                        data={data}
                                    />
                                    {!data.deleted_at ? <Hide_Restore_Inventory_Modal
                                        data={{ id: data.id, productName: data.productName }}
                                        onClick={configMethods.delete}
                                        button={<ButtonIcon color='error' title="delete">
                                            <IoMdTrash />
                                        </ButtonIcon>
                                        }
                                    /> : <Hide_Restore_Inventory_Modal
                                        restore
                                        data={{ id: data.id, productName: data.productName }}
                                        onClick={configMethods.delete}
                                        button={<ButtonIcon color='success' title="restore">
                                            <LuArchiveRestore />
                                        </ButtonIcon>
                                        }
                                    />}
                                </> : undefined
                            }

                        </> : undefined}
                </span>

            </td>

        </tr>
    )
}

export default TR_Inventory














// {
//     configBody.map(config => {
//         const isNotExcluded = !labelToExclude.includes(config.label);
//         const isSelected = labelToExclude.includes(config.label);

//         return (
//             <td
//                 className={`relative items-center border px-2 ${config.editable && isNotExcluded ? 'hover:bg-gray-200' : ''}`} // Add this class for positioning
//                 key={config.label}
//                 onMouseEnter={() => (isNotExcluded ? setHoverLabel(config.label) : undefined)}
//                 onMouseLeave={() => (isNotExcluded ? setHoverLabel('') : undefined)}
//             >
//                 {config.searchable ? (
//                     config.searchable(data, setEditData, isSelected)
//                 ) : config.renderElementTD ? (
//                     config.renderElementTD(data, setEditData, isSelected, () => setLabelToExclude(prev => prev.filter(label => label !== config.label)))
//                 ) : (
//                     config.renderTD(data)
//                 )}
//                 {config.editable && hoverLabel === config.label && isNotExcluded && (
//                     <CiEdit
//                         title={'Edit ' + hoverLabel}
//                         className={`absolute right-1 top-1 cursor-pointer`} // Adjusted right value
//                         onClick={() => handleEditingState(config.label)}
//                     />
//                 )}
//             </td>
//         );
//     })
// }
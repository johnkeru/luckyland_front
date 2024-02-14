import React from 'react';
import { FaInfo } from "react-icons/fa";
import { IoMdTrash } from 'react-icons/io';
import { LuArchiveRestore } from 'react-icons/lu';
import { MdModeEdit } from 'react-icons/md';
import { RxActivityLog } from "react-icons/rx";
import ButtonIcon from '../../utility_components/ButtonIcon';
import Add_Employee_Modal from '../../utility_components/modal/employee_modals/Add_Employee_Modal';
import Details_Employee_Modal from '../../utility_components/modal/employee_modals/Details_Employee_Modal';
import ViewLogs_Employee_Modal from '../../utility_components/modal/employee_modals/ViewLogs_Employee_Modal';
import Hide_Restore_Inventory_Modal from '../../utility_components/modal/inventory_modals/Hide_Restore_Inventory_Modal';
import EmpStatusChip from './EmpStatusChip';
import RoleChip from './RoleChip';
import TD_S_EmpName from './TD_S_EmpName';
import TD_S_Phone_JobTitle from './TD_S_Phone_JobTitle';

const TR_Employee = ({ emp, configMethods }) => {

    return (
        <tr className='border-b-2'>
            <td className='whitespace-nowrap text-md text-gray-700 border border-gray-300 text-center'>{emp.id}</td>
            <TD_S_EmpName emp={emp} />
            <TD_S_Phone_JobTitle column={`${emp.address.street}, ${emp.address.state}, ${emp.address.city}`} />
            <TD_S_Phone_JobTitle column={emp.phone} />
            <td><EmpStatusChip status={emp.status} /></td>
            <td className='border border-gray-300'>
                <span className="flex gap-2 items-center ml-2">
                    {emp.roles.map((role, index) => <RoleChip key={index} role={role.roleName} />)}
                </span>
            </td>
            <td className='text-md font-semibold border border-gray-300 p-2'>
                <span className='flex gap-2'>
                    <Details_Employee_Modal
                        button={<ButtonIcon title='info' color='info'>
                            <FaInfo />
                        </ButtonIcon>}
                        empDetails={emp}
                    />
                    <ViewLogs_Employee_Modal
                        button={<ButtonIcon title='activity logs' color='primary'>
                            <RxActivityLog />
                        </ButtonIcon>}
                        empDetails={emp}
                    />
                    <Add_Employee_Modal
                        isEmp
                        handleUpdate={configMethods.update}
                        button={<ButtonIcon title='edit' color='warning'>
                            <MdModeEdit />
                        </ButtonIcon>}
                        user={emp}
                    />
                    {!emp.deleted_at ? (
                        <Hide_Restore_Inventory_Modal
                            data={{ id: emp.id, productName: emp.firstName }}
                            onClick={configMethods.delete}
                            button={<ButtonIcon color='error' title="delete">
                                <IoMdTrash />
                            </ButtonIcon>}
                        />
                    ) : (
                        <Hide_Restore_Inventory_Modal
                            restore
                            data={{ id: emp.id, productName: emp.firstName }}
                            onClick={configMethods.delete}
                            button={<ButtonIcon color='success' title="restore">
                                <LuArchiveRestore />
                            </ButtonIcon>}
                        />
                    )}
                </span>

            </td>
        </tr>
    );
};

export default TR_Employee;
import { Button } from '@material-tailwind/react';
import React, { useEffect, useState } from 'react';
import { FaPlus } from 'react-icons/fa';
import useRole from '../../hooks/useRoles';
import useSearchStore from '../../hooks/useSearchStore';
import Add_Employee_Modal from '../../utility_components/modal/employee_modals/Add_Employee_Modal';
import axiosCall, { EMPLOYEE_ENDPOINT, axiosCreate } from '../../utility_functions/axiosCall';
import { roleColor } from '../../utility_functions/statusColor';
import { notifyError } from '../../utility_functions/toaster';
import { getQueryParameters } from '../../utility_functions/urlQueries';
import TH_S from '../inventory/TH_S';
import TH_StatusFilter from '../inventory/TH_StatusFilter';
import EmployeesTable from './EmployeesTable';

const Employees = () => {
    const { roles, setRoles } = useRole();

    const [response, setResponse] = useState(null);
    const [loading, setLoading] = useState(true);

    const [currentUrl, setCurrentUrl] = useState(EMPLOYEE_ENDPOINT);
    const [sendUrl, setSendUrl] = useState(currentUrl);

    useEffect(() => {
        axiosCall({
            endpoint: sendUrl,
            setResponse,
            setLoading: currentUrl === EMPLOYEE_ENDPOINT ? setLoading : () => { },
        });

    }, [sendUrl]);

    useEffect(() => {
        axiosCall({ endpoint: 'api/roles', setResponse: setRoles })
    }, [])

    const handleSearch = (query) => {
        setSendUrl(getQueryParameters(currentUrl, setCurrentUrl, query + 'page=1&role=&'));
    }
    const handleTab = (query) => {
        setSendUrl(getQueryParameters(currentUrl, setCurrentUrl, query + 'page=1&role=&'));
    }
    const handleToggle = (query) => {
        setSendUrl(getQueryParameters(currentUrl, setCurrentUrl, query + 'page=1&search=&'));
    }
    const handleSelectPage = (value) => {
        setSendUrl(getQueryParameters(currentUrl, setCurrentUrl, `page=${value}&`));
    }

    const handleAddInventory = () => {
        const addEmployee = (body, setLoading, handleClose, setError) => {
            axiosCall({
                method: 'post',
                endpoint: 'api/employees/addEmployee',
                body: body,
                hasToaster: true,
                handleClose,
                setError,
                setLoading,
                onSuccess: () => {
                    axiosCreate.get(sendUrl)
                        .then(res => setResponse(res.data))
                        .catch(_error => {
                            notifyError('Something went wrong. Please try again later.')
                        });
                }
            });
        }

        return <Add_Employee_Modal
            handleAdd={addEmployee}
            button={<Button className="flex items-center gap-3" size="sm">
                <FaPlus strokeWidth={2} className="h-4 w-4" /> Add Employee
            </Button>}
        />
    }

    const handleUpdateEmployee = (id, body, setLoading, handleClose, setError) => {
        axiosCall({
            endpoint: 'api/employees/updateEmployee/' + id,
            method: 'patch',
            body,
            hasToaster: true,
            setError,
            setLoading,
            handleClose,
            onSuccess: () => {
                axiosCreate.get(sendUrl)
                    .then(res => setResponse(res.data))
                    .catch(_error => {
                        notifyError('Something went wrong. Please try again later.')
                    });
            }
        });
    }

    const softDeleteOrRestoreEmployee = (id, setLoading, handleClose) => {
        axiosCall({
            method: 'delete',
            endpoint: 'api/employees/softDeleteOrRestoreEmployee/' + id,
            hasToaster: true,
            setLoading,
            onSuccess: () => {
                const isEmpty = response?.data?.data?.length === 0 || response?.data.data.length === 1; // checks if the inventories is empty after deletion
                const isSearch = sendUrl.includes('search');                        // checks if url includes search and replace to nothing
                let newUrl = isEmpty ? isSearch ? sendUrl.replace(/search=[^&]*/, 'search=') : sendUrl.replace(/page=[^&]*/, 'page=1') : sendUrl;
                axiosCreate.get(newUrl)
                    .then(res => {
                        setResponse(res.data);
                        handleClose();
                    })
                    .catch(_error => {
                        handleClose();
                        notifyError('Something went wrong. Please try again later.');
                    });
            }
        });
    };

    const configHead = [
        {
            label: 'ID',
        },
        {
            label: 'Employee Name',
            sortable: (label) => <TH_S
                label={label}
                query='firstName'
                handleToggle={handleToggle}
                hasData={response?.total_employees > 1}
            />,
        },
        {
            label: 'Address',
            sortable: (label) => <TH_S
                label={label}
                query='address'
                handleToggle={handleToggle}
                hasData={response?.total_employees > 1}
            />,
        },
        {
            label: 'Phone',
        },
        {
            label: 'Status',
        },
        {
            label: 'Role/s',
            sortable: (label) => <TH_StatusFilter
                options={
                    (roles && roles.length !== 0) ?
                        [...roles.filter(r => r.roleName !== 'Admin').map((role) => role.roleName), 'All'] :
                        []}
                statusColor={roleColor}
                label={label}
                query='role'
                handleToggle={handleToggle}
                hasData={response?.total_employees > 1}
            />,
        },
        { label: 'Actions', },
    ];
    const { searchEmployee, setSearchEmployee } = useSearchStore();

    const configMethods = {
        handleSearch,
        handleToggle,
        handleSelectPage,
        handleTab,
        add: handleAddInventory,
        update: handleUpdateEmployee,
        delete: softDeleteOrRestoreEmployee,
        search: searchEmployee,
        setSearch: setSearchEmployee
    }

    return (
        <EmployeesTable
            configHead={configHead}
            configMethods={configMethods}
            data={response}
            loading={loading}
            total={loading ? 0 : response.total_employees}
        />
    )
}

export default Employees
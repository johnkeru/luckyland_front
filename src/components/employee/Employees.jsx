import React, { useEffect, useState } from 'react';
import useRole from '../../hooks/useRoles';
import useSearchStore from '../../hooks/useSearchStore';
import useUser from '../../hooks/useUser';
import EnhancedTable from '../../utility_components/table/EnhancedTable';
import basicGetCall from '../../utility_functions/axiosCalls/basicGetCall';
import commonValidationCall from '../../utility_functions/axiosCalls/commonValidationCall';
import { EMPLOYEE_ENDPOINT, axiosCreate } from '../../utility_functions/axiosCalls/config';
import { isAdmin } from '../../utility_functions/roles';
import { notifyError } from '../../utility_functions/toaster';
import { getQueryParameters } from '../../utility_functions/urlQueries';
import EmployeeBody from './EmployeeBody';
import Employee_Role_Modal from './modal/Employee_Role_Modal';
import Add_Employee_Modal from './modal/Add_Employee_Modal';
import { Button } from '@mui/material';

const Employees = () => {
    const { roles, setRoles } = useRole();
    const { user } = useUser();

    const [response, setResponse] = useState(null);
    const [loading, setLoading] = useState(true);

    const [currentUrl, setCurrentUrl] = useState(EMPLOYEE_ENDPOINT);
    const [sendUrl, setSendUrl] = useState(currentUrl);

    useEffect(() => {
        basicGetCall({
            endpoint: sendUrl,
            setResponse,
            setLoading: currentUrl === EMPLOYEE_ENDPOINT ? setLoading : () => { },
        });

    }, [sendUrl]);

    useEffect(() => {
        basicGetCall({ endpoint: 'api/roles', setResponse: setRoles })
    }, []);

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

    const handleAddEmployee = () => {
        const addEmployee = (body, setLoading, handleClose, setError) => {
            commonValidationCall({
                method: 'post',
                endpoint: 'api/employees/add-employee',
                body,
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

        // const addRegularEmployee = (body, setLoading, handleClose, setError) => {
        //     commonValidationCall({
        //         method: 'post',
        //         endpoint: 'api/employees/add-regular-employee',
        //         body,
        //         hasToaster: true,
        //         handleClose,
        //         setError,
        //         setLoading,
        //         onSuccess: () => {
        //             axiosCreate.get(sendUrl)
        //                 .then(res => setResponse(res.data))
        //                 .catch(_error => {
        //                     notifyError('Something went wrong. Please try again later.')
        //                 });
        //         }
        //     });
        // }

        // return <Employee_Role_Modal addEmployee={addEmployee} addRegularEmployee={addRegularEmployee} />

        return <Add_Employee_Modal
            handleAdd={addEmployee}
            button={
                <Button variant='contained' color='info'>
                    Add Employee
                </Button>
            }
        />
    }

    const handleUpdateEmployee = (id, body, setLoading, handleClose, setError) => {
        commonValidationCall({
            endpoint: 'api/employees/update-employee/' + id,
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

    const configHead = [
        {
            label: 'ID',
        },
        {
            label: 'Employee Name',
            sortable: true,
            query: 'firstName'
        },
        {
            label: 'Address',
            sortable: true,
            query: 'address'
        },
        {
            label: 'Phone',
        },
        {
            label: 'Status',
        },
        {
            label: 'Role/s',
            options: (roles && roles.length !== 0) ?
                [...roles.filter(r => r.roleName !== 'Admin').map((role) => role.roleName)] :
                [],
            filter: true,
            query: 'role'
        },
        { label: 'Actions', },
    ];
    const { searchEmployee, setSearchEmployee } = useSearchStore();

    const configMethods = {
        handleSearch,
        handleToggle,
        handleSelectPage,
        handleTab,
        add: handleAddEmployee,
        update: handleUpdateEmployee,
        search: searchEmployee,
        setSearch: setSearchEmployee
    }

    return (
        <EnhancedTable
            noTrash
            configHead={configHead}
            data={response}
            loading={loading}
            configMethods={configMethods}
            total={loading ? 0 : response?.total}
            title='Employee'
            isAllow={isAdmin(user.roles)}
            childrenBody={
                <EmployeeBody
                    configMethods={configMethods}
                    data={response}
                    loading={loading}
                    isAllow={isAdmin(user.roles)}
                />
            }
        />
    )
}

export default Employees

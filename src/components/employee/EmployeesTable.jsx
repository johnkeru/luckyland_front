import React from 'react'
import SortableTable from '../../utility_components/table/SortableTable'
import useUser from '../../hooks/useUser'
import { isAdmin } from '../../utility_functions/roles'
import Body from './Body'
import { IoPeople } from "react-icons/io5";
import Head from '../../utility_components/table/Head'

const EmployeesTable = ({ total, data, loading, configMethods, configHead }) => {
    const { user } = useUser();
    return (
        <SortableTable
            isAllow={isAdmin(user.roles)} // checks if the user is allow to add.
            configMethods={configMethods}
            data={data}
            loading={loading}
            total={total}
            Icon={IoPeople}
            title='Employees'
            table={
                <table className="mt-4 w-full min-w-max table-auto text-left">
                    <Head configMethods={configMethods} configHead={configHead} />
                    <Body configMethods={configMethods} data={data} loading={loading} />
                </table>
            }
        />
    )
}

export default EmployeesTable
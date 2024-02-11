import React from 'react';
import TableLoading from '../../utility_components/table/TableLoading';
import TR_Employee from './TR_Employee';
import NoResultsFound from '../../utility_components/table/NoResultsFound';

const Body = ({ configMethods, data, loading }) => {

    const renderBody = () => data.data.data.map((employee) => {
        return <TR_Employee key={employee.id} emp={employee} configMethods={configMethods} />
    });

    return (
        <tbody>
            {loading ? <TableLoading /> : data.data.data.length !== 0 ? renderBody() : <NoResultsFound title='employees' />}
        </tbody>
    )
}

export default Body;
import React from 'react';
import TableLoading from '../../utility_components/table/TableLoading';
import TR_Inventory from './TR_Inventory';
import NoResultsFound from '../../utility_components/table/NoResultsFound';

const Body = ({ configMethods, data, loading }) => {

    const renderBody = () => data.data.data.map((inventory, _index) => {
        // const isLast = _index === data.data.data.length - 1;
        // const classes = isLast
        //     ? "p-2"
        //     : "p-2 border-b border-blue-gray-50";
        return <TR_Inventory key={inventory.id} data={inventory} configMethods={configMethods} />
    });

    return (
        <tbody>
            {loading ? <TableLoading /> : data.data.data.length !== 0 ? renderBody() : <NoResultsFound title='inventories' />}
        </tbody>
    )
}

export default Body
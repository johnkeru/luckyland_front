import React from 'react'
import { CiViewTable } from 'react-icons/ci'
import TableFooter from './TableFooter'
import TableNav from './TableNav'
import { Card } from '@material-tailwind/react'

const SortableTable = ({ total, table, loading, data, configMethods, isAllow, title = "Inventory", Icon = CiViewTable }) => {
    return (
        <Card className="h-full w-full">
            <TableNav Icon={Icon} title={title} configMethods={configMethods} total={total} isAllow={isAllow} />
            {table}
            <TableFooter loading={loading} data={data} configMethods={configMethods} />
        </Card>
    )
}

export default SortableTable
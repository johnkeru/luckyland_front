import { Typography } from '@material-tailwind/react';
import React, { Fragment } from 'react';

const Head = ({ configHead }) => {

    const renderHeader = () => {
        return <tr>
            {configHead.map((conf) => (
                conf.sortable ?
                    <Fragment key={conf.label}>{conf.sortable(conf.label)}</Fragment> :
                    <th
                        key={conf.label}
                        className="border-y border-blue-gray-100 bg-blue-gray-50/50 p-4 transition-colors hover:bg-blue-gray-50"
                    >
                        <Typography
                            variant="small"
                            color="blue-gray"
                            className="flex items-center justify-between gap-2 font-normal leading-none opacity-70"
                        >
                            {conf.label}
                        </Typography>
                    </th>
            ))}
        </tr>
    }

    return (
        <thead className='text-left'>
            {renderHeader()}
        </thead>
    )
}

export default Head







// import { Table } from 'flowbite-react';
// import React, { Fragment } from 'react';

// const THead = ({ configHead }) => {

//     const renderHeader = () => {
//         const renderTh = configHead.map(configHead => {
//             if (configHead.renderElementTH) return <Fragment key={configHead.label}>{configHead.renderElementTH(configHead.label)}</Fragment>
//             return <Table.HeadCell className='border-y-2' key={configHead.label}>{configHead.label}</Table.HeadCell>
//         });
//         return renderTh
//     }

//     return (
//         <Table.Head className='text-left'>
//             {renderHeader()}
//         </Table.Head>
//     )
// }

// export default THead
import { CardFooter, Typography } from '@material-tailwind/react'
import React from 'react'
import { TablePagination } from './TablePagination'

const TableFooter = ({ loading, data, configMethods }) => {
    return (
        < CardFooter className="flex items-center justify-between border-t border-blue-gray-50 p-4" >
            <Typography variant="small" color="blue-gray" className="font-normal">
                Showing <span className='font-bold'>{!loading ? data.data.from : 0}</span>-<span className='font-bold'>{!loading ? data.data.to : 0}</span> of <span className='font-bold'>{!loading ? data.data.total : 0}</span>
            </Typography>
            <div className="flex gap-2">
                <TablePagination configMethods={configMethods} data={data} loading={loading} />
            </div>
        </CardFooter>
    )
}

export default TableFooter



// import React from 'react'
// import Button from '../Button'

// const TableFooter = ({ loading, data, configMethods }) => {
//     // For better loading for pages.
//     const renderSelectPage = () => {
//         const loadingPreview = [
//             {
//                 active: false,
//                 label: 'Previous',
//                 url: null
//             },
//             {
//                 active: false,
//                 label: 1,
//                 url: null
//             },
//             {
//                 active: false,
//                 label: 2,
//                 url: null
//             },
//             {
//                 active: false,
//                 label: 3,
//                 url: null
//             },
//             {
//                 active: false,
//                 label: 4,
//                 url: null
//             }, {
//                 active: false,
//                 label: 'Next',
//                 url: null
//             },
//         ]

//         const render = loading ? loadingPreview : data.links

//         return (
//             <ul className='flex  items-center rounded-md'>
//                 <li>
//                     <Button secondary outline disabled={!render[0].url} onClick={() => configMethods.handleSelectPage(parseInt(render[0]?.url.slice(-1)))}>
//                         Previous
//                     </Button>
//                 </li>
//                 {
//                     render.slice(1, render.length - 1).map(link => (
//                         <li className={`${link.active ? 'font-bold' : ''}`} key={link.label}>
//                             <Button secondary outline disabled={!link.url} active={link.active} onClick={() => configMethods.handleSelectPage(parseInt(link.label))}>
//                                 {link.label}
//                             </Button>
//                         </li>
//                     ))
//                 }
//                 <li>
//                     <Button secondary outline disabled={!render[render.length - 1].url} onClick={() => configMethods.handleSelectPage(parseInt(render[render.length - 1]?.url.slice(-1)))}>
//                         Next
//                     </Button>
//                 </li>
//             </ul>
//         )
//     }

//     return (
//         <div className='flex justify-between items-center  m-3'>
//             <p>Showing <span className='font-bold'>{!loading ? data.from : 0}</span>-<span className='font-bold'>{!loading ? data.to : 0}</span> of <span className='font-bold'>{!loading ? data.total : 0}</span></p>
//             {renderSelectPage()}
//         </div>
//     )
// }

// export default TableFooter





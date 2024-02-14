import React from 'react'
import SortableTable from '../../utility_components/table/SortableTable'
import Body from './Body'
import useUser from '../../hooks/useUser'
import { isAdmin, isInventory } from '../../utility_functions/roles'
import Head from '../../utility_components/table/Head'
import { MdInventory } from 'react-icons/md'

const InventoriesTable = ({ total, data, loading, configMethods, configHead }) => {
  const { user } = useUser();
  return (
    <SortableTable
      isAllow={isAdmin(user.roles) || isInventory(user.roles)} // checks if the user is allow to add.
      configMethods={configMethods}
      data={data}
      loading={loading}
      Icon={MdInventory}
      total={total}
      table={
        <table className="mt-4 w-full min-w-max table-auto text-left relative">
          <Head configMethods={configMethods} configHead={configHead} />
          <Body configMethods={configMethods} data={data} loading={loading} />
          {
            loading && <tbody className='absolute top-0 left-0 w-full h-full flex items-center justify-center bg-white/50 text-gray-500 font-semibold border-2 cursor-default'>
              <tr><td>Loading ...</td></tr>
            </tbody>
          }
        </table>
      }
    />
  )
}

export default InventoriesTable
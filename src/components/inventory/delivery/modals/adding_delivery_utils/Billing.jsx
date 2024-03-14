import React from 'react'
import InputIcon from '../../../../../utility_components/InputIcon'
import { CiMoneyBill } from "react-icons/ci";

const Billing = ({ register, defaultValue }) => {
    return (
        <InputIcon
            defaultValue={defaultValue}
            Icon={CiMoneyBill}
            label='Bill (Optional)'
            type='number'
            name='bill'
            size='small'
            fullWidth={false}
            register={register}
            placeholder='Enter your bill'
        />
    )
}

export default Billing
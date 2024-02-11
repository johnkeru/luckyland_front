import React from 'react'
import SelectRoles from './SelectRoles'
import { FaUniversity } from "react-icons/fa";
import InputIcon from './InputIcon';

const Step2 = ({ register, selectedRoleIds, setSelectedRoleIds, step2Error, setStep2Error, user, isProfile }) => {
    return (
        <>
            {(!isProfile) && <SelectRoles selectedRoleIds={selectedRoleIds} setSelectedRoleIds={setSelectedRoleIds} step2Error={step2Error} setStep2Error={setStep2Error} />}
            {/* Job Title */}

            {/* University */}
            <InputIcon defaultValue={user?.graduated_at} Icon={FaUniversity} label='Graduated At (Optional)' name='graduated_at' register={register} placeholder='Enter school graduated at' />

            {/* Description */}
            <div className="mb-4">
                <label htmlFor="description" className="block text-gray-700">Description (Optional)</label>
                <textarea defaultValue={user?.description} id="description" {...register('description')} className="w-full px-4 py-2 border-2 border-[#b9b9b9] rounded-md focus:outline-none focus:border-gray-500" placeholder='Enter employee description.'></textarea>
            </div>
        </>
    )
}

export default Step2
import React from 'react'
import SelectRoles from './SelectRoles'
import { FaUniversity } from "react-icons/fa";
import InputIcon from '../../../../utility_components/InputIcon';
import TextArea from '../../../../utility_components/TextArea';

const Step2 = ({ register, selectedRoleIds, setSelectedRoleIds, step2Error, setStep2Error, user, isProfile, isRegular = false }) => {
    return (
        <>
            {(!isProfile && !isRegular) && <SelectRoles selectedRoleIds={selectedRoleIds} setSelectedRoleIds={setSelectedRoleIds} step2Error={step2Error} setStep2Error={setStep2Error} />}
            {/* Job Title */}

            {/* University */}
            <InputIcon sx={{ mb: 2 }} defaultValue={user?.graduated_at} Icon={FaUniversity} label='Graduated At (Optional)' name='graduated_at' register={register} placeholder='Enter school graduated at' />

            {/* Description */}
            <TextArea height='80px' defaultValue={user?.description} label='Description (Optional)' placeholder='Enter Description (Optional)' name='description' register={register} />
        </>
    )
}

export default Step2
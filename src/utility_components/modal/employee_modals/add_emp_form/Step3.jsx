import React from 'react'
import InputIcon from './InputIcon';
import { FaFacebookSquare } from "react-icons/fa";
import { FaInstagram } from "react-icons/fa6";
import { FaXTwitter } from "react-icons/fa6";

const Step3 = ({ register, user }) => {
    return (
        <>
            {/* Social Media Links */}
            <InputIcon defaultValue={user?.facebook} Icon={FaFacebookSquare} label='Facebook (Optional)' name='facebook' register={register} placeholder='Enter Facebook link or (Etami8, 100009257219664)' mb={4} />
            <InputIcon defaultValue={user?.instagram} Icon={FaInstagram} label='Instagram (Optional)' name='instagram' register={register} placeholder='Enter Instagram link or (Etami8, 100009257219664)' mb={4} />
            <InputIcon defaultValue={user?.twitter} Icon={FaXTwitter} label='Twitter (Optional)' name='twitter' register={register} placeholder='Enter Twitter link or (Etami8, 100009257219664)' mb={4} />
        </>
    )
}

export default Step3
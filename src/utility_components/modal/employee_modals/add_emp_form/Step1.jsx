import React from 'react';
import { FaUser } from 'react-icons/fa';
import { FaRegAddressBook } from 'react-icons/fa';
import { MdOutlineEmail } from 'react-icons/md';
import { FaPhoneAlt } from 'react-icons/fa';
import { RiLockPasswordFill } from 'react-icons/ri';
import InputIcon from './InputIcon';
import { Grid } from '@mui/material';

const Step1 = ({ register, errors, user }) => {

    return (
        <>
            {/* First Name */}
            <Grid display='flex' gap={2} mb={2}>
                <InputIcon defaultValue={user?.firstName} Icon={FaUser} label='First Name' name='firstName' register={register} errors={errors} placeholder='Enter First Name' />
                <InputIcon defaultValue={user?.middleName} label='Middle Name' name='middleName' register={register} errors={errors} placeholder='Enter Middle Name' />
                <InputIcon defaultValue={user?.lastName} label='Last Name' name='lastName' register={register} errors={errors} placeholder='Enter Last Name' />
            </Grid>
            {/* ADDRESS */}
            <Grid display='flex' gap={2} mb={2}>
                <InputIcon defaultValue={user?.address.street} Icon={FaRegAddressBook} label='Street' name='street' register={register} errors={errors} placeholder='Enter street' />
                <InputIcon defaultValue={user?.address.state} label='State' name='state' register={register} errors={errors} placeholder='Enter state' />
                <InputIcon defaultValue={user?.address.city} label='City' name='city' register={register} errors={errors} placeholder='Enter city' />
                <InputIcon defaultValue={user?.address.zip_code} label='Zip Code' name='zip_code' register={register} errors={errors} placeholder='Enter zip code' />
            </Grid>

            <InputIcon sx={{ mb: 2 }} defaultValue={user?.email} Icon={MdOutlineEmail} label='Email' name='email' register={register} errors={errors} placeholder='Enter Email' type='email' />
            <InputIcon sx={{ mb: 2 }} defaultValue={user?.phone} Icon={FaPhoneAlt} label='Phone' name='phone' register={register} errors={errors} placeholder='Enter Phone' />
            {!user ? <InputIcon isView defaultValue={user?.password} Icon={RiLockPasswordFill} label='Password' name='password' register={register} errors={errors} placeholder='Enter Password' type='password' /> : undefined}
        </>
    );
};

export default Step1;

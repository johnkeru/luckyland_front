import { Grid } from '@mui/material';
import React from 'react';
import { FaPhoneAlt, FaRegAddressBook, FaUser } from 'react-icons/fa';
import { MdOutlineEmail } from 'react-icons/md';
import InputIcon from '../../../../utility_components/InputIcon';
import InputIconPassword from '../../../../utility_components/InputIconPassword';

const Step1 = ({ register, errors, user, setValue, isRegular = false }) => {

    return (
        <>
            {/* First Name */}
            <Grid display='flex' gap={2} mb={2}>
                <InputIcon defaultValue={user?.firstName} Icon={FaUser} label='First Name' name='firstName' register={register} errors={errors} placeholder='Enter First Name' />
                <InputIcon defaultValue={user?.middleName} label='Middle Name(Optional)' name='middleName' register={register} errors={errors} placeholder='Enter Middle Name' />
                <InputIcon defaultValue={user?.lastName} label='Last Name' name='lastName' register={register} errors={errors} placeholder='Enter Last Name' />
            </Grid>
            {/* ADDRESS */}
            <Grid display='flex' gap={2} mb={2}>
                <InputIcon defaultValue={user?.province} Icon={FaRegAddressBook} label='Province' name='province' register={register} errors={errors} placeholder='Enter province' />
                <InputIcon defaultValue={user?.barangay} label='Barangay' name='barangay' register={register} errors={errors} placeholder='Enter barangay' />
                <InputIcon defaultValue={user?.city} label='City' name='city' register={register} errors={errors} placeholder='Enter city' />
                <InputIcon defaultValue={user?.address.zip_code} label='Zip Code(Optional)' name='zip_code' register={register} errors={errors} placeholder='Enter zip code' />
            </Grid>

            <InputIcon sx={{ mb: 2 }} defaultValue={user?.email} Icon={MdOutlineEmail} label='Email' name='email' register={register} errors={errors} placeholder='Enter Email' type='email' />
            <InputIcon sx={{ mb: 2 }} defaultValue={user?.phone} Icon={FaPhoneAlt} label='Phone' name='phone' register={register} errors={errors} placeholder='Enter Phone' />
            {!user && !isRegular ? <InputIconPassword
                setValue={setValue}
                defaultValue={user?.password}
                label='Password'
                name='password'
                register={register}
                errors={errors}
                placeholder='Enter Password'
            /> : undefined}
        </>
    );
};

export default Step1;
// 06oe5iwX
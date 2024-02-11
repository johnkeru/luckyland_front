import React from 'react';
import { FaUser } from 'react-icons/fa';
import { FaRegAddressBook } from 'react-icons/fa';
import { MdOutlineEmail } from 'react-icons/md';
import { FaPhoneAlt } from 'react-icons/fa';
import { RiLockPasswordFill } from 'react-icons/ri';
import InputIcon from './InputIcon';

const Step1 = ({ register, errors, user }) => {

    return (
        <>
            {/* First Name */}
            <div className='flex items-start justify-between w-full gap-5 mb-8'>
                <InputIcon defaultValue={user?.firstName} Icon={FaUser} label='First Name' name='firstName' register={register} errors={errors} placeholder='Enter First Name' />

                {/* Middle Name */}
                <div className='w-full'>
                    <label htmlFor='middleName' className='block text-gray-700'>
                        Middle Name (Optional)
                    </label>
                    <input
                        type='text'
                        id='middleName'
                        defaultValue={user?.middleName}
                        {...register('middleName')}
                        className='w-full px-4 py-2 border-2 border-[#b9b9b9] rounded-md focus:outline-none focus:border-gray-500'
                        placeholder='Enter middle name (optional)'
                    />
                </div>

                {/* Last Name */}
                <div className='w-full'>
                    <label htmlFor='lastName' className='block text-gray-700'>
                        Last Name
                    </label>
                    <input
                        type='text'
                        id='lastName'
                        defaultValue={user?.lastName}
                        {...register('lastName')}
                        className='w-full px-4 py-2 border-2 border-[#b9b9b9] rounded-md focus:outline-none focus:border-gray-500'
                        placeholder='Enter last name'
                    />
                    {errors.lastName && <p className='text-red-500 text-sm mt-1'>{errors.lastName?.message}</p>}
                </div>
            </div>

            {/* ADDRESS */}
            <div className='flex items-start justify-between w-full gap-5 mb-8'>
                {/* Street */}
                <InputIcon defaultValue={user?.address.street} Icon={FaRegAddressBook} label='Street' name='street' register={register} errors={errors} placeholder='Enter street' />

                {/* State */}
                <div className='w-full'>
                    <label htmlFor='state' className='block text-gray-700'>
                        State
                    </label>
                    <input
                        defaultValue={user?.address.state}
                        type='text'
                        id='state'
                        {...register('state')}
                        className='w-full px-4 py-2 border-2 border-[#b9b9b9] rounded-md focus:outline-none focus:border-gray-500'
                        placeholder='Enter state'
                    />
                    {errors.state && <p className='text-red-500 text-sm mt-1'>{errors.state?.message}</p>}
                </div>

                {/* City */}
                <div className='w-full'>
                    <label htmlFor='city' className='block text-gray-700'>
                        City
                    </label>
                    <input
                        defaultValue={user?.address.city}
                        type='text'
                        id='city'
                        {...register('city')}
                        className='w-full px-4 py-2 border-2 border-[#b9b9b9] rounded-md focus:outline-none focus:border-gray-500'
                        placeholder='Enter city'
                    />
                    {errors.city && <p className='text-red-500 text-sm mt-1'>{errors.city?.message}</p>}
                </div>

                {/* ZIP CODE */}
                <div className='w-full'>
                    <label htmlFor='zip_code' className='block text-gray-700'>
                        Zip Code (Optional)
                    </label>
                    <input
                        defaultValue={user?.address.zip_code}
                        type='text'
                        id='zip_code'
                        {...register('zip_code')}
                        className='w-full px-4 py-2 border-2 border-[#b9b9b9] rounded-md focus:outline-none focus:border-gray-500'
                        placeholder='Enter ZIP code (optional)'
                    />
                </div>

            </div>

            <div className='flex items-start justify-between w-full mt-4 gap-5'>
                <InputIcon defaultValue={user?.email} Icon={MdOutlineEmail} label='Email' name='email' register={register} errors={errors} placeholder='Enter Email' type='email' />
                <InputIcon defaultValue={user?.phone} Icon={FaPhoneAlt} label='Phone' name='phone' register={register} errors={errors} placeholder='Enter Phone' />
                {!user ? <InputIcon isView defaultValue={user?.password} Icon={RiLockPasswordFill} label='Password' name='password' register={register} errors={errors} placeholder='Enter Password' type='password' /> : undefined}
            </div>
        </>
    );
};

export default Step1;

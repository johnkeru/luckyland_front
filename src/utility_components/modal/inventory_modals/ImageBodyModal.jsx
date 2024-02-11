import classNames from 'classnames';
import React from 'react';
import { SlCloudUpload } from 'react-icons/sl';
import { twMerge } from 'tailwind-merge';
import { VscLoading } from "react-icons/vsc";

const ImageBodyModal = ({
    getRootProps,
    getInputProps,
    isDragActive,
    image,
    isEdit,
    uploading
}) => {

    const divClassName = twMerge(classNames(
        `flex-col 
        w-full 
        justify-center 
        items-center 
        text-center
        h-[250px]
        border-4
        hover:text-blue-200 
        text-blue-300 
        hover:border-blue-200 
        border-dashed 
        hover:bg-gray-50 
        border-blue-300
        flex
        relative
        `,
        {
            'hidden': image,
            'h-[350px]': isEdit
        }
    ))

    const imageClassName = twMerge(classNames(
        `object-cover 
        object-center 
        w-full 
        h-[400px]
        bg-gray-200 
        border-2`,
        {
            'h-[350px]': isEdit
        }
    ))

    return (<>
        <div
            {...getRootProps()}
            className={divClassName}
        >
            {uploading ? <Uploading /> :
                <>
                    <input {...getInputProps()} />
                    <div className="w-full h-full flex flex-col justify-center items-center">
                        <SlCloudUpload className="w-20 h-20" />
                        {isDragActive ? (
                            <p>Drop the image here ...</p>
                        ) : (
                            <p>Drag 'n' drop a image here, or click to select a image</p>
                        )}
                    </div>
                </>
            }
        </div>
        {image && <div className='relative'>
            {uploading ? <Uploading /> : undefined}
            <img
                alt="nature"
                loading="lazy"
                className={imageClassName}
                srcSet={image}
            />
        </div>}
    </>
    )
}

export default ImageBodyModal

const Uploading = () => {
    return <div className='absolute top-0 left-0 w-full z-10 h-full flex items-center justify-center bg-gray-300/70'>
        <VscLoading className="animate-spin h-7 w-7 mr-3 " />
    </div>
}
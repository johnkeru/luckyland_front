import React from "react";
import { AiFillFacebook } from "react-icons/ai";
import { CgMail } from "react-icons/cg";
import { GiPhone } from "react-icons/gi";
import { ImLocation } from "react-icons/im";
import { GoDotFill } from "react-icons/go";

const TopNav = () => {

    return (
        <div
            className={`h-10 bg-blue-500 text-white w-full p-5 hidden lg:flex items-center justify-between px-5`}
        >
            <div className=" flex items-center ">
                <ImLocation size={20} />
                <a href="#location" className="ml-1 cursor-pointer">
                    Gabao, San Roque Bacon District Sorsogon City
                </a>
            </div>

            <div className="flex items-center">
                <div className='flex items-center'>
                    <GoDotFill size={20} />
                    <p className="ml-1">We're open</p>
                </div>
                <a
                    className="flex items-center ml-4"
                    href="https://www.facebook.com/profile.php?id=100087968635905"
                    target="_blank"
                >
                    <AiFillFacebook size={20} />
                    <p className="ml-1">FB Page</p>
                </a>
                <div className="flex items-center ml-4">
                    <GiPhone size={20} />
                    <p className="ml-1">0969 023 5969</p>
                </div>
                <div className="flex items-center ml-4">
                    <CgMail size={20} />
                    <p className="ml-1">Luckyland.resort58@gmail.com</p>
                </div>
            </div>
        </div>
    );
};

export default TopNav;
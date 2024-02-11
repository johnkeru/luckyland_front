import React, { useState } from "react";
import { AiFillFacebook, AiOutlineClose } from "react-icons/ai";
import { CgMail } from "react-icons/cg";
import { CiMenuBurger } from "react-icons/ci";
import { GiPhone } from "react-icons/gi";
import { ImLocation } from "react-icons/im";
import { disableScroll, enableScroll } from '../../utility_functions/enableDisableScroll';
import { navigations } from "./Navigation";
import { GoDotFill } from "react-icons/go";

const BurgerDrawer = () => {
    const [isOpen, setIsOpen] = useState(false);

    const handleOpen = () => {
        disableScroll();
        setIsOpen(true);
    };
    const handleClose = () => {
        enableScroll();
        setIsOpen(false);
    };

    return (
        <>
            <CiMenuBurger
                size={30}
                onClick={handleOpen}
                className="cursor-pointer lg:hidden text-white drop-shadow-lg"
                style={{ textShadow: "-2px 2px 3px rgba(0,0,0,0.54)" }}
            />

            {isOpen && (
                <div className="absolute top-0 left-0 z-10 w-screen h-screen bg-white lg:hidden">
                    <div className=" z-30 top-0 left-0 w-full">
                        <div className=" flex justify-between py-2 px-4 md:px-8 md:py-4 lg:items-end items-center">
                            <img
                                width={500}
                                height={500}
                                src="/logo/logo1.png"
                                alt="/logo"
                                className="w-60 md:w-80 md:h-20 drop-shadow-2xl cursor-pointer"
                                draggable={false}
                                onContextMenu={(e) => e.preventDefault()}
                            />
                            <AiOutlineClose
                                size={30}
                                onClick={handleClose}
                                className="text-red-500 cursor-pointer lg:hidden"
                            />
                        </div>
                    </div>

                    <div>
                        <div className={`p-4`} style={{ background: "rgba(0,0,0,.03" }}>
                            <div className="flex items-center text-gray-700 mb-3">
                                <ImLocation size={20} />
                                <a href="#map" className="ml-1 cursor-pointer">
                                    Gabao, San Roque Bacon District Sorsogon City
                                </a>
                            </div>

                            <div className='flex items-center text-green-500'>
                                <GoDotFill size={20} />
                                <p className="ml-1">We're open</p>
                            </div>

                            <a
                                className="flex items-center mb-3"
                                href="https://www.facebook.com/profile.php?id=100087968635905"
                                target="_blank"
                            >
                                <AiFillFacebook size={20} />
                                <p className="ml-1">FB Page</p>
                            </a>
                            <div className="flex items-center mb-3">
                                <GiPhone size={20} />
                                <p className="ml-1">0969 023 5969</p>
                            </div>
                            <div className="flex items-center">
                                <CgMail size={20} />
                                <p className="ml-1">Luckyland.resort58@gmail.com</p>
                            </div>
                        </div>

                        <div className="grid">
                            {navigations.map((nav, i) => (
                                <a
                                    onClick={handleClose}
                                    href={nav.path}
                                    key={nav.path}
                                    className={`text-gray-700 p-4 text-[15px] font-medium ${i === navigations.length - 1 ? "border-none" : "border-b-2"
                                        } border-gray-300 cursor-pointer w-full`}
                                    aria-current="page"
                                >
                                    {nav.name}
                                </a>
                            ))}
                        </div>
                    </div>
                </div>
            )}
        </>
    );
};

export default BurgerDrawer;
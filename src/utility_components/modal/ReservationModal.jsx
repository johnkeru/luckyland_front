import { useState, } from "react";
import Modal from './Modal';
import { DialogContent } from "@mui/material";

const ReservationModal = ({ button }) => {
    const [open, setOpen] = useState(false);
    const handleOpen = () => setOpen(!open);

    return (
        <Modal
            size='lg'
            button={button}
            handleClose={handleOpen}
            handleOpen={handleOpen}
            open={open}
            title={`Book Reservation`}
            children={
                <DialogContent>
                    <Booking />
                </DialogContent>
            }
        />
    )
}

export default ReservationModal




function Booking() {
    const [checkInDate, setCheckInDate] = useState(null);

    return (
        <div >
            <div className="relative  mx-auto p-5 border w-full max-w-4xl shadow-lg rounded-md bg-white flex">
                <div className="w-1/2 px-7 py-5">
                    <h3 className="text-lg leading-6 font-medium text-gray-900 mb-4">Make a Reservation</h3>
                    <form action="#" method="POST" className="space-y-4">
                        <input type="text" placeholder="Firstname" className="px-3 py-2 border rounded-lg text-sm w-full" />
                        <input type="text" placeholder="Lastname" className="px-3 py-2 border rounded-lg text-sm w-full" />
                        <input type="email" placeholder="Email" className="px-3 py-2 border rounded-lg text-sm w-full" />
                        <input type="tel" placeholder="Phone Number" className="px-3 py-2 border rounded-lg text-sm w-full" />
                        <div className="grid grid-cols-2 gap-4">
                            <input type="number" placeholder="Adult" className="px-3 py-2 border rounded-lg text-sm" />
                            <input type="number" placeholder="Kids/Senior" className="px-3 py-2 border rounded-lg text-sm" />
                        </div>
                        <div className="grid grid-cols-2 gap-4">
                            <input type="text" placeholder="Cottage" className="px-3 py-2 border rounded-lg text-sm" />
                            <input type="text" placeholder="Room" className="px-3 py-2 border rounded-lg text-sm" />
                        </div>
                        <div>
                            <input type="text" placeholder="GCash Ref Number" className="px-3 py-2 border rounded-lg text-sm w-full" />
                        </div>
                        <div>
                            <button type="submit" className="w-full mt-4 px-4 py-2 bg-blue-500 text-white text-base font-medium rounded-md shadow-sm hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500">
                                Book Now
                            </button>
                        </div>
                    </form>
                </div>
                <div className="w-1/2 pl-4 pr-7 py-5 flex flex-col">
                    <div className="flex justify-between items-center mb-4">
                        <div className="w-full">
                            <label htmlFor="checkInDate">Check in</label>
                            <DatePicker
                                id="checkInDate"
                                placeholder="Pick date"
                                value={checkInDate}
                                onChange={setCheckInDate}
                                className="mt-1"
                                inputFormat="DD/MM/YYYY"
                                dropdownType="modal"
                            />
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}


function DatePicker() {
    return (
        <div className="flex flex-col w-full h-auto p-4 bg-white rounded-lg shadow-md">
            <div className="flex justify-between items-center mb-6">
                <h2 className="text-lg font-bold text-gray-900">Book a Reservation</h2>
                <div className="flex justify-center items-center">
                    <button className="text-sm font-semibold text-gray-500 hover:text-gray-700 px-2">
                        <IconLeft className="h-4 w-4" />
                    </button>
                    <span className="text-sm text-gray-600 mx-2">April 2023</span>
                    <button className="text-sm font-semibold text-gray-500 hover:text-gray-700 px-2">
                        <IconRight className="h-4 w-4" />
                    </button>
                </div>
            </div>
            <div className="grid grid-cols-7 gap-4 text-sm font-medium text-center">
                <div className="text-gray-800">Su</div>
                <div className="text-gray-800">Mo</div>
                <div className="text-gray-800">Tu</div>
                <div className="text-gray-800">We</div>
                <div className="text-gray-800">Th</div>
                <div className="text-gray-800">Fr</div>
                <div className="text-gray-800">Sa</div>
                {/* Placeholder for empty grid items to align the first day of the month correctly */}
                <div className="opacity-0">31</div>
                <div className="opacity-0">1</div>
                <div className="opacity-0">2</div>
                {/* Day items for the month */}
                {[...Array(30)].map((_, index) => (
                    <div key={index} className="py-2 px-4 rounded-full text-gray-700 hover:text-white hover:bg-[#1da1f2] cursor-pointer">
                        {index + 1}
                    </div>
                ))}
            </div>
            <div className="mt-6 flex justify-center">
                <button className="text-center text-sm font-semibold leading-[19px] text-[#1da1f2] border border-[#1da1f2] px-10 py-2 rounded-full hover:bg-[#1da1f2] hover:text-white transition-colors">
                    Schedule
                </button>
            </div>
        </div>
    );
}

function IconLeft(props) {
    return (
        <svg
            {...props}
            xmlns="http://www.w3.org/2000/svg"
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
        >
            <path d="M17 6.1H3" />
            <path d="M21 12.1H3" />
            <path d="M15.1 18H3" />
        </svg>
    );
}

function IconRight(props) {
    return (
        <svg
            {...props}
            xmlns="http://www.w3.org/2000/svg"
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
        >
            <circle cx="12" cy="5" r="3" />
            <path d="M6.5 8a2 2 0 0 0-1.905 1.46L2.1 18.5A2 2 0 0 0 4 21h16a2 2 0 0 0 1.925-2.54L19.4 9.5A2 2 0 0 0 17.48 8Z" />
        </svg>
    );
}



function Confirmation() {
    return (
        <div
            id="ConfirmationModal"
            className=" bg-opacity-25 flex justify-center items-center"
        >
            <div className="bg-white rounded-lg p-6 w-96">
                <img
                    src="https://source.unsplash.com/random/64x64?twitter"
                    alt="Twitter logo"
                    className="h-16 w-16 mx-auto"
                />
                <div className="flex justify-center my-2">
                    <IconChecked className="h-8 w-8 text-green-500" />
                </div>
                <div className="text-center text-lg text-gray-700">
                    Your action has been confirmed!
                </div>
                <button
                    className="mt-4 w-full text-white bg-green-500 py-2 rounded-md hover:bg-green-600 transition"
                >
                    Done
                </button>
            </div>
        </div>
    );
}

function IconChecked(props) {
    return (
        <svg
            {...props}
            xmlns="http://www.w3.org/2000/svg"
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
        >
            <polyline points="20 6 9 17 4 12" />
        </svg>
    );
}
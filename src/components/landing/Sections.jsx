import React from 'react'

const Sections = () => {
    return (
        <>
            <section id="about" className="container mx-auto px-6 py-16 text-white">
                <div className="text-center">
                    <h3 className="text-4xl font-bold  mb-4">About Us</h3>
                    <p className="text-lg ">Nestled on the pristine beaches of paradise, LuckyLand Resort is your escape from the everyday. Our serene and exclusive resort offers the ultimate relaxation experience where every corner is designed to pamper your senses.</p>
                </div>
            </section>

            <section id="amenities" className="py-16 text-white">
                <div className="container mx-auto px-6">
                    <h3 className="text-4xl font-bold text-center mb-12">Amenities</h3>
                    <div className="grid md:grid-cols-3 gap-8">
                        <div className="text-center">
                            <IconPool className="h-16 w-16 mb-4 mx-auto" />
                            <h4 className="text-2xl font-semibold mb-2">Swimming Pools</h4>
                            <p>Infinity pools overlooking the ocean, and a dedicated kid’s pool for family fun.</p>
                        </div>
                        <div className="text-center">
                            <IconSpa className="h-16 w-16 mb-4 mx-auto" />
                            <h4 className="text-2xl font-semibold mb-2">Spa Services</h4>
                            <p>Indulge in a variety of massages and wellness treatments to rejuvenate your body and soul.</p>
                        </div>
                        <div className="text-center">
                            <IconRestaurant className="h-16 w-16 mb-4 mx-auto" />
                            <h4 className="text-2xl font-semibold mb-2">Fine Dining</h4>
                            <p>Experience world-class gourmet cuisine crafted by our renowned chefs.</p>
                        </div>
                    </div>
                </div>
            </section>

            <div className="bg-gray-100 py-20">
                <div className="flex flex-col items-center">
                    <h2 className="text-4xl font-bold text-[#333333]">Cozy Accommodations</h2>
                    <p className="text-lg mt-4 text-[#555555] px-10 text-center">
                        After a day full of activities, relax in our cozy rooms and suites,
                        designed to be your home away from home.
                    </p>
                    <div className="mt-10 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10 px-8">
                        <div className="flex flex-col items-center bg-white rounded-lg shadow-xl p-6">
                            <img src="https://source.unsplash.com/random/300x200?hotelroom,family" alt="Family Room" className="rounded-lg" />
                            <h3 className="font-bold text-lg mt-3">Family Room</h3>
                            <p className="text-sm text-[#777777] mt-2">Spacious and comfortable, perfect for your family's stay.</p>
                        </div>
                        <div className="flex flex-col items-center bg-white rounded-lg shadow-xl p-6">
                            <img src="https://source.unsplash.com/random/300x200?hotelroom,couple" alt="Couple Room" className="rounded-lg" />
                            <h3 className="font-bold text-lg mt-3">Couple's Retreat</h3>
                            <p className="text-sm text-[#777777] mt-2">A romantic and serene space for couples to unwind.</p>
                        </div>
                        <div className="flex flex-col items-center bg-white rounded-lg shadow-xl p-6">
                            <img src="https://source.unsplash.com/random/300x200?hotelroom,luxury" alt="Luxury Suite" className="rounded-lg" />
                            <h3 className="font-bold text-lg mt-3">Luxury Suite</h3>
                            <p className="text-sm text-[#777777] mt-2">Experience the ultimate in luxury and comfort.</p>
                        </div>
                        <div className="flex flex-col items-center bg-white rounded-lg shadow-xl p-6">
                            <img src="https://source.unsplash.com/random/300x200?hotelroom,old" alt="Family Room" className="rounded-lg" />
                            <h3 className="font-bold text-lg mt-3">Family Room</h3>
                            <p className="text-sm text-[#777777] mt-2">Spacious and comfortable, perfect for your family's stay.</p>
                        </div>
                        <div className="flex flex-col items-center bg-white rounded-lg shadow-xl p-6">
                            <img src="https://source.unsplash.com/random/300x200?hotelroom,friends" alt="Couple Room" className="rounded-lg" />
                            <h3 className="font-bold text-lg mt-3">Couple's Retreat</h3>
                            <p className="text-sm text-[#777777] mt-2">A romantic and serene space for couples to unwind.</p>
                        </div>
                        <div className="flex flex-col items-center bg-white rounded-lg shadow-xl p-6">
                            <img src="https://source.unsplash.com/random/300x200?hotelroom,kids" alt="Luxury Suite" className="rounded-lg" />
                            <h3 className="font-bold text-lg mt-3">Luxury Suite</h3>
                            <p className="text-sm text-[#777777] mt-2">Experience the ultimate in luxury and comfort.</p>
                        </div>
                    </div>
                </div>
            </div>

            <div className="bg-[#FEF2F2] p-10">
                <h2 className="text-4xl font-bold text-center mb-10">Happy Guests</h2>
                <div className="flex flex-wrap gap-4 justify-center">
                    <div className="bg-white p-6 rounded-lg text-center">
                        <p className="text-sm text-[#334155] mb-4">
                            "Our family had the best vacation ever. There's so much to do for all ages. Can't wait to come back!"
                        </p>
                        <div className="font-semibold text-[#FF5A5F]">- The Harrison Family</div>
                    </div>
                    <div className="bg-white p-6 rounded-lg text-center">
                        <p className="text-sm text-[#334155] mb-4">
                            "The kids haven't stopped talking about the water park. Wonderful staff and service!"
                        </p>
                        <div className="font-semibold text-[#FF5A5F]">- Amanda & Ben</div>
                    </div>
                    <div className="bg-white p-6 rounded-lg text-center">
                        <p className="text-sm text-[#334155] mb-4">
                            "Our family had the best vacation ever. There's so much to do for all ages. Can't wait to come back!"
                        </p>
                        <div className="font-semibold text-[#FF5A5F]">- The Harrison Family</div>
                    </div>
                    <div className="bg-white p-6 rounded-lg text-center">
                        <p className="text-sm text-[#334155] mb-4">
                            "The kids haven't stopped talking about the water park. Wonderful staff and service!"
                        </p>
                        <div className="font-semibold text-[#FF5A5F]">- Amanda & Ben</div>
                    </div>
                    <div className="bg-white p-6 rounded-lg text-center">
                        <p className="text-sm text-[#334155] mb-4">
                            "Our family had the best vacation ever. There's so much to do for all ages. Can't wait to come back!"
                        </p>
                        <div className="font-semibold text-[#FF5A5F]">- The Harrison Family</div>
                    </div>
                    <div className="bg-white p-6 rounded-lg text-center">
                        <p className="text-sm text-[#334155] mb-4">
                            "The kids haven't stopped talking about the water park. Wonderful staff and service!"
                        </p>
                        <div className="font-semibold text-[#FF5A5F]">- Amanda & Ben</div>
                    </div>
                </div>
            </div>

            <section id="contact" className="container mx-auto px-6 py-16 text-white">
                <h3 className="text-4xl font-bold text-center mb-12">Contact Us</h3>
                <div className="grid md:grid-cols-2 gap-12">
                    <div>
                        <h4 className="font-bold mb-4 ">Get in Touch</h4>
                        <p className="mb-4">Address: 123 Coastal Road, Paradise Island</p>
                        <p className="mb-4">Email: reservations@luckylandresort.com</p>
                        <p >Phone: (123) 456-7890</p>
                    </div>
                    <form>
                        <div className="grid grid-cols-2 gap-4 mb-4">
                            <input type="text" placeholder="Your Name" className="border-2 rounded-lg px-4 py-3 text-gray-700 focus:border-teal-500" />
                            <input type="email" placeholder="Your Email" className="border-2 rounded-lg px-4 py-3 text-gray-700 focus:border-teal-500" />
                        </div>
                        <textarea className="w-full border-2 rounded-lg px-4 py-3 text-gray-700 mb-4 focus:border-teal-500" rows="6" placeholder="Message"></textarea>
                        <button type="submit" className="block bg-teal-600 hover:bg-teal-700 text-white font-semibold py-3 px-6 rounded-lg shadow-lg">Send Message</button>
                    </form>
                </div>
            </section>

            <footer className="bg-white py-6">
                <div className="container mx-auto text-center text-gray-600">
                    &copy; 2023 LuckyLand Resort. All rights reserved.
                </div>
            </footer>

        </>
    )
}

export default Sections


function IconPool(props) {
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
            <path d="M12 3a6 6 0 0 0 9 9 9 9 0 1 1-9-9Z" />
        </svg>
    );
}

function IconSpa(props) {
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
            <line x1="9" x2="9" y1="4" y2="20" />
            <path d="M4 7c0-1.7 1.3-3 3-3h13" />
            <path d="M18 20c-1.7 0-3-1.3-3-3V4" />
        </svg>
    );
}

function IconRestaurant(props) {
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
            <rect width="20" height="20" x="2" y="2" rx="5" ry="5" />
            <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" />
            <line x1="17.5" x2="17.51" y1="6.5" y2="6.5" />
        </svg>
    );
}
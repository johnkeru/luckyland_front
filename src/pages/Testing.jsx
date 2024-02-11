
export default function Component() {
    return (
        <div className="bg-gradient-to-br from-blue-400 to-teal-500 min-h-screen flex flex-col">
            <header className="bg-white shadow-md">
                <div className="container mx-auto flex items-center justify-between py-4 px-6">
                    <h1 className="text-3xl font-bold text-gray-800">LuckyLand Resort</h1>
                    <nav className="hidden md:block">
                        <ul className="flex space-x-6">
                            <li><a href="#home" className="text-teal-600 font-semibold">Home</a></li>
                            <li><a href="#about" className="text-gray-600 font-semibold">About</a></li>
                            <li><a href="#amenities" className="text-gray-600 font-semibold">Amenities</a></li>
                            <li><a href="#gallery" className="text-gray-600 font-semibold">Gallery</a></li>
                            <li><a href="#contact" className="text-gray-600 font-semibold">Contact</a></li>
                        </ul>
                    </nav>
                </div>
            </header>

            <section id="home" className="relative flex items-center justify-center h-screen" style={{ backgroundImage: `url('https://source.unsplash.com/random/1920x1080?resort,beach')`, backgroundSize: 'cover', backgroundPosition: 'center' }}>
                <div className="absolute inset-0 bg-black opacity-25"></div>
                <div className="z-10 text-center text-white">
                    <h2 className="text-6xl font-semibold mb-4">Welcome to LuckyLand Resort</h2>
                    <p className="text-xl mb-6">Unwind and reconnect in the lap of luxury and nature</p>
                    <a href="#booking" className="inline-block bg-white text-teal-600 font-semibold py-3 px-6 rounded-lg shadow-lg">Book Your Stay</a>
                </div>
            </section>

            <section id="about" className="container mx-auto px-6 py-16">
                <div className="text-center">
                    <h3 className="text-4xl font-bold text-gray-800 mb-4">About Us</h3>
                    <p className="text-lg text-gray-600">Nestled on the pristine beaches of paradise, LuckyLand Resort is your escape from the everyday. Our serene and exclusive resort offers the ultimate relaxation experience where every corner is designed to pamper your senses.</p>
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

            <section id="gallery" className="bg-white py-16">
                <div className="container mx-auto px-6">
                    <h3 className="text-4xl font-bold text-center text-gray-800 mb-12">Gallery</h3>
                    <div className="grid md:grid-cols-3 gap-8">
                        <img src="https://source.unsplash.com/random/360x360?resort,room" alt="LuckyLand Room" className="rounded-lg shadow-lg" />
                        <img src="https://source.unsplash.com/random/360x360?resort,beach" alt="LuckyLand Beach" className="rounded-lg shadow-lg" />
                        <img src="https://source.unsplash.com/random/360x360?resort,dining" alt="LuckyLand Dining" className="rounded-lg shadow-lg" />
                    </div>
                </div>
            </section>

            <section id="contact" className="container mx-auto px-6 py-16">
                <h3 className="text-4xl font-bold text-center text-gray-800 mb-12">Contact Us</h3>
                <div className="grid md:grid-cols-2 gap-12">
                    <div>
                        <h4 className="font-bold mb-4 text-gray-800">Get in Touch</h4>
                        <p className="text-gray-600 mb-4">Address: 123 Coastal Road, Paradise Island</p>
                        <p className="text-gray-600 mb-4">Email: reservations@luckylandresort.com</p>
                        <p className="text-gray-600">Phone: (123) 456-7890</p>
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
        </div>
    );
}

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



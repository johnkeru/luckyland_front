import { useNavigate } from "react-router";
import ReusableHero from "./ReusableHero";
import Sections from "./Sections";

let des = `Recreational and educational area with affordable accommodation
where you can relax and enjoy.`

const Hero = ({ title = "LuckyLand Resort" }) => {

    const nav = useNavigate();

    return (
        <div className="bg-gradient-to-br from-blue-400 to-teal-500 min-h-screen flex flex-col">

            <ReusableHero
                autoSlide={true}
                children={
                    <div className="text-center">
                        <h1 className="text-5xl sm:text-6xl md:text-7xl lg:text-8xl xl:text-[8rem] text-white font-semibold">
                            {title}
                        </h1>
                        <p className={`text-[20px] md:text-3xl xl:text-4xl text-white md:py-3 md:w-1/2 m-auto mb-10`}>
                            {des}
                        </p>
                        <button onClick={() => nav('/book')} className="bg-[#FF5A5F] hover:bg-[#D95255] text-white font-bold py-3 px-10 rounded-full transition duration-300">Book Now</button>
                    </div>
                }
            />

            <Sections />

        </div>
    );
};

export default Hero;




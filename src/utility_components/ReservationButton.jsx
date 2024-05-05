import React, { useState } from "react";
import './ReservationButton.css'
import { useNavigate } from "react-router";
import { primary } from "../styles/globalStyle";

const ReservationButton = () => {
    const [isHover, setIsHover] = useState(false);
    const nav = useNavigate();
    return (
        <div className="buttons" onClick={() => nav('/create-reservation')}>
            <button className="blob-btn" style={{ color: isHover ? primary.main : primary.contrastText }} onMouseEnter={() => setIsHover(true)} onMouseLeave={() => setIsHover(false)}>
                Reserve Now
                <span className="blob-btn__inner" style={{ backgroundColor: primary.main }}>
                    <span className="blob-btn__blobs">
                        <span className="blob-btn__blob"></span>
                        <span className="blob-btn__blob"></span>
                        <span className="blob-btn__blob"></span>
                        <span className="blob-btn__blob"></span>
                    </span>
                </span>
            </button>
        </div>
    );
};

export default ReservationButton;

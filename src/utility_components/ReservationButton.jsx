import React from "react";
import './ReservationButton.css'
import { useNavigate } from "react-router";

const ReservationButton = () => {
    const nav = useNavigate();
    return (
        <div className="buttons" onClick={() => nav('/create-reservation')}>
            <button className="blob-btn">
                Reserve Now
                <span className="blob-btn__inner">
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

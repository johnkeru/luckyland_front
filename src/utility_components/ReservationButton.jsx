import './ReservationButton.css'
import { useNavigate } from "react-router";
import useResortStatus from '../hooks/useResortStatus';
import { notifyError } from '../utility_functions/toaster';

const ReservationButton = () => {
    const nav = useNavigate();
    const { status } = useResortStatus();

    return (
        <button
            onClick={() => status ? nav('/create-reservation') : notifyError({ message: "We're sorry, but the resort is currently closed." })}
            className="reserve-button">
            Reserve Now
        </button>
    );
};

export default ReservationButton;

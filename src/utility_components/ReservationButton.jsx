import './ReservationButton.css'
import { useNavigate } from "react-router";
import './ReservationButton.css'

const ReservationButton = () => {
    const nav = useNavigate();
    return (
        <button onClick={() => nav('/create-reservation')} className="reserve-button">Reserve Now</button>
    );
};

export default ReservationButton;

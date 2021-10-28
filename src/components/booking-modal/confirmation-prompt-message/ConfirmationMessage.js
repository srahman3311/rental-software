import { closeBookingModal } from "../../../libs/closeBookingModal";


export default function ConfirmationMessage({ setBookingInfo, setError, hasRented, setHasRented, setDisplayBookingModal }) {

    return (
        <div className="" style = {{display: hasRented ? "block" : "none"}}>
            <p>Your booking has been confirmed</p>
            <button onClick = {() => closeBookingModal(setError, setBookingInfo, setHasRented, setDisplayBookingModal)}>Close</button>
            <button>Rent another product</button>
        </div> 
    );
    
}
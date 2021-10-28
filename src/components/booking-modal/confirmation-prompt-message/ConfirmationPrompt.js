import { confirmNewBooking } from "../../../libs/confirmNewBooking";
import EmailInput from "./EmailInput";


export default function ConfirmationPrompt({ products, setProducts, setError, setBookingInfo, bookingInfo, closeBookingModal, hasRented, setHasRented }) {

    return (
        <div className="" >
            <div className= "calculate_rent" style = {{display: bookingInfo.calculatedRent && !hasRented ? "block" : "none"}}>
                <p>
                    Your estimated price for {bookingInfo.product} for 
                    the period {bookingInfo.startDate} to {bookingInfo.endDate} is {bookingInfo.calculatedRent} after {bookingInfo.discount}% discount  
                </p>
                <p>Confirm with your email address below</p>

                <EmailInput
                    name = "email"
                    value = {bookingInfo.email}  
                    products = {products}
                    setBookingInfo = {setBookingInfo}
                    setError = {setError}
                />

                <button 
                    onClick = {() => {confirmNewBooking(products, bookingInfo, setProducts, setHasRented)}}
                    disabled={!bookingInfo.email && true}
                >
                    Confirm
                </button>
                <button onClick = {closeBookingModal}>Cancel</button>
            </div>
          
        </div>    
    );
    
}
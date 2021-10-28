//import { useEffect, useState } from "react";
import { bookAProductOnChange } from "../../libs/bookAProductOnChange";

import { confirmNewBooking } from "../../libs/confirmNewBooking";


export default function CalculateRent({ products, setProducts, setError, setBookingInfo, bookingInfo, closeBookingModal, hasRented, setHasRented }) {

    return (
        <div className="" >
            <div className= "calculate_rent" style = {{display: bookingInfo.calculatedRent && !hasRented ? "block" : "none"}}>
                <p>
                    Your estimated price for {bookingInfo.product} for 
                    the period {bookingInfo.startDate} to {bookingInfo.endDate} is {bookingInfo.calculatedRent} after {bookingInfo.discount}% discount  
                </p>
                <p>Confirm with your email address below</p>
                <input 
                    type="email" 
                    name="email" 
                    placeholder="john-doe@example.com" 
                    value = {bookingInfo.email} 
                    onChange = {event => bookAProductOnChange(event, products, setError, setBookingInfo)} 
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